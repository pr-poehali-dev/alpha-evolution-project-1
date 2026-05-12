import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
  id: string;
  company: string;
  logo: ReactNode;
  title: string;
  features: string[];
  quote: string;
  attribution: string;
  accentColor: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "logistic",
    company: "АвтоЛогистика",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#156d95" height="48" rx="12" width="48" />
        <path d="M8 18h20v16H8zM28 22h8l4 5v7h-12V22zM14 35a3 3 0 100-6 3 3 0 000 6zM36 35a3 3 0 100-6 3 3 0 000 6z" fill="white" strokeWidth="0" />
      </svg>
    ),
    title: "АвтоЛогистика обслуживает весь парк IVECO Daily — от планового ТО до капитального ремонта двигателей.",
    features: ["Плановое ТО", "Ремонт двигателей", "Диагностика ECU"],
    quote: "Наши Daily простаивают минимум — сервис знает каждую машину в лицо и держит нужные запчасти на складе.",
    attribution: "Дмитрий Ларин, директор автопарка, АвтоЛогистика",
    accentColor: "#156d95",
  },
  {
    id: "stroytrans",
    company: "СтройТранс",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#f59e0b" height="48" rx="12" width="48" />
        <path d="M10 30V18l8-6 8 6v12H10zM26 30V22l6-4 6 4v8H26z" fill="white" />
      </svg>
    ),
    title: "СтройТранс восстановил парк из 12 IVECO Eurocargo после сезона тяжёлых строительных работ.",
    features: ["Ремонт КПП", "Подвеска и мосты", "Тормозная система"],
    quote: "Отдали 12 грузовиков одновременно — вернули в срок и все на ходу. Другой сервис за такое не брался.",
    attribution: "Игорь Семёнов, владелец, СтройТранс",
    accentColor: "#f59e0b",
  },
  {
    id: "agropark",
    company: "АгроПарк",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#16a34a" height="48" rx="12" width="48" />
        <circle cx="24" cy="22" r="10" fill="white" />
        <path d="M19 22c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "АгроПарк переводит весь флот IVECO Stralis на регулярное ТО — простои сократились на 40%.",
    features: ["Регулярное ТО", "Электрооборудование", "Прошивка ECU"],
    quote: "Раньше теряли по 2–3 дня на поиск сервиса, который знает Stralis. Теперь просто звоним сюда.",
    attribution: "Наталья Козырева, логист, АгроПарк",
    accentColor: "#16a34a",
  },
  {
    id: "tsentr-dostavki",
    company: "Центр Доставки",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#7c3aed" height="48" rx="12" width="48" />
        <path d="M12 24l8-8 8 8-8 8-8-8z" fill="white" />
        <circle cx="32" cy="20" r="6" fill="white" opacity="0.6" />
      </svg>
    ),
    title: "Центр Доставки решил хроническую проблему с турбодизелями Common Rail на IVECO Trakker.",
    features: ["Common Rail", "Диагностика ЭБУ", "Ремонт турбин"],
    quote: "Три сервиса не могли найти причину — здесь нашли и устранили за один день. Специализация решает.",
    attribution: "Алексей Воронов, механик парка, Центр Доставки",
    accentColor: "#7c3aed",
  },
];

const FeatureBadge = ({ name }: { name: string }) => {
  const getIcon = (featureName: string) => {
    if (featureName.includes("ТО") || featureName.includes("Плановое")) {
      return (
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-50">
          <circle cx="8" cy="8" r="6" stroke="#156d95" strokeWidth="1.5" />
          <path d="M8 5v3l2 2" stroke="#156d95" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    } else if (featureName.includes("двигател") || featureName.includes("Common Rail") || featureName.includes("турбин")) {
      return (
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-50">
          <rect x="2" y="5" width="12" height="7" rx="1.5" stroke="#ef4444" strokeWidth="1.5" />
          <path d="M5 5V3M11 5V3M2 8h12" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    } else if (featureName.includes("КПП") || featureName.includes("Подвеска") || featureName.includes("Тормозная") || featureName.includes("мост")) {
      return (
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-50">
          <circle cx="4" cy="11" r="2.5" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="2.5" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M6.5 11H9.5M4 8.5V5l4-2 4 2v3.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    } else if (featureName.includes("ECU") || featureName.includes("ЭБУ") || featureName.includes("Диагностика") || featureName.includes("Электро") || featureName.includes("Прошивка")) {
      return (
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-50">
          <path d="M9 2L7 8h4L8 14" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center gap-2 bg-white/75 shadow-sm border border-black/5 rounded-lg px-2 py-1 text-sm font-medium text-foreground">
      {getIcon(name)}
      {name}
    </div>
  );
};

const NotionCollaborationCard = ({ delay, zIndex }: { accentColor: string; delay: number; zIndex: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
      className="absolute w-[380px] rounded-xl p-6 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
        transform: "translate(-200px, -80px)",
        zIndex,
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Статус диагностики</h4>
          <span className="text-xs text-muted-foreground">Сегодня в работе</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-foreground">IVECO Daily — ТО пройдено</span>
            </div>
            <span className="text-sm font-semibold text-green-600">✓ Готов</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-foreground">Eurocargo — ремонт КПП</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">В работе</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-sm text-foreground">Stralis — диагностика ECU</span>
            </div>
            <span className="text-sm font-semibold text-amber-600">Ожидает</span>
          </div>
        </div>
        <div className="pt-3 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">8</span> грузовиков в работе сегодня
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StripeGlobalCard = ({ accentColor, delay, zIndex }: { accentColor: string; delay: number; zIndex: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
      className="absolute w-[400px] rounded-xl p-6 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
        transform: "translate(-180px, -60px)",
        zIndex,
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Склад запчастей IVECO</h4>
          <span className="text-xs text-muted-foreground">В наличии</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-foreground">Daily</div>
            <div className="text-xs text-muted-foreground mt-1">Все годы</div>
            <div className="text-xs font-semibold text-green-600 mt-2">Есть</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-foreground">Stralis</div>
            <div className="text-xs text-muted-foreground mt-1">Тягачи</div>
            <div className="text-xs font-semibold text-blue-600 mt-2">Есть</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-foreground">Trakker</div>
            <div className="text-xs text-muted-foreground mt-1">Строит.</div>
            <div className="text-xs font-semibold text-purple-600 mt-2">Есть</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Наличие оригинальных деталей</span>
            <span className="font-semibold text-foreground">94%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "94%", backgroundColor: accentColor }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FigmaSprintCard = ({ accentColor, delay, zIndex }: { accentColor: string; delay: number; zIndex: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
      className="absolute w-[380px] rounded-xl p-6 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
        transform: "translate(-190px, -70px)",
        zIndex,
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: accentColor }}
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Отчёт о ремонте</h4>
              <p className="text-xs text-muted-foreground">IVECO Trakker, сегодня</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Диагностика Common Rail</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: "100%" }} />
              </div>
              <span className="text-xs font-semibold text-foreground">✓</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Замена форсунок</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "100%" }} />
              </div>
              <span className="text-xs font-semibold text-foreground">✓</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Перепрошивка ECU</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-green-600">Выполнено</span>
            </div>
          </div>
        </div>
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Время простоя клиента</span>
            <span className="font-semibold text-foreground">1 день</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CaseStudiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentStudy = caseStudies[currentIndex];

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-24 px-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-[40px] leading-tight font-normal text-foreground mb-6 tracking-tight">
            Истории успеха клиентов
          </h1>
          <p className="text-lg leading-7 text-muted-foreground max-w-2xl mx-auto">
            Узнайте, как ведущие команды используют СинхроЛинк для понимания взаимодействия и синхронизации.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStudy.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="space-y-6"
              >
                <div className="text-foreground/60">{currentStudy.logo}</div>
                <h2 className="text-4xl font-bold text-foreground leading-tight tracking-tight text-[32px] font-normal">
                  {currentStudy.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {currentStudy.features.map((feature, idx) => (
                    <FeatureBadge key={idx} name={feature} />
                  ))}
                </div>
                <blockquote className="border-l-4 border-primary pl-6 py-2">
                  <p className="text-lg leading-7 text-foreground/80 italic mb-3">
                    "{currentStudy.quote}"
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    {currentStudy.attribution}
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {caseStudies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Перейти к слайду ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="Предыдущий слайд"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="Следующий слайд"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStudy.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {currentStudy.id === "notion" && (
                  <NotionCollaborationCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                )}
                {currentStudy.id === "cloudwatch" && (
                  <StripeGlobalCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                )}
                {currentStudy.id === "eightball" && (
                  <NotionCollaborationCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                )}
                {currentStudy.id === "coreos" && (
                  <FigmaSprintCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};