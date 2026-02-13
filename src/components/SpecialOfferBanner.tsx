import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { X } from "lucide-react";

export function SpecialOfferBanner() {
  const data = useSiteData();
  const offer = data.specialOffer;
  const [dismissed, setDismissed] = useState(false);

  if (!offer?.visible || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-accent text-accent-foreground overflow-hidden"
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-center gap-4 text-sm font-medium">
          <span>{offer.text}</span>
          {offer.link && offer.linkText && (
            <a
              href={offer.link}
              className="underline underline-offset-2 hover:no-underline font-semibold"
            >
              {offer.linkText}
            </a>
          )}
          <button onClick={() => setDismissed(true)} className="ml-2 p-1 hover:bg-accent-foreground/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
