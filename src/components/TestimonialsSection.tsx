import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

function InitialAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div className="w-12 h-12 rounded-full bg-primary/15 text-primary font-display font-bold text-lg flex items-center justify-center shrink-0">
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: { name?: string; text?: string; rating?: number } }) {
  return (
    <div className="relative bg-card rounded-2xl border border-border p-8 shadow-sm">
      {/* Decorative quotation mark */}
      <span className="absolute top-4 right-6 font-display text-6xl text-primary/10 leading-none select-none">"</span>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`}
          />
        ))}
      </div>
      <blockquote className="text-foreground leading-relaxed mb-6 relative z-10">
        "{review.text}"
      </blockquote>
      <div className="flex items-center gap-3">
        <InitialAvatar name={review.name} />
        <cite className="text-muted-foreground font-medium not-italic text-sm">{review.name}</cite>
      </div>
    </div>
  );
}

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
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/30">
      <div ref={ref} className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-12"
        >
          {testimonials.headline}
        </motion.h2>

        {/* Desktop: 3-card grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="md:hidden relative">
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
                className="cursor-grab active:cursor-grabbing"
              >
                <ReviewCard review={reviews[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 p-2 rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 p-2 rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
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
