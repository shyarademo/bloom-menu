import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { useGlowEffect } from "@/hooks/useGlowEffect";
import { LazyImage } from "@/components/LazyImage";
import { ArrowLeft } from "lucide-react";

function MenuItemCard({
  name,
  description,
  price,
  image,
  tags,
}: {
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[];
}) {
  const { glowStyle, handleMouseMove, handleMouseLeave } = useGlowEffect();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" style={glowStyle} />
      <div className="aspect-square overflow-hidden">
        <LazyImage src={image} alt={name} className="aspect-square group-hover:scale-105 transition-transform duration-700" />
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
              <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const MenuPage = () => {
  const { menu, branding } = useSiteData();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    if (!activeTag) return menu.categories;
    return menu.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.tags?.includes(activeTag)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [menu.categories, activeTag]);

  const gridCols = menu.gridColumns === 2 ? "sm:grid-cols-2" : menu.gridColumns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <Helmet>
        <title>{menu.seo?.title || `Menu — ${branding.name}`}</title>
        {menu.seo?.description && <meta name="description" content={menu.seo.description} />}
      </Helmet>

      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Back link */}
          <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </a>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4"
          >
            Our Menu
          </motion.h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl">
            Seasonal ingredients, honest cooking, botanical inspiration.
          </p>

          {/* Filter tags */}
          {menu.filterTags && menu.filterTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !activeTag ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                All
              </button>
              {menu.filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    activeTag === tag ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Categories */}
          <div className="space-y-20">
            {filteredCategories.map((category) => (
              <motion.section
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-muted-foreground mb-8">{category.description}</p>
                )}
                <div className={`grid ${gridCols} gap-6`}>
                  {category.items.map((item) => (
                    <MenuItemCard key={item.name} name={item.name} description={item.description} price={item.price} image={item.image} tags={item.tags} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default MenuPage;
