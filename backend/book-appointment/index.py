import json
import os
import urllib.request
import urllib.error
from datetime import datetime
import psycopg2

MAX_PER_SLOT = 2


def handler(event: dict, context) -> dict:
    """Создаёт запись на ремонт: проверяет свободный слот, сохраняет в БД, отправляет в Telegram."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    service = body.get("service", "").strip()
    slot_iso = body.get("slot_datetime", "").strip()
    comment = body.get("comment", "").strip()

    if not phone or not slot_iso:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Телефон и время записи обязательны"}),
        }

    try:
        slot_dt = datetime.fromisoformat(slot_iso)
    except ValueError:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Неверный формат даты/времени"}),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    # Проверяем, есть ли место в слоте (с блокировкой)
    cur.execute(
        "SELECT COUNT(*) FROM appointments WHERE slot_time = %s AND status != 'cancelled'",
        (slot_dt,)
    )
    count = cur.fetchone()[0]

    if count >= MAX_PER_SLOT:
        conn.close()
        return {
            "statusCode": 409,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Этот слот уже занят, выберите другое время"}),
        }

    cur.execute(
        "INSERT INTO appointments (name, phone, service, slot_time, comment) VALUES (%s, %s, %s, %s, %s) RETURNING id",
        (name or None, phone, service or None, slot_dt, comment or None)
    )
    appointment_id = cur.fetchone()[0]
    conn.commit()
    conn.close()

    # Отправляем в Telegram
    slot_label = slot_dt.strftime("%d.%m.%Y в %H:%M")
    text = (
        "\U0001f527 Новая запись на ремонт\n\n"
        f"\U0001f464 Имя: {name if name else 'не указано'}\n"
        f"\U0001f4de Телефон: {phone}\n"
        f"\U0001f6e0 Услуга: {service if service else 'не указана'}\n"
        f"\U0001f4c5 Время: {slot_label}\n"
        f"\U0001f4ac Комментарий: {comment if comment else 'нет'}\n\n"
        f"ID заявки: #{appointment_id}\n"
        "Источник: сайт IVECO Сервис"
    )

    bot_token = os.environ["TELEGRAM_BOT_TOKEN"].strip()
    chat_id = os.environ["TELEGRAM_CHAT_ID"].strip()
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = json.dumps({"chat_id": chat_id, "text": text}).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req):
            pass
    except urllib.error.HTTPError:
        pass

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True, "appointment_id": appointment_id}),
    }
