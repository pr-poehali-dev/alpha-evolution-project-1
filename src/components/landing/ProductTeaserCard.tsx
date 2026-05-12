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
            className="col-span-12 lg:col-span-6 bg-gradient-to-br from-[#156d95]/10 to-[#156d95]/30 rounded-[40px] flex justify-center items-center aspect-square overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-32 h-32 rounded-full bg-[#156d95]/20 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-[#156d95]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <p className="text-[#156d95] font-medium text-xl">Специализация: только IVECO</p>
              <p className="text-[#156d95]/60 text-sm mt-2 text-center max-w-xs">Daily · Eurocargo · Trakker · Stralis</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};