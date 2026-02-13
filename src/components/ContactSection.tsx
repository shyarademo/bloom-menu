import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export function ContactSection() {
  const { contact } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-16"
        >
          Visit us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
              <p className="text-foreground">{contact.address}</p>
            </div>

            <div className="flex gap-4">
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

            <div className="flex gap-4">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
              <a href={`mailto:${contact.email}`} className="text-foreground hover:text-primary transition-colors">
                {contact.email}
              </a>
            </div>

            <div className="flex gap-4">
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
              className="rounded-2xl overflow-hidden shadow-lg border border-border aspect-[4/3]"
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
