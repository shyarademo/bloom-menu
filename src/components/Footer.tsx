import { useSiteData } from "@/contexts/SiteDataContext";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  const { branding, social, contact } = useSiteData();

  return (
    <footer className="relative">
      {/* Wave transition */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z" fill="hsl(var(--secondary))" />
        </svg>
      </div>

      <div className="bg-secondary py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{branding.logo}</span>
                <span className="font-display text-xl font-semibold text-foreground">{branding.name}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{branding.tagline}</p>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-primary mb-4">Hours</h3>
              <div className="space-y-2">
                {contact.hours.map((h) => (
                  <div key={h.days} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{h.days}</span>
                    <br />
                    {h.time}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-primary mb-4">Connect</h3>
              <div className="flex gap-3">
                {social?.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {social?.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {social?.twitter && (
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {branding.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
