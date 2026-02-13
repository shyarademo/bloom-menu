import { useSiteData } from "@/contexts/SiteDataContext";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  const { branding, social, contact } = useSiteData();

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{branding.logo}</span>
              <span className="font-display text-xl font-semibold">{branding.name}</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">{branding.tagline}</p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-2">
              {contact.hours.map((h) => (
                <div key={h.days} className="text-sm text-primary-foreground/60">
                  <span className="font-medium text-primary-foreground/80">{h.days}</span>
                  <br />
                  {h.time}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {social?.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {social?.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {social?.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
            <div className="mt-6 text-sm text-primary-foreground/60">
              <a href={`mailto:${contact.email}`} className="hover:text-primary-foreground transition-colors">
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} {branding.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
