import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useGlowEffect } from "@/hooks/useGlowEffect";
import { LazyImage } from "./LazyImage";

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
      className="relative group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" style={glowStyle} />
      <div className="aspect-square overflow-hidden">
        <LazyImage
          src={image}
          alt={name}
          className="aspect-square group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-card-foreground">{name}</h3>
          <span className="font-display text-lg font-bold text-accent shrink-0">{price}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground"
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
            className="inline-block px-8 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View Full Menu
          </a>
        </motion.div>
      </div>
    </section>
  );
}
