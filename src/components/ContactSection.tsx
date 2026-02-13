import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export function ContactSection() {
  const { contact } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Decorative botanical background */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-primary">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
          <path d="M100 10 C100 10 60 80 100 100 C140 80 100 10 100 10Z" fill="currentColor" opacity="0.3" />
          <path d="M100 190 C100 190 140 120 100 100 C60 120 100 190 100 190Z" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground inline-block relative">
            Visit us
            <span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-accent/60" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-card rounded-3xl border border-border p-8 shadow-sm space-y-6"
          >
            <div className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
              <p className="text-foreground">{contact.address}</p>
            </div>

            <div className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <a href={`tel:${contact.phone}`} className="text-foreground hover:text-primary transition-colors">
                  {contact.phone}
                </a>
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mt-1 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
              <a href={`mailto:${contact.email}`} className="text-foreground hover:text-primary transition-colors">
                {contact.email}
              </a>
            </div>

            <div className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="space-y-1">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex gap-4 text-sm">
                    <span className="font-medium text-foreground w-36">{h.days}</span>
                    <span className="text-muted-foreground">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          {contact.mapUrl && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-lg border border-border aspect-[4/3]"
            >
              <iframe
                src={contact.mapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                title="Restaurant location"
                allowFullScreen
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
