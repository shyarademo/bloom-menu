import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const { testimonials } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!testimonials.visible) return null;

  const reviews = testimonials.reviews;

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 50) paginate(-1);
    else if (info.offset.x < -50) paginate(1);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
      <div ref={ref} className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-16"
        >
          {testimonials.headline}
        </motion.h2>

        <div className="max-w-2xl mx-auto relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="text-center px-4 cursor-grab active:cursor-grabbing"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviews[current].rating
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed italic mb-6">
                  "{reviews[current].text}"
                </blockquote>
                <cite className="text-muted-foreground font-medium not-italic">
                  — {reviews[current].name}
                </cite>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
