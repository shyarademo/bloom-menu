import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LazyImage } from "./LazyImage";
import { X } from "lucide-react";

export function GallerySection() {
  const { gallery } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<number | null>(null);

  if (!gallery.visible) return null;

  // Editorial sizing pattern
  const sizeClasses = [
    "sm:col-span-2 sm:row-span-2", // large
    "",                              // normal
    "sm:row-span-2",                // tall
    "",                              // normal
    "sm:col-span-2",                // wide
    "",                              // normal
  ];

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

        {/* Editorial masonry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[200px] sm:auto-rows-[220px]">
          {gallery.images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${sizeClasses[i % sizeClasses.length]}`}
              onClick={() => setSelected(i)}
            >
              <LazyImage src={img.src} alt={img.caption || ""} className="w-full h-full object-cover" />
              {/* Always-visible caption */}
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/50 to-transparent p-4">
                  <p className="text-primary-foreground text-sm font-medium">{img.caption}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 p-2 rounded-full bg-background/20 text-primary-foreground hover:bg-background/40 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={gallery.images[selected].src.replace(/w=\d+/, "w=1200").replace(/h=\d+/, "h=900")}
              alt={gallery.images[selected].caption || ""}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {gallery.images[selected].caption && (
              <p className="absolute bottom-8 text-primary-foreground text-lg font-display font-medium">
                {gallery.images[selected].caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
