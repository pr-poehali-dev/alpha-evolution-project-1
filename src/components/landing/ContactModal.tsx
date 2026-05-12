import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ArrowLeft, CheckCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const phones = [
  { number: "+7 967 170 9494", href: "tel:+79671709494" },
  { number: "+7 926 304 0203", href: "tel:+79263040203" },
];

const messengers = [
  {
    name: "Telegram",
    href: "https://t.me/+79671709494",
    gradient: "linear-gradient(135deg, #2AABEE, #229ED9)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/79671709494",
    gradient: "linear-gradient(135deg, #25D366, #128C7E)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "MAX",
    href: "https://max.ru/+79671709494",
    gradient: "linear-gradient(135deg, #7B61FF, #4C35D4)",
    icon: (
      <img
        src="https://cdn.poehali.dev/files/55bd03ad-570f-4473-b785-ce1cf8a06b97.jpeg"
        alt="MAX"
        className="w-5 h-5 rounded-full object-cover"
      />
    ),
  },
];

type View = "main" | "callback" | "success";

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [view, setView] = useState<View>("main");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => { setView("main"); setPhone(""); setName(""); }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
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
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 relative pointer-events-auto"
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

                {view === "main" && (
                  <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">Напишите нам, мы на связи!</h2>
                    <p className="text-sm text-gray-500 text-center mb-7">Ежедневно с 8:00 до 20:00</p>

                    <div className="space-y-3 mb-5">
                      {messengers.map((m) => (
                        <a
                          key={m.name}
                          href={m.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-white font-semibold text-base transition-opacity hover:opacity-90"
                          style={{ background: m.gradient }}
                        >
                          <span className="flex-shrink-0">{m.icon}</span>
                          <span>{m.name}</span>
                        </a>
                      ))}
                    </div>

                    <button
                      onClick={() => setView("callback")}
                      className="w-full py-3.5 rounded-2xl border-2 border-[#156d95] text-[#156d95] font-semibold text-base hover:bg-[#156d95]/5 transition-colors flex items-center justify-center gap-2 mb-5"
                    >
                      <Phone className="w-4 h-4" />
                      Заказать обратный звонок
                    </button>

                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      {phones.map((p) => (
                        <a
                          key={p.href}
                          href={p.href}
                          className="flex items-center justify-center gap-2 text-gray-700 font-medium hover:text-[#156d95] transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {p.number}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}

                {view === "callback" && (
                  <motion.div key="callback" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <button
                      onClick={() => setView("main")}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Назад
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Обратный звонок</h2>
                    <p className="text-sm text-gray-500 mb-6">Перезвоним в течение 15 минут в рабочее время</p>

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
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Номер телефона <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 ___ ___ __ __"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 transition-all text-base"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-[#156d95] text-white font-semibold text-base hover:bg-[#156d95]/90 transition-all disabled:opacity-60"
                      >
                        {loading ? "Отправляем..." : "Перезвоните мне"}
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
                    <p className="text-gray-500 mb-6">Перезвоним вам в ближайшее время. Работаем ежедневно с 8:00 до 20:00.</p>
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
