import {
  PortfolioNavbar,
  ProductTeaserCard,
  BankingScaleHero,
  CaseStudiesCarousel,
  PricingSection,
  FAQSection,
  Footer,
} from "@/components/landing";

const Index = () => {
  return (
    <>
      <PortfolioNavbar />
      <ProductTeaserCard />
      <BankingScaleHero />
      <CaseStudiesCarousel />
      <PricingSection />
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
    </>
  );
};

export default Index;