import { useState } from "react";
import {
  PortfolioNavbar,
  ProductTeaserCard,
  BankingScaleHero,
  CaseStudiesCarousel,
  PricingSection,
  FAQSection,
  Footer,
  ContactModal,
} from "@/components/landing";

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <PortfolioNavbar />
      <ProductTeaserCard />
      <BankingScaleHero />
      <CaseStudiesCarousel />
      <PricingSection onContactClick={() => setIsContactOpen(true)} />
      <FAQSection />
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-[40px] font-normal leading-tight text-[#202020] tracking-tight mb-4">Как нас найти</h2>
          <p className="text-lg text-[#666666] mb-8">г.о. Люберцы, Московская область</p>
          <div className="w-full rounded-[24px] overflow-hidden" style={{ height: 420 }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.992298%2C55.586241&z=16&pt=37.992298%2C55.586241%2Cpm2rdm&lang=ru_RU"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Расположение сервиса IVECO"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>
      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Плавающая кнопка связи */}
      <button
        onClick={() => setIsContactOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#156d95] text-white rounded-full px-5 py-3.5 shadow-lg hover:bg-[#156d95]/90 transition-all hover:shadow-xl flex items-center gap-2 font-medium"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
        Написать нам
      </button>
    </>
  );
};

export default Index;
