import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

function MagneticButton({
  label,
  href,
  variant,
}: {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}) {
  const { offset, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.25);
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`inline-block px-8 py-4 rounded-full font-medium text-base transition-colors ${
        isPrimary
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border-2 border-primary text-primary hover:bg-primary/10"
      }`}
    >
      {label}
    </motion.a>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: "easeOut" }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

export function HeroSection() {
  const { hero } = useSiteData();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (hero.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % hero.images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [hero.images.length]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ken Burns slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.5 }, scale: { duration: 12, ease: "linear" } }}
          className="absolute inset-0"
        >
          <img
            src={hero.images[currentImage]}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-6 py-32 md:py-40">
        <div className="max-w-3xl">
          <WordReveal text={hero.headline} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            {hero.subtext}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {hero.ctaButtons.map((btn) => (
              <MagneticButton key={btn.label} label={btn.label} href={btn.href} variant={btn.variant} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Organic bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,30 1440,60 L1440,100 L0,100 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
