import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4716061e-e8b0-4a87-8ccd-368b4e9b020a/files/12ec49fb-2bab-4ced-aecf-9a212932b157.jpg";

const GAMES: { id: number }[] = [];

const ANNOUNCEMENTS = [
  {
    id: 1,
    date: "1 марта 2026",
    title: "LVP: SURVIVAL — в разработке",
    text: "Начата разработка новой игры — LVP: SURVIVAL! Подробности пока засекречены. Следите за обновлениями на этом сайте.",
    tag: "В разработке",
    tagColor: "green",
  },
];

const NAV_ITEMS = ["Главная", "Игры", "Анонсы"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    setVisibleCards([]);
    const timers = GAMES.map((_, i) =>
      setTimeout(() => setVisibleCards((prev) => [...prev, i]), 200 + i * 150)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeSection]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen grid-bg" style={{ backgroundColor: "var(--dark-bg)", color: "#e0e0e0" }}>
      <div className="fixed inset-0 scanline pointer-events-none z-50 opacity-30" />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(5, 8, 15, 0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--dark-border)",
        }}
      >
        <button
          onClick={() => scrollTo("Главная")}
          className="font-display text-3xl tracking-widest animate-flicker"
          style={{ color: "var(--neon-green)", textShadow: "0 0 15px var(--neon-green)" }}
        >
          LVP
        </button>

        <div className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="px-5 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-200"
              style={{
                color: activeSection === item ? "var(--neon-green)" : "#666",
                borderBottom: activeSection === item ? "2px solid var(--neon-green)" : "2px solid transparent",
                textShadow: activeSection === item ? "0 0 10px var(--neon-green)" : "none",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--neon-green)" }}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "rgba(5, 8, 15, 0.98)" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-display text-5xl tracking-widest uppercase transition-all"
              style={{
                color: activeSection === item ? "var(--neon-green)" : "#444",
                textShadow: activeSection === item ? "0 0 20px var(--neon-green)" : "none",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* ========== ГЛАВНАЯ ========== */}
      {activeSection === "Главная" && (
        <main className="pt-20">
          <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,136,0.07) 0%, transparent 70%)",
              }}
            />

            <div className="relative mb-8 animate-float">
              <div
                className="w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden"
                style={{
                  border: "2px solid var(--neon-green)",
                  boxShadow: "0 0 40px rgba(0,255,136,0.3), 0 0 80px rgba(0,255,136,0.1)",
                }}
              >
                <img src={HERO_IMAGE} alt="LVP" className="w-full h-full object-cover" />
              </div>
            </div>

            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 animate-slide-up"
              style={{ color: "var(--neon-cyan)", opacity: 0, animationDelay: "0.1s" }}
            >
              Инди разработчик · Россия
            </p>

            <h1
              className="font-display text-8xl md:text-[10rem] leading-none mb-4 animate-slide-up"
              style={{
                color: "var(--neon-green)",
                textShadow: "0 0 30px var(--neon-green), 0 0 80px rgba(0,255,136,0.3)",
                opacity: 0,
                animationDelay: "0.2s",
              }}
            >
              LVP
            </h1>

            <p
              className="text-base md:text-lg max-w-md mb-10 leading-relaxed animate-slide-up"
              style={{ color: "#777", opacity: 0, animationDelay: "0.35s" }}
            >
              Создаю игры, которые затягивают. Авторские проекты в жанрах экшн, аркада и головоломка.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-slide-up"
              style={{ opacity: 0, animationDelay: "0.5s" }}
            >
              <button
                onClick={() => scrollTo("Игры")}
                className="neon-glow-btn font-bold text-sm tracking-widest uppercase px-8 py-3 rounded flex items-center gap-2 justify-center"
              >
                <Icon name="Gamepad2" size={16} />
                Играть сейчас
              </button>
              <button
                onClick={() => scrollTo("Анонсы")}
                className="neon-glow-btn-outline font-bold text-sm tracking-widest uppercase px-8 py-3 rounded flex items-center gap-2 justify-center"
              >
                <Icon name="Megaphone" size={16} />
                Анонсы
              </button>
            </div>

            <div
              className="absolute bottom-10 left-0 right-0 flex justify-center gap-12 animate-slide-up"
              style={{ opacity: 0, animationDelay: "0.7s" }}
            >
              {[
                { label: "Игры вышло", value: "0" },
                { label: "В разработке", value: "1" },
                { label: "Год старта", value: "2025" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl" style={{ color: "var(--neon-green)" }}>
                    {s.value}
                  </div>
                  <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "#444" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Teaser last announcement */}
          <section className="px-6 pb-24 max-w-2xl mx-auto">
            <button
              className="w-full text-left p-6 rounded-lg transition-all duration-300"
              style={{
                background: "var(--dark-card)",
                border: "1px solid var(--dark-border)",
              }}
              onClick={() => scrollTo("Анонсы")}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded"
                  style={{ background: "rgba(0,255,136,0.15)", color: "var(--neon-green)" }}
                >
                  Новый анонс
                </span>
                <span className="text-xs" style={{ color: "#555" }}>
                  {ANNOUNCEMENTS[0].date}
                </span>
              </div>
              <h3 className="font-bold text-base mb-1" style={{ color: "#e0e0e0" }}>
                {ANNOUNCEMENTS[0].title}
              </h3>
              <p className="text-sm" style={{ color: "#666" }}>
                {ANNOUNCEMENTS[0].text.slice(0, 90)}...
              </p>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color: "var(--neon-cyan)" }}>
                Читать полностью <Icon name="ArrowRight" size={13} />
              </div>
            </button>
          </section>
        </main>
      )}

      {/* ========== ИГРЫ ========== */}
      {activeSection === "Игры" && (
        <main className="pt-28 px-6 max-w-5xl mx-auto pb-24">
          <div className="mb-12 animate-slide-up" style={{ opacity: 0 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: "var(--neon-cyan)" }}>
              Все проекты
            </p>
            <h2 className="font-display text-6xl md:text-7xl" style={{ color: "#e0e0e0" }}>
              МОИ{" "}
              <span style={{ color: "var(--neon-green)", textShadow: "0 0 20px var(--neon-green)" }}>ИГРЫ</span>
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-pulse-neon"
              style={{ border: "2px solid var(--neon-green)", boxShadow: "0 0 30px rgba(0,255,136,0.2)" }}
            >
              <Icon name="Wrench" size={32} style={{ color: "var(--neon-green)" }} />
            </div>
            <h3 className="font-display text-4xl mb-3" style={{ color: "#e0e0e0" }}>
              ВСЕ ИГРЫ ПОКА-ЧТО В РАЗРАБОТКЕ
            </h3>
            <p className="text-sm max-w-sm" style={{ color: "#555" }}>
              Скоро здесь появятся игры. Следи за анонсами — я сообщу о выходе первой игры!
            </p>
            <button
              onClick={() => scrollTo("Анонсы")}
              className="neon-glow-btn-outline font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded mt-8 flex items-center gap-2"
            >
              <Icon name="Megaphone" size={14} />
              Смотреть анонсы
            </button>
          </div>
        </main>
      )}

      {/* ========== АНОНСЫ ========== */}
      {activeSection === "Анонсы" && (
        <main className="pt-28 px-6 max-w-3xl mx-auto pb-24">
          <div className="mb-12 animate-slide-up" style={{ opacity: 0 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: "var(--neon-cyan)" }}>
              Новости и обновления
            </p>
            <h2 className="font-display text-6xl md:text-7xl" style={{ color: "#e0e0e0" }}>
              АН
              <span style={{ color: "var(--neon-green)", textShadow: "0 0 20px var(--neon-green)" }}>ОНСЫ</span>
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute left-4 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: "linear-gradient(to bottom, var(--neon-green), transparent)" }}
            />

            <div className="flex flex-col gap-6">
              {ANNOUNCEMENTS.map((ann, i) => {
                const neonColor =
                  ann.tagColor === "green"
                    ? "var(--neon-green)"
                    : ann.tagColor === "cyan"
                    ? "var(--neon-cyan)"
                    : "var(--neon-purple)";
                const iconName =
                  ann.tagColor === "green" ? "Megaphone" : ann.tagColor === "cyan" ? "Zap" : "Wrench";

                return (
                  <div
                    key={ann.id}
                    className="sm:pl-12 relative"
                    style={{
                      opacity: visibleCards.includes(i) ? 1 : 0,
                      transform: visibleCards.includes(i) ? "translateX(0)" : "translateX(-20px)",
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                    }}
                  >
                    <div
                      className="absolute left-0 top-6 w-8 h-8 rounded-full hidden sm:flex items-center justify-center"
                      style={{
                        background: "var(--dark-bg)",
                        border: `2px solid ${neonColor}`,
                        boxShadow: `0 0 10px ${neonColor}`,
                      }}
                    >
                      <Icon name={iconName} size={13} style={{ color: neonColor }} />
                    </div>

                    <div
                      className="p-6 rounded-lg"
                      style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded"
                          style={{
                            background: `${neonColor}1a`,
                            color: neonColor,
                          }}
                        >
                          {ann.tag}
                        </span>
                        <span className="text-xs" style={{ color: "#555" }}>
                          {ann.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: "#e0e0e0" }}>
                        {ann.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#777" }}>
                        {ann.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer
        className="text-center py-8 px-6 text-xs"
        style={{ color: "#333", borderTop: "1px solid var(--dark-border)" }}
      >
        <span className="font-display text-xl" style={{ color: "var(--neon-green)" }}>
          LVP
        </span>{" "}
        · Инди разработчик игр · 2025–2026
      </footer>
    </div>
  );
}