import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type PlanLevel = "starter" | "pro" | "enterprise";

interface PricingFeature {
  name: string;
  included: PlanLevel | "all";
}

interface PricingPlan {
  name: string;
  level: PlanLevel;
  price: {
    monthly: number;
    yearly: number;
  };
  popular?: boolean;
}

const features: PricingFeature[] = [
  { name: "Компьютерная диагностика IVECO", included: "starter" },
  { name: "Замена масла и фильтров", included: "starter" },
  { name: "Проверка тормозной системы", included: "starter" },
  { name: "Консультация механика", included: "starter" },
  { name: "Ремонт двигателя Common Rail", included: "pro" },
  { name: "Ремонт КПП и мостов", included: "pro" },
  { name: "Ремонт подвески и рулевого", included: "pro" },
  { name: "Приоритетная запись", included: "pro" },
  { name: "Капитальный ремонт двигателя", included: "enterprise" },
  { name: "Ремонт и прошивка блоков ECU", included: "enterprise" },
  { name: "Персональный механик для парка", included: "enterprise" },
  { name: "Выезд к клиенту", included: "enterprise" },
  { name: "Гарантия на все работы", included: "all" },
  { name: "Оригинальные запчасти со склада", included: "all" },
];

const plans: PricingPlan[] = [
  {
    name: "ТО",
    price: { monthly: 4900, yearly: 49000 },
    level: "starter",
  },
  {
    name: "Ремонт",
    price: { monthly: 14900, yearly: 149000 },
    level: "pro",
    popular: true,
  },
  {
    name: "Автопарк",
    price: { monthly: 49900, yearly: 499000 },
    level: "enterprise",
  },
];

function shouldShowCheck(included: PricingFeature["included"], level: PlanLevel): boolean {
  if (included === "all") return true;
  if (included === "enterprise" && level === "enterprise") return true;
  if (included === "pro" && (level === "pro" || level === "enterprise")) return true;
  if (included === "starter") return true;
  return false;
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanLevel>("pro");

  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-normal leading-tight mb-4">Стоимость услуг</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Прозрачное ценообразование для владельцев одного грузовика и целых автопарков. Все работы с гарантией и оригинальными запчастями.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full p-1">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2 rounded-full text-lg transition-all",
                !isYearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Разовый ремонт
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2 rounded-full text-lg transition-all",
                isYearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Обслуживание парка
              <span className="ml-2 text-sm text-[#156d95]">-17%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelectedPlan(plan.level)}
              className={cn(
                "relative p-8 rounded-2xl text-left transition-all border-2",
                selectedPlan === plan.level
                  ? "border-[#156d95] bg-[#156d95]/5"
                  : "border-border hover:border-[#156d95]/50"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#156d95] text-white px-4 py-1 rounded-full text-sm">
                  Популярный
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-medium">
                    {(isYearly ? plan.price.yearly : plan.price.monthly).toLocaleString("ru-RU")} ₽
                  </span>
                  <span className="text-lg text-muted-foreground">/{isYearly ? "год" : "мес"}</span>
                </div>
              </div>
              <div
                className={cn(
                  "w-full py-3 px-6 rounded-full text-lg transition-all text-center",
                  selectedPlan === plan.level ? "bg-[#156d95] text-white" : "bg-secondary text-foreground"
                )}
              >
                {selectedPlan === plan.level ? "Выбран" : "Выбрать"}
              </div>
            </button>
          ))}
        </div>

        <div className="border border-border rounded-2xl overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <div className="min-w-[768px]">
              <div className="flex items-center p-6 bg-secondary border-b border-border">
                <div className="flex-1">
                  <h3 className="text-xl font-medium">Что входит</h3>
                </div>
                <div className="flex items-center gap-8">
                  {plans.map((plan) => (
                    <div key={plan.level} className="w-24 text-center text-lg font-medium">
                      {plan.name}
                    </div>
                  ))}
                </div>
              </div>

              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={cn(
                    "flex items-center p-6 transition-colors",
                    index % 2 === 0 ? "bg-background" : "bg-secondary/30",
                    feature.included === selectedPlan && "bg-[#156d95]/5"
                  )}
                >
                  <div className="flex-1">
                    <span className="text-lg">{feature.name}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    {plans.map((plan) => (
                      <div key={plan.level} className="w-24 flex justify-center">
                        {shouldShowCheck(feature.included, plan.level) ? (
                          <div className="w-6 h-6 rounded-full bg-[#156d95] flex items-center justify-center">
                            <CheckIcon className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-[#156d95] text-white px-[18px] py-[15px] rounded-full text-lg hover:rounded-2xl transition-all">
            Записаться на {plans.find((p) => p.level === selectedPlan)?.name}
          </button>
        </div>
      </div>
    </section>
  );
}