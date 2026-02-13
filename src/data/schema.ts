import { z } from "zod";

const hslString = z.string().regex(/^\d{1,3}(\.\d+)?\s+\d{1,3}(\.\d+)?%\s+\d{1,3}(\.\d+)?%$/, {
  message: "Must be an HSL string like '145 35% 42%'"
});

const paletteSchema = z.object({
  primary: hslString,
  primaryForeground: hslString,
  accent: hslString,
  accentForeground: hslString,
  secondary: hslString,
  secondaryForeground: hslString,
  background: hslString,
  foreground: hslString,
  card: hslString,
  cardForeground: hslString,
  muted: hslString,
  mutedForeground: hslString,
  border: hslString,
  input: hslString,
  ring: hslString,
  destructive: hslString,
  destructiveForeground: hslString,
  popover: hslString,
  popoverForeground: hslString,
});

const brandingSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  logo: z.string().min(1, "Logo (emoji or image URL) is required"),
  palette: paletteSchema,
});

const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const seoSchema = z.object({
  title: z.string().min(1, "SEO title is required"),
  description: z.string().min(1, "SEO description is required"),
  keywords: z.string().optional(),
  ogImage: z.string().url().optional(),
});

const ctaButtonSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(["primary", "secondary"]),
});

const heroSchema = z.object({
  images: z.array(z.string().url()).min(1, "At least one hero image is required"),
  headline: z.string().min(1, "Hero headline is required"),
  subtext: z.string().min(1),
  ctaButtons: z.array(ctaButtonSchema).min(1),
});

const statSchema = z.object({
  value: z.number(),
  suffix: z.string(),
  label: z.string().min(1),
});

const aboutSchema = z.object({
  visible: z.boolean().default(true),
  headline: z.string().min(1),
  body: z.string().min(1),
  image: z.string().url(),
  stats: z.array(statSchema).optional(),
});

const menuItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  image: z.string().url(),
  tags: z.array(z.string()).optional(),
});

const featuredMenuSchema = z.object({
  visible: z.boolean().default(true),
  headline: z.string().min(1),
  subtext: z.string().optional(),
  items: z.array(menuItemSchema).min(1),
});

const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  items: z.array(menuItemSchema).min(1),
});

const menuSchema = z.object({
  seo: seoSchema.optional(),
  gridColumns: z.number().min(1).max(4).default(3),
  filterTags: z.array(z.string()).optional(),
  categories: z.array(categorySchema).min(1),
});

const galleryImageSchema = z.object({
  src: z.string().url(),
  caption: z.string().optional(),
});

const gallerySchema = z.object({
  visible: z.boolean().default(true),
  headline: z.string().min(1),
  images: z.array(galleryImageSchema).min(1),
});

const reviewSchema = z.object({
  name: z.string().min(1),
  text: z.string().min(1),
  rating: z.number().min(1).max(5),
});

const testimonialsSchema = z.object({
  visible: z.boolean().default(true),
  headline: z.string().min(1),
  reviews: z.array(reviewSchema).min(1),
});

const hoursSchema = z.object({
  days: z.string().min(1),
  time: z.string().min(1),
});

const contactSchema = z.object({
  address: z.string().min(1),
  phone: z.string().min(1),
  whatsapp: z.string().optional(),
  email: z.string().email(),
  mapUrl: z.string().optional(),
  hours: z.array(hoursSchema).min(1),
});

const socialSchema = z.object({
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
  tiktok: z.string().url().optional(),
});

const specialOfferSchema = z.object({
  visible: z.boolean().default(false),
  text: z.string().min(1),
  link: z.string().optional(),
  linkText: z.string().optional(),
});

const layoutSchema = z.object({
  sectionOrder: z.array(z.string()),
});

export const siteDataSchema = z.object({
  branding: brandingSchema,
  navigation: z.array(navItemSchema).min(1),
  seo: seoSchema,
  hero: heroSchema,
  about: aboutSchema,
  featuredMenu: featuredMenuSchema,
  menu: menuSchema,
  gallery: gallerySchema,
  testimonials: testimonialsSchema,
  contact: contactSchema,
  social: socialSchema.optional(),
  specialOffer: specialOfferSchema.optional(),
  layout: layoutSchema,
});

export type SiteData = z.infer<typeof siteDataSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type MenuCategory = z.infer<typeof categorySchema>;
