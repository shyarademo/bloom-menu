import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LazyImage } from "./LazyImage";

export function GallerySection() {
  const { gallery } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();

  if (!gallery.visible) return null;

  return (
    <section id="gallery" className="py-20 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-16"
        >
          {gallery.headline}
        </motion.h2>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {gallery.images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden"
              style={{ marginTop: i === 0 ? 0 : undefined }}
            >
              <LazyImage src={img.src} alt={img.caption || ""} className="w-full" />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-primary-foreground text-sm font-medium">{img.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
