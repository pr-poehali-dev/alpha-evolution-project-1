import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DataPoint {
  id: number;
  left: number;
  top: number;
  height: number;
  direction: "up" | "down";
  delay: number;
}

const generateDataPoints = (): DataPoint[] => {
  const points: DataPoint[] = [];
  const baseLeft = 1;
  const spacing = 32;
  for (let i = 0; i < 50; i++) {
    const direction = i % 2 === 0 ? "down" : "up";
    const height = Math.floor(Math.random() * 120) + 88;
    const top = direction === "down" ? Math.random() * 150 + 250 : Math.random() * 100 - 80;
    points.push({
      id: i,
      left: baseLeft + i * spacing,
      top,
      height,
      direction,
      delay: i * 0.035,
    });
  }
  return points;
};

export const BankingScaleHero = ({ id }: { id?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dataPoints] = useState<DataPoint[]>(generateDataPoints());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id={id} className="w-full overflow-hidden bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-8 py-24 pt-16">
        <div className="grid grid-cols-12 gap-5 gap-y-16">
          <div className="col-span-12 md:col-span-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#156d95]/10 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#156d95]" />
              <span className="text-sm font-semibold tracking-wide text-[#156d95] uppercase font-mono">
                Специализированный IVECO сервис
              </span>
            </motion.div>

            <h2 className="text-[48px] font-semibold leading-[1.1] tracking-tight text-[#111A4A] mb-7">
              Ремонтируем грузовики IVECO так,{" "}
              <span className="text-[#156d95] opacity-50">
                как будто это наш собственный автопарк.
              </span>
            </h2>

            <p className="text-xl leading-8 text-[#444444] mt-0 mb-8">
              Узкая специализация на одной марке даёт нам то, чего нет у универсальных сервисов: оригинальный софт для диагностики ECU, запчасти со склада и механики, знающие IVECO до последнего болта.
            </p>


          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="relative w-full h-[416px] -ml-[200px]">
              <div className="absolute top-0 left-[302px] w-[680px] h-[416px] pointer-events-none">
                <div className="relative w-full h-full">
                  {dataPoints.map((point) => (
                    <motion.div
                      key={point.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={
                        isVisible
                          ? { opacity: [0, 1, 1], height: [0, point.height, point.height] }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        delay: point.delay,
                        ease: [0.5, 0, 0.01, 1],
                      }}
                      className="absolute w-1.5 rounded-[3px]"
                      style={{
                        left: `${point.left}px`,
                        top: `${point.top}px`,
                        background:
                          point.direction === "down"
                            ? "linear-gradient(rgb(176, 200, 196) 0%, rgb(176, 200, 196) 10%, rgba(156, 217, 93, 0.1) 40%, rgba(113, 210, 240, 0) 75%)"
                            : "linear-gradient(to top, rgb(176, 200, 196) 0%, rgb(176, 200, 196) 10%, rgba(156, 217, 93, 0.1) 40%, rgba(113, 210, 240, 0) 75%)",
                        backgroundColor: "rgba(22, 126, 108, 0.01)",
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: [0, 1] } : {}}
                        transition={{ duration: 0.3, delay: point.delay + 1.7 }}
                        className="absolute -left-[1px] w-2 h-2 bg-[#167E6C] rounded-full"
                        style={{
                          top: point.direction === "down" ? "0px" : `${point.height - 8}px`,
                          backgroundColor: "#146e96",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};