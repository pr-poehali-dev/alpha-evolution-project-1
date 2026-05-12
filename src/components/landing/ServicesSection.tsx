import { motion } from "framer-motion";

const services = [
  {
    icon: "🔧",
    title: "Техническое обслуживание",
    description: "Плановое и внеплановое ТО по регламенту IVECO: замена масла, фильтров, ремней, свечей и технических жидкостей. Соблюдаем заводские интервалы и сохраняем историю обслуживания.",
  },
  {
    icon: "🖥️",
    title: "Компьютерная диагностика",
    description: "Диагностика на оригинальном ПО IVECO — точно выявляем неисправности двигателя, КПП, электроники и блоков управления. Никаких догадок — только точные данные.",
  },
  {
    icon: "⚙️",
    title: "Ремонт двигателя",
    description: "Капитальный и частичный ремонт дизельных двигателей IVECO, включая системы Common Rail и топливную аппаратуру. Работаем с двигателями всех поколений.",
  },
  {
    icon: "🔩",
    title: "Ремонт КПП и трансмиссии",
    description: "Диагностика и ремонт механических и автоматических коробок передач, сцепления, карданных валов и раздаточных коробок.",
  },
  {
    icon: "🛞",
    title: "Ходовая часть",
    description: "Замена амортизаторов, рессор, ступичных подшипников, рулевых тяг и наконечников. Полная диагностика и восстановление геометрии подвески.",
  },
  {
    icon: "🛑",
    title: "Тормозная система",
    description: "Замена тормозных колодок, дисков, барабанов, прокачка и ремонт тормозных контуров. Работаем с пневматическими и гидравлическими тормозными системами IVECO.",
  },
  {
    icon: "⚡",
    title: "Электрика и электроника",
    description: "Поиск и устранение неисправностей бортовой электросети, ремонт стартеров, генераторов, датчиков и систем управления двигателем.",
  },
  {
    icon: "🏗️",
    title: "Кузовной ремонт",
    description: "Правка, сварка и покраска элементов кузова грузовика. Ремонт кабин, рам и платформ — восстанавливаем внешний вид и структурную целостность.",
  },
  {
    icon: "🌡️",
    title: "Система охлаждения",
    description: "Замена радиаторов, термостатов, насосов охлаждающей жидкости. Быстро находим и устраняем утечки, предотвращаем перегрев двигателя.",
  },
  {
    icon: "💨",
    title: "Турбина и выхлопная система",
    description: "Диагностика, ремонт и замена турбокомпрессоров, катализаторов, сажевых фильтров DPF/SCR. Восстанавливаем мощность и экологичность двигателя.",
  },
  {
    icon: "🛢️",
    title: "Замена технических жидкостей",
    description: "Замена масел в двигателе, КПП и мостах с промывкой систем. Заправка и обслуживание системы кондиционирования кабины.",
  },
  {
    icon: "📦",
    title: "Запчасти со склада",
    description: "Оригинальные и качественные аналоговые запчасти IVECO в наличии — без долгого ожидания и лишних наценок. Подбираем по VIN-номеру.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="features" className="w-full py-24" style={{ background: "linear-gradient(180deg, #f8f9fb 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-8">

        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-[#156d95]/10 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#156d95]" />
            <p className="text-sm font-semibold tracking-wide text-[#156d95] uppercase">Наши услуги</p>
          </div>
          <h2 className="text-[42px] font-semibold leading-tight text-[#202020] tracking-tight mb-5">
            Всё, что нужно вашему IVECO
          </h2>
          <p className="text-xl text-[#555555] leading-relaxed">
            Специализируемся исключительно на грузовиках IVECO — Daily, Eurocargo, Trakker, Stralis.
            Каждый мастер знает эти машины до последнего болта.
          </p>
        </motion.div>

        {/* Карточки услуг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#156d95]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-semibold text-[#202020] mb-3 text-lg">{service.title}</h3>
              <p className="text-[15px] text-[#666666] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
