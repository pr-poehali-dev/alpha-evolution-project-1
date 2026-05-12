import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react";

const GET_SLOTS_URL = "https://functions.poehali.dev/34acb88d-8331-43a4-9c4a-837741ebbdc0";
const BOOK_URL = "https://functions.poehali.dev/a7adb937-bf65-4582-924b-1478945554ac";

const SERVICES = [
  "Техническое обслуживание (ТО)",
  "Диагностика двигателя",
  "Ремонт двигателя",
  "Ремонт КПП и трансмиссии",
  "Ремонт ходовой части",
  "Ремонт тормозной системы",
  "Электрика и электроника",
  "Кузовной ремонт",
  "Замена масла и фильтров",
  "Другое",
];

interface Slot {
  time: string;
  datetime: string;
  available: boolean;
  spots_left: number;
}

interface SlotsData {
  [date: string]: Slot[];
}

type Step = "calendar" | "details" | "success";

const MONTHS_RU = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAYS_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

function toISODate(d: Date) {
  return d.toISOString().split("T")[0];
}

function getDayOfWeek(d: Date) {
  return (d.getDay() + 6) % 7;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal = ({ isOpen, onClose }: AppointmentModalProps) => {
  const [step, setStep] = useState<Step>("calendar");
  const [slots, setSlots] = useState<SlotsData>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookError, setBookError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setLoadingSlots(true);
    fetch(GET_SLOTS_URL)
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setSlots(parsed.slots || {});
      })
      .catch(() => setSlots({}))
      .finally(() => setLoadingSlots(false));
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("calendar");
      setSelectedDate(null);
      setSelectedSlot(null);
      setName(""); setPhone(""); setService(""); setComment(""); setBookError("");
    }, 300);
  };

  const handleSelectSlot = (slot: Slot) => {
    setSelectedSlot(slot);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setLoading(true);
    setBookError("");
    try {
      const res = await fetch(BOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, slot_datetime: selectedSlot.datetime, comment }),
      });
      const raw = await res.json().catch(() => ({}));
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (res.status === 409) {
        setBookError("Этот слот только что заняли. Пожалуйста, выберите другое время.");
        setStep("calendar");
      } else if (!res.ok) {
        setBookError(parsed.error || "Ошибка при записи. Попробуйте ещё раз.");
      } else {
        setStep("success");
        fetch(GET_SLOTS_URL).then((r) => r.json()).then((d) => {
          const p = typeof d === "string" ? JSON.parse(d) : d;
          setSlots(p.slots || {});
        }).catch(() => {});
      }
    } catch (_) {
      setBookError("Ошибка соединения. Попробуйте ещё раз.");
    }
    setLoading(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

  const year = calMonth.getFullYear();
  const month = calMonth.getMonth();
  const firstDay = getDayOfWeek(new Date(year, month, 1));
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calCells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) calCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calCells.push(new Date(year, month, d));

  const selectedDaySlots = selectedDate ? (slots[selectedDate] || []) : [];

  const formatSlotDate = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatSlotTime = (slot: Slot) => {
    const [h] = slot.time.split(":").map(Number);
    return `${slot.time}–${h + 2}:00`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none overflow-y-auto py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative pointer-events-auto my-auto overflow-hidden"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="px-8 pt-7 pb-4 flex items-center gap-3 border-b border-gray-100">
                <svg width="48" height="20" viewBox="0 0 180 60" fill="none">
                  <rect width="180" height="60" rx="4" fill="#CC6600"/>
                  <text x="90" y="44" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="42" fill="white" letterSpacing="2">IVECO</text>
                </svg>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">Запись на ремонт</h2>
                  <p className="text-xs text-gray-400">Ежедневно, 8:00–20:00</p>
                </div>
              </div>

              <AnimatePresence mode="wait">

                {step === "calendar" && (
                  <motion.div key="calendar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
                    {bookError && (
                      <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{bookError}</div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCalMonth(new Date(year, month - 1, 1))}
                        disabled={year === today.getFullYear() && month === today.getMonth()}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-gray-800">{MONTHS_RU[month]} {year}</span>
                      <button
                        onClick={() => setCalMonth(new Date(year, month + 1, 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 mb-1">
                      {DAYS_SHORT.map((d) => (
                        <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
                      ))}
                    </div>

                    {loadingSlots ? (
                      <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[#CC6600]" /></div>
                    ) : (
                      <div className="grid grid-cols-7 gap-1">
                        {calCells.map((d, i) => {
                          if (!d) return <div key={i} />;
                          const iso = toISODate(d);
                          const isPast = d < today;
                          const isFuture = d > maxDate;
                          const daySlots = slots[iso] || [];
                          const hasAvailable = daySlots.some((s) => s.available);
                          const hasAny = daySlots.length > 0;
                          const isSelected = selectedDate === iso;

                          let cls = "w-full aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all ";
                          if (isPast || isFuture || !hasAny) {
                            cls += "text-gray-300 cursor-default";
                          } else if (isSelected) {
                            cls += "bg-[#CC6600] text-white";
                          } else if (hasAvailable) {
                            cls += "bg-orange-50 text-[#CC6600] hover:bg-orange-100 cursor-pointer border border-orange-200";
                          } else {
                            cls += "bg-gray-100 text-gray-400 cursor-default line-through";
                          }

                          return (
                            <button
                              key={i} className={cls}
                              disabled={isPast || isFuture || !hasAny || !hasAvailable}
                              onClick={() => { setSelectedDate(iso); setSelectedSlot(null); }}
                            >
                              {d.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex gap-4 mt-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-orange-50 border border-orange-200" />
                        <span>Есть места</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-gray-100" />
                        <span>Занято</span>
                      </div>
                    </div>

                    {selectedDate && (
                      <div className="mt-5">
                        <p className="text-sm font-semibold text-gray-700 mb-3">{formatSlotDate(selectedDate)} — выберите время:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedDaySlots.map((slot) => (
                            <button
                              key={slot.datetime}
                              onClick={() => handleSelectSlot(slot)}
                              disabled={!slot.available}
                              className={`py-2.5 rounded-xl text-sm font-medium transition-all border ${
                                slot.available
                                  ? "border-[#CC6600] text-[#CC6600] hover:bg-[#CC6600] hover:text-white"
                                  : "border-gray-200 text-gray-300 cursor-default line-through"
                              }`}
                            >
                              {formatSlotTime(slot)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === "details" && selectedSlot && (
                  <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
                    <button
                      onClick={() => setStep("calendar")}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-4"
                    >
                      <ChevronLeft className="w-4 h-4" /> Выбрать другое время
                    </button>

                    <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5">
                      <p className="text-xs text-orange-500 font-medium uppercase tracking-wide mb-0.5">Выбранное время</p>
                      <p className="text-base font-bold text-gray-800">
                        {formatSlotDate(selectedSlot.datetime.split("T")[0])}, {formatSlotTime(selectedSlot)}
                      </p>
                      {selectedSlot.spots_left === 1 && (
                        <p className="text-xs text-orange-500 mt-1">Последнее место!</p>
                      )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Ваше имя</label>
                        <input
                          type="text" value={name} onChange={(e) => setName(e.target.value)}
                          placeholder="Как к вам обращаться?"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CC6600] focus:ring-2 focus:ring-[#CC6600]/20 transition-all text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон <span className="text-red-500">*</span></label>
                        <input
                          type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 ___ ___ __ __" required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CC6600] focus:ring-2 focus:ring-[#CC6600]/20 transition-all text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Вид услуги</label>
                        <select
                          value={service} onChange={(e) => setService(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CC6600] focus:ring-2 focus:ring-[#CC6600]/20 transition-all text-base bg-white text-gray-700"
                        >
                          <option value="">— Выберите услугу —</option>
                          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Комментарий</label>
                        <textarea
                          value={comment} onChange={(e) => setComment(e.target.value)}
                          placeholder="Опишите проблему или пожелания..."
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CC6600] focus:ring-2 focus:ring-[#CC6600]/20 transition-all text-base resize-none"
                        />
                      </div>
                      {bookError && (
                        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{bookError}</div>
                      )}
                      <button
                        type="submit" disabled={loading}
                        className="w-full py-4 rounded-2xl bg-[#CC6600] text-white font-semibold text-base hover:bg-[#CC6600]/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Записываем..." : "Подтвердить запись"}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center p-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Вы записаны!</h2>
                    {selectedSlot && (
                      <p className="text-[#CC6600] font-semibold mb-2">
                        {formatSlotDate(selectedSlot.datetime.split("T")[0])}, {formatSlotTime(selectedSlot)}
                      </p>
                    )}
                    <p className="text-gray-500 mb-6">Мы свяжемся с вами для подтверждения. Работаем ежедневно с 8:00 до 20:00.</p>
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 rounded-full bg-[#156d95] text-white font-semibold hover:bg-[#156d95]/90 transition-all"
                    >
                      Закрыть
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
