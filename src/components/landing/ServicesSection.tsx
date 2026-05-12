import { motion } from "framer-motion";

const services = [
  {
    icon: "🔧",
    title: "Техническое обслуживание",
    description: "Плановое и внеплановое ТО по регламенту IVECO: замена масла, фильтров, ремней, свечей и технических жидкостей.",
  },
  {
    icon: "🖥",
    title: "Компьютерная диагностика",
    description: "Диагностика на оригинальном ПО IVECO — точно выявляем неисправности двигателя, КПП, электроники и блоков управления.",
  },
  {
    icon: "⚙️",
    title: "Ремонт двигателя",
    description: "Капитальный и частичный ремонт дизельных двигателей IVECO, включая системы Common Rail и топливную аппаратуру.",
  },
  {
    icon: "🔩",
    title: "Ремонт КПП и трансмиссии",
    description: "Диагностика и ремонт механических и автоматических коробок передач, сцепления, карданных валов.",
  },
  {
    icon: "🛞",
    title: "Ходовая часть",
    description: "Замена амортизаторов, рессор, ступичных подшипников, рулевых тяг и наконечников — полный ремонт подвески.",
  },
  {
    icon: "🛑",
    title: "Тормозная система",
    description: "Замена тормозных колодок, дисков, барабанов, прокачка и ремонт тормозных контуров.",
  },
  {
    icon: "⚡",
    title: "Электрика и электроника",
    description: "Поиск и устранение неисправностей бортовой электросети, ремонт стартеров, генераторов, датчиков.",
  },
  {
    icon: "🏭",
    title: "Кузовной ремонт",
    description: "Правка, сварка и покраска элементов кузова грузовика, ремонт кабин и рам.",
  },
  {
    icon: "🔋",
    title: "Система охлаждения",
    description: "Замена радиаторов, термостатов, насосов охлаждающей жидкости, устранение утечек и перегревов.",
  },
  {
    icon: "💨",
    title: "Турбина и выхлопная система",
    description: "Диагностика, ремонт и замена турбокомпрессоров, катализаторов, сажевых фильтров DPF/SCR.",
  },
  {
    icon: "🛢",
    title: "Замена технических жидкостей",
    description: "Замена масел в двигателе, КПП, мостах, промывка и заправка системы кондиционирования.",
  },
  {
    icon: "📦",
    title: "Запчасти со склада",
    description: "Оригинальные и качественные аналоговые запчасти IVECO в наличии — без ожидания и лишних наценок.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-mono uppercase tracking-widest text-[#156d95] mb-3">Наши услуги</p>
          <h2 className="text-[36px] font-normal leading-tight text-[#202020] tracking-tight mb-4">
            Всё, что нужно вашему IVECO
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl">
            Специализируемся исключительно на грузовиках IVECO. Каждый мастер знает эти машины до последнего болта.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#156d95]/30 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-[#202020] mb-2 text-base">{service.title}</h3>
              <p className="text-sm text-[#666666] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
