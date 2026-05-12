import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Почему стоит выбрать сервис, специализирующийся только на IVECO?",
    answer:
      "Узкая специализация даёт нам то, чего нет у универсальных сервисов: оригинальный диагностический софт IVECO, редкие запчасти на складе, механики с сертификацией и опытом именно по этой марке. В результате — точнее диагностика, быстрее ремонт, меньше повторных обращений по той же проблеме.",
  },
  {
    question: "Какие модели IVECO вы обслуживаете?",
    answer:
      "Мы работаем со всей линейкой IVECO: Daily (все поколения), Eurocargo, Trakker и Stralis. Это включает все типы кузовов, двигателей и трансмиссий — от лёгких фургонов Daily до тяжёлых магистральных тягачей Stralis. Если у вас нестандартная модификация — просто позвоните, разберёмся.",
  },
  {
    question: "Что такое диагностика ECU и зачем она нужна?",
    answer:
      "ECU (электронный блок управления) — «мозг» современного грузовика IVECO. С его помощью управляются двигатель, трансмиссия, ABS и другие системы. Профессиональная диагностика ECU позволяет считать ошибки, которые не видны при визуальном осмотре, и выявить неисправность до того, как она станет дорогостоящей поломкой. Мы используем оригинальный софт IVECO.",
  },
  {
    question: "Как быстро вы можете принять грузовик в ремонт?",
    answer:
      "Для планового ТО и диагностики — запись доступна уже на следующий рабочий день. При срочных поломках стараемся принять в день обращения. Для владельцев автопарков предусмотрена приоритетная запись и персональный менеджер. Позвоните или оставьте заявку на сайте — перезвоним в течение 15 минут.",
  },
  {
    question: "Даёте ли вы гарантию на выполненные работы?",
    answer:
      "Да, на все виды ремонта предоставляется письменная гарантия. Срок зависит от вида работ: на ТО — 3 месяца или 10 000 км, на ремонт агрегатов — до 12 месяцев. Мы используем оригинальные и сертифицированные запчасти, поэтому уверены в качестве каждой работы.",
  },
];

export const FAQSection = ({ title = "Часто задаваемые вопросы об IVECO", faqs = defaultFAQs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-[40px] leading-tight font-normal text-[#202020] tracking-tight sticky top-24">
              {title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-lg leading-7 text-[#202020] pr-8 font-normal">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-6 h-6 text-[#202020]" strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-12">
                          <p className="text-lg leading-6 text-[#666666]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};