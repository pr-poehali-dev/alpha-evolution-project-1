import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, CheckCircle } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
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

type View = "form" | "success";

export const AppointmentModal = ({ isOpen, onClose }: AppointmentModalProps) => {
  const [view, setView] = useState<View>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView("form");
      setName("");
      setPhone("");
      setService("");
      setDate("");
      setComment("");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://functions.poehali.dev/6848c496-c1a8-4c0f-a69c-4ad2ae0f917d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, date, comment }),
      });
    } catch (_) { /* ignore */ }
    setLoading(false);
    setView("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none overflow-y-auto py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative pointer-events-auto my-auto"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="flex justify-center mb-5">
                <svg width="60" height="24" viewBox="0 0 180 60" fill="none">
                  <rect width="180" height="60" rx="4" fill="#CC6600"/>
                  <text x="90" y="44" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="42" fill="white" letterSpacing="2">IVECO</text>
                </svg>
              </div>

              <AnimatePresence mode="wait">
                {view === "form" && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Запись на ремонт</h2>
                    <p className="text-sm text-gray-500 mb-6">Заполните форму — мы свяжемся и подтвердим время</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Ваше имя</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Как к вам обращаться?"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 transition-all text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Номер телефона <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 ___ ___ __ __"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 transition-all text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Вид услуги</label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 transition-all text-base bg-white text-gray-700"
                        >
                          <option value="">— Выберите услугу —</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Желаемая дата и время</label>
                        <input
                          type="datetime-local"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 transition-all text-base text-gray-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Комментарий</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Опишите проблему или пожелания..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 transition-all text-base resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-[#CC6600] text-white font-semibold text-base hover:bg-[#CC6600]/90 transition-all disabled:opacity-60"
                      >
                        {loading ? "Отправляем..." : "Записаться на ремонт"}
                      </button>
                    </form>
                  </motion.div>
                )}

                {view === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Заявка принята!</h2>
                    <p className="text-gray-500 mb-6">Мы свяжемся с вами для подтверждения времени. Работаем ежедневно с 8:00 до 20:00.</p>
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
