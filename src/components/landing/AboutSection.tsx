import { motion } from "framer-motion";

const values = [
  {
    icon: "🎯",
    title: "Узкая специализация",
    description: "Работаем только с IVECO. Никаких «немного всего» — только глубокая экспертиза одной марки. Это значит быстрее, точнее и дешевле.",
  },
  {
    icon: "🔍",
    title: "Оригинальная диагностика",
    description: "Используем фирменное программное обеспечение IVECO для точной диагностики — то, чего нет в обычных универсальных сервисах.",
  },
  {
    icon: "⚡",
    title: "Честно и прозрачно",
    description: "Показываем и объясняем каждую операцию до начала работы. Никаких скрытых работ, никаких навязанных услуг.",
  },
  {
    icon: "📦",
    title: "Запчасти в наличии",
    description: "Склад оригинальных и проверенных аналоговых запчастей — чаще всего ваша машина не будет ждать под заказ.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="w-full pt-24 pb-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#CC6600]/10 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#CC6600]" />
            <p className="text-sm font-semibold tracking-wide text-[#CC6600] uppercase">О нас</p>
          </div>
          <h2 className="text-[42px] font-semibold leading-tight text-[#202020] tracking-tight max-w-3xl">
            Мы только что открылись — и уже готовы взяться за самое сложное
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xl text-[#333333] leading-relaxed mb-6">
              IVECO Сервис — это новый специализированный технический центр в Люберцах (Московская область), созданный командой мастеров с многолетним опытом работы именно с грузовиками IVECO.
            </p>
            <p className="text-[17px] text-[#555555] leading-relaxed mb-6">
              Мы открылись совсем недавно, но за плечами наших специалистов — годы работы на авторизованных дилерских и специализированных IVECO-сервисах. Мы знаем эти машины изнутри: Daily, Eurocargo, Trakker, Stralis — любая модель, любая степень сложности.
            </p>
            <p className="text-[17px] text-[#555555] leading-relaxed mb-8">
              Наша цель — стать надёжным партнёром для владельцев грузовиков и автопарков: работать быстро, честно и с полной ответственностью за каждый результат. Мы принимаем первых клиентов и искренне рады каждому обращению.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 bg-orange-50 border border-orange-200 rounded-2xl px-6 py-5">
                <span className="text-3xl">🚀</span>
                <div>
                  <p className="font-bold text-[#CC6600] text-base mb-0.5">Только открылись</p>
                  <p className="text-sm text-gray-500">Записывайтесь одними из первых — принимаем с радостью</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-2xl px-6 py-5">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-bold text-[#156d95] text-base mb-0.5">г.о. Люберцы</p>
                  <p className="text-sm text-gray-500">Московская область</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Преимущества */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#CC6600]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-semibold text-[#202020] mb-2 text-base">{v.title}</h3>
                <p className="text-[14px] text-[#666666] leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};