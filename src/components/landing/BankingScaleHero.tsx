import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const TRUCK_IMG = "https://cdn.poehali.dev/projects/8a1cb2ba-b7b7-49d1-9093-317eb32a0b87/files/d8169013-a66f-4276-84c9-917b066b6bd9.jpg";

export const BankingScaleHero = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div id={id} ref={sectionRef} className="w-full overflow-hidden bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-8 py-20 pt-16">
        <div className="grid grid-cols-12 gap-8 items-center">

          {/* Левая колонка — машина */}
          <div className="col-span-12 md:col-span-5 relative">
            <motion.div
              initial={{ x: "-110%", opacity: 0 }}
              animate={hasAnimated ? { x: 0, opacity: 1 } : { x: "-110%", opacity: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="relative w-full"
            >
              <img
                src={TRUCK_IMG}
                alt="Грузовик IVECO с поднятым капотом"
                className="w-full h-auto rounded-3xl object-cover shadow-2xl"
                style={{ maxHeight: 440 }}
              />
              {/* Декоративная подложка */}
              <div
                className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl -z-10"
                style={{ background: "linear-gradient(135deg, #156d95 0%, #CC6600 100%)", opacity: 0.15 }}
              />
            </motion.div>
          </div>

          {/* Правая колонка — текст */}
          <div className="col-span-12 md:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-[#156d95]/10 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#156d95]" />
              <span className="text-sm font-semibold tracking-wide text-[#156d95] uppercase font-mono">
                Специализированный IVECO сервис
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-[48px] font-semibold leading-[1.1] tracking-tight text-[#111A4A] mb-7"
            >
              Ремонтируем грузовики IVECO так,{" "}
              <span className="text-[#156d95] opacity-50">
                как будто это наш собственный автопарк.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-xl leading-8 text-[#444444] mb-8"
            >
              Узкая специализация на одной марке даёт нам то, чего нет у универсальных сервисов: оригинальный софт для диагностики ECU, запчасти со склада и механики, знающие IVECO до последнего болта.
            </motion.p>

            {/* Быстрые факты */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              {[
                "Daily · Eurocargo · Trakker · Stralis",
                "Оригинальная диагностика ECU",
                "Запчасти со склада",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-gray-100 text-[#333] text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
