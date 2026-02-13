import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LazyImage } from "./LazyImage";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const { about } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();

  if (!about.visible) return null;

  return (
    <section id="about" className="py-20 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image - asymmetric */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden md:-rotate-2 shadow-xl">
              <LazyImage src={about.image} alt={about.headline} className="aspect-[4/5]" />
            </div>
            {/* Decorative blob */}
            <div className="absolute -z-10 -top-8 -left-8 w-48 h-48 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -z-10 -bottom-6 -right-6 w-36 h-36 rounded-full bg-primary/10 blur-2xl" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Decorative leaf accent */}
            <span className="text-3xl mb-4 block">🌿</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {about.headline}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {about.body}
            </p>

            {about.stats && (
              <div className="grid grid-cols-3 gap-4">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-2xl bg-card border border-border">
                    <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
