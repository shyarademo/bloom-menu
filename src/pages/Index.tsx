import { Helmet } from "react-helmet-async";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedMenuSection } from "@/components/FeaturedMenuSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { OrganicDivider } from "@/components/SectionDividers";

const sectionComponents: Record<string, React.FC> = {
  hero: HeroSection,
  about: AboutSection,
  featuredMenu: FeaturedMenuSection,
  gallery: GallerySection,
  testimonials: TestimonialsSection,
  contact: ContactSection,
};

const Index = () => {
  const { seo, layout } = useSiteData();

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      </Helmet>

      <Navbar />

      <main>
        {layout.sectionOrder.map((sectionKey, i) => {
          const Component = sectionComponents[sectionKey];
          if (!Component) return null;
          return (
            <div key={sectionKey}>
              {i > 0 && sectionKey !== "hero" && <OrganicDivider variant={i % 3} flip={i % 2 === 0} />}
              <Component />
            </div>
          );
        })}
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default Index;
