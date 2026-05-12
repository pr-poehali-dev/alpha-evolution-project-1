import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProductTeaserCardProps {
  dailyVolume?: string;
  dailyVolumeLabel?: string;
  headline?: string;
  subheadline?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export const ProductTeaserCard = (props: ProductTeaserCardProps) => {
  const {
    dailyVolumeLabel = "ОФИЦИАЛЬНЫЙ СЕРВИС IVECO В ВАШЕМ ГОРОДЕ",
    headline = "Ремонт грузовиков IVECO — узкая специализация, глубокая экспертиза",
    subheadline = "Специализируемся исключительно на IVECO: Daily, Eurocargo, Trakker, Stralis. Диагностика, капремонт двигателей Common Rail, КПП, электрика и ТО — всё в одном месте.",
    primaryButtonText = "Записаться на ремонт",
    primaryButtonHref = "",
    secondaryButtonText = "Узнать стоимость",
    secondaryButtonHref = "",
  } = props;

  return (
    <section className="w-full px-8 pt-32 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
            className="col-span-12 lg:col-span-6 bg-[#e9e9e9] rounded-[40px] p-12 lg:p-16 flex flex-col justify-end aspect-square overflow-hidden"
          >
            <a
              href={primaryButtonHref}
              onClick={(e) => e.preventDefault()}
              className="flex flex-col gap-1 text-[#9a9a9a]"
            >
              <motion.span
                initial={{ transform: "translateY(20px)", opacity: 0 }}
                animate={{ transform: "translateY(0px)", opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.645, 0.045, 0.355, 1], delay: 0.6 }}
                className="text-sm uppercase tracking-tight font-mono flex items-center gap-1"
              >
                {dailyVolumeLabel}
                <ArrowUpRight className="w-[0.71em] h-[0.71em]" />
              </motion.span>
            </a>

            <h1
              className="text-[56px] leading-[60px] tracking-tight text-[#202020] max-w-[520px] mb-6 font-medium"
            >
              {headline}
            </h1>

            <p className="text-lg leading-7 text-[#404040] max-w-[520px] mb-6">
              {subheadline}
            </p>

            <ul className="flex gap-1.5 flex-wrap mt-10">
              <li>
                <a
                  href={primaryButtonHref}
                  onClick={(e) => e.preventDefault()}
                  className="block cursor-pointer text-white bg-[#156d95] rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)] hover:rounded-2xl"
                >
                  {primaryButtonText}
                </a>
              </li>
              <li>
                <a
                  href={secondaryButtonHref}
                  onClick={(e) => e.preventDefault()}
                  className="block cursor-pointer text-[#202020] border border-[#202020] rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)] hover:rounded-2xl"
                >
                  {secondaryButtonText}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1], delay: 0.2 }}
            className="col-span-12 lg:col-span-6 rounded-[40px] overflow-hidden aspect-square grid grid-rows-2 gap-2"
          >
            <div className="overflow-hidden rounded-[32px]">
              <img
                src="https://cdn.poehali.dev/projects/8a1cb2ba-b7b7-49d1-9093-317eb32a0b87/files/118146a6-c95c-4c4c-aef3-58ec870a6d5c.jpg"
                alt="IVECO Daily белый фургон"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[32px]">
              <img
                src="https://cdn.poehali.dev/projects/8a1cb2ba-b7b7-49d1-9093-317eb32a0b87/bucket/d6486f14-1097-408b-9641-fcf8d0fb8f65.jpg"
                alt="IVECO Daily синий грузовик"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};