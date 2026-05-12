import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

interface NavigationLink {
  name: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  { name: "Услуги", href: "#features" },
  { name: "Цены", href: "#pricing" },
  { name: "Кейсы", href: "#solutions" },
  { name: "FAQ", href: "#resources" },
];

const phones = [
  { number: "+7 967 170 9494", href: "tel:+79671709494" },
  { number: "+7 926 304 0203", href: "tel:+79263040203" },
];

const messengers = [
  {
    name: "Telegram",
    href: "https://t.me/+79671709494",
    color: "#2AABEE",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/79671709494",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "MAX",
    href: "https://max.ru/+79671709494",
    color: "#7B61FF",
    icon: (
      <img src="https://cdn.poehali.dev/files/55bd03ad-570f-4473-b785-ce1cf8a06b97.jpeg" alt="MAX" className="w-4 h-4 rounded-full object-cover" />
    ),
  },
];

export const PortfolioNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLinkClick = (href: string) => {
    closeMobileMenu();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex-shrink-0">
            <button
              onClick={() => handleLinkClick("#home")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
            >
              <svg width="72" height="28" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="180" height="60" rx="4" fill="#CC6600"/>
                <text x="90" y="44" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="42" fill="white" letterSpacing="2">IVECO</text>
              </svg>
              <span className="font-semibold text-lg text-foreground">Сервис</span>
            </button>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors duration-200 relative group"
                >
                  <span>{link.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end gap-0.5">
              {phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-[#156d95] transition-colors duration-200 whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {p.number}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {messengers.map((m) => (
                <a
                  key={m.name}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={m.name}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
                  style={{ backgroundColor: m.color }}
                >
                  {m.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary p-2 rounded-md transition-colors duration-200"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                >
                  <span>{link.name}</span>
                </button>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                {phones.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="flex items-center gap-2 text-base font-semibold text-foreground"
                  >
                    <Phone className="w-4 h-4" />
                    {p.number}
                  </a>
                ))}
                <div className="flex gap-2 pt-2">
                  {messengers.map((m) => (
                    <a
                      key={m.name}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.icon}
                      {m.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};