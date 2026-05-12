import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface ServiceItem {
  name: string;
  price: string;
  popular?: boolean;
  category: "to" | "engine" | "electric";
}

const services: ServiceItem[] = [
  { name: "Компьютерная диагностика", price: "от 2 500 ₽", category: "to" },
  { name: "Замена масла и фильтров (ТО)", price: "от 4 500 ₽", category: "to", popular: true },
  { name: "Замена тормозных колодок", price: "от 3 500 ₽", category: "to" },
  { name: "Замена ремня ГРМ", price: "от 8 000 ₽", category: "to" },
  { name: "Ремонт топливной системы Common Rail", price: "от 15 000 ₽", category: "engine", popular: true },
  { name: "Капитальный ремонт двигателя", price: "от 80 000 ₽", category: "engine" },
  { name: "Ремонт турбокомпрессора", price: "от 12 000 ₽", category: "engine" },
  { name: "Ремонт КПП", price: "от 25 000 ₽", category: "engine", popular: true },
  { name: "Ремонт подвески и рулевого", price: "от 5 000 ₽", category: "to" },
  { name: "Диагностика и ремонт ECU", price: "от 6 000 ₽", category: "electric", popular: true },
  { name: "Прошивка блока управления", price: "от 4 000 ₽", category: "electric" },
  { name: "Ремонт электрооборудования", price: "от 3 000 ₽", category: "electric" },
];

const included = [
  "Гарантия на все работы",
  "Оригинальные и сертифицированные запчасти",
  "Оригинальный диагностический софт IVECO",
  "Опытные механики со специализацией IVECO",
];

interface PricingSectionProps {
  onContactClick?: () => void;
}

export function PricingSection({ onContactClick }: PricingSectionProps) {
  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-normal leading-tight mb-4">Стоимость услуг</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Популярные виды работ для IVECO Daily, Eurocargo, Trakker, Stralis. Точную стоимость уточняйте у мастера — зависит от модели и объёма.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {services.map((service) => (
            <div
              key={service.name}
              className={cn(
                "relative p-6 rounded-2xl border-2 bg-card transition-all",
                service.popular
                  ? "border-[#156d95] bg-[#156d95]/5"
                  : "border-border"
              )}
            >
              {service.popular && (
                <span className="absolute -top-3 left-5 bg-[#156d95] text-white px-3 py-0.5 rounded-full text-xs font-medium">
                  Популярная услуга
                </span>
              )}
              <h3 className="text-base font-medium text-foreground mb-2">{service.name}</h3>
              <p className="text-2xl font-semibold text-[#156d95]">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="border border-border rounded-2xl p-8 bg-card mb-12">
          <h3 className="text-xl font-medium mb-5">Включено в каждый заказ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#156d95] flex-shrink-0 flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-base text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-muted-foreground mb-4">Не нашли нужную услугу или хотите уточнить стоимость?</p>
          <button
            onClick={onContactClick}
            className="bg-[#156d95] text-white px-8 py-4 rounded-full text-lg hover:rounded-2xl transition-all hover:bg-[#156d95]/90"
          >
            Узнать точную стоимость
          </button>
        </div>
      </div>
    </section>
  );
}
