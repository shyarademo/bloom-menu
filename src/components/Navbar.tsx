import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Menu, X, UtensilsCrossed } from "lucide-react";

export function Navbar() {
  const { branding, navigation } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((n) => n.href.replace("#", ""))
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [navigation]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
          }}
        />
      </div>

      <header
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#hero" className="flex items-center gap-2">
            <span className="text-2xl">{branding.logo}</span>
            <span className={`font-display text-xl font-semibold transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
              {branding.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? scrolled ? "text-primary bg-primary/10" : "text-white bg-white/15"
                      : scrolled ? "text-foreground/70 hover:text-foreground hover:bg-muted" : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <a
              href="/menu"
              className="ml-4 px-5 py-2.5 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Full Menu
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 transition-colors ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-foreground/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[80] w-72 bg-card shadow-2xl p-8 flex flex-col"
            >
              <button
                className="self-end p-2 text-foreground mb-8"
                onClick={() => setMobileOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col gap-6">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-lg text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/menu"
                  className="mt-4 px-6 py-3 text-center font-medium rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center gap-2"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Full Menu
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
