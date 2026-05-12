import { motion } from "framer-motion";

const values = [
  {
    icon: "🎯",
    title: "Узкая специализация",
    description: "Работаем только с IVECO. Никаких «немного всего» — только глубокая экспертиза одной марки.",
  },
  {
    icon: "🔍",
    title: "Оригинальная диагностика",
    description: "Используем фирменное ПО IVECO для точной диагностики — то, чего нет в обычных сервисах.",
  },
  {
    icon: "⚡",
    title: "Честно и прозрачно",
    description: "Показываем и объясняем каждую операцию. Никаких скрытых работ и навязанных услуг.",
  },
  {
    icon: "📦",
    title: "Запчасти в наличии",
    description: "Склад оригинальных и проверенных аналоговых запчастей — чаще всего ваша машина не будет ждать.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-mono uppercase tracking-widest text-[#CC6600] mb-3">О нас</p>
            <h2 className="text-[36px] font-normal leading-tight text-[#202020] tracking-tight mb-6">
              Мы только что открылись — и уже готовы взяться за самое сложное
            </h2>
            <p className="text-lg text-[#555555] leading-relaxed mb-5">
              IVECO Сервис — это новый специализированный технический центр в Люберцах, созданный командой мастеров с многолетним опытом работы именно с грузовиками IVECO.
            </p>
            <p className="text-base text-[#666666] leading-relaxed mb-5">
              Мы открылись совсем недавно, но за плечами наших специалистов — годы работы на авторизованных IVECO-сервисах. Мы знаем эти машины изнутри: Daily, Eurocargo, Trakker, Stralis — любая модель, любая сложность.
            </p>
            <p className="text-base text-[#666666] leading-relaxed mb-8">
              Наша цель — стать надёжным партнёром для владельцев и автопарков: быстро, честно и с полной ответственностью за результат. Мы принимаем первых клиентов и рады каждому обращению.
            </p>

            <div className="inline-flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl px-5 py-4">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-semibold text-[#CC6600] text-sm">Только открылись</p>
                <p className="text-xs text-gray-500">Записывайтесь одними из первых — принимаем с радостью</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-[#202020] mb-2 text-sm">{v.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
