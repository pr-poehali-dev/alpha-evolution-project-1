import json
import os
import datetime as dt
import psycopg2

SLOT_DURATION_HOURS = 2
MAX_PER_SLOT = 2
WORK_START_HOUR = 8
WORK_END_HOUR = 20
DAYS_AHEAD = 30


def handler(event: dict, context) -> dict:
    """Возвращает список доступных слотов для записи на ремонт."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    params = event.get("queryStringParameters") or {}
    date_str = params.get("date")

    now = dt.datetime.now()
    today = now.date()

    if date_str:
        try:
            target_date = dt.datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return {
                "statusCode": 400,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "Неверный формат даты"}),
            }
        dates = [target_date]
    else:
        dates = [today + dt.timedelta(days=i) for i in range(DAYS_AHEAD)]

    start_dt = dt.datetime.combine(dates[0], dt.time(0, 0))
    end_dt = dt.datetime.combine(dates[-1], dt.time(23, 59))

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "SELECT slot_time, COUNT(*) FROM appointments WHERE slot_time >= %s AND slot_time <= %s AND status != 'cancelled' GROUP BY slot_time",
        (start_dt, end_dt)
    )
    booked = {row[0]: row[1] for row in cur.fetchall()}
    conn.close()

    slots_by_date = {}
    for d in dates:
        day_slots = []
        hour = WORK_START_HOUR
        while hour + SLOT_DURATION_HOURS <= WORK_END_HOUR:
            slot_dt = dt.datetime.combine(d, dt.time(hour, 0))
            if slot_dt > now + dt.timedelta(hours=1):
                count = booked.get(slot_dt, 0)
                available = count < MAX_PER_SLOT
                day_slots.append({
                    "time": slot_dt.strftime("%H:%M"),
                    "datetime": slot_dt.isoformat(),
                    "available": available,
                    "spots_left": MAX_PER_SLOT - count,
                })
            hour += SLOT_DURATION_HOURS
        if day_slots:
            slots_by_date[d.isoformat()] = day_slots

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"slots": slots_by_date}, ensure_ascii=False),
    }
