import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useGlowEffect } from "@/hooks/useGlowEffect";
import { LazyImage } from "./LazyImage";
import { ArrowRight } from "lucide-react";

const tagColors: Record<string, string> = {
  vegan: "bg-emerald-100 text-emerald-700",
  vegetarian: "bg-green-100 text-green-700",
  "gluten-free": "bg-sky-100 text-sky-700",
  pescatarian: "bg-blue-100 text-blue-700",
  seasonal: "bg-amber-100 text-amber-700",
};

function MenuCard({
  name,
  description,
  price,
  image,
  tags,
  index,
}: {
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[];
  index: number;
}) {
  const { glowStyle, handleMouseMove, handleMouseLeave } = useGlowEffect();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" style={glowStyle} />
      <div className="aspect-[3/4] overflow-hidden relative">
        <LazyImage
          src={image}
          alt={name}
          className="aspect-[3/4] group-hover:scale-105 transition-transform duration-700"
        />
        {/* Price badge revealed on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-4 right-4 font-display text-xl font-bold text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">
          {price}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${tagColors[tag] || "bg-secondary text-secondary-foreground"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function FeaturedMenuSection() {
  const { featuredMenu } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();

  if (!featuredMenu.visible) return null;

  return (
    <section id="featured-menu" className="py-20 md:py-32 bg-secondary/30">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            {featuredMenu.headline}
          </h2>
          {featuredMenu.subtext && (
            <p className="text-muted-foreground text-lg">{featuredMenu.subtext}</p>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMenu.items.map((item, i) => (
            <MenuCard key={item.name} name={item.name} description={item.description} price={item.price} image={item.image} tags={item.tags} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/menu"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View Full Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
