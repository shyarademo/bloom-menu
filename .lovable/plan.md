

# 🌿 Neo-Botanical Restaurant Website

A JSON-driven, single-page restaurant website with a dedicated menu page. Every piece of content, color, and layout is controlled by `siteData.json` — no code edits needed.

**Aesthetic: Neo-Botanical** — Soft sage, warm peach, creamy linen backgrounds, organic blob shapes as section dividers, asymmetric image placements, and playful typography. Light, airy, and unmistakably unique.

---

## Phase 1: Foundation & Data Layer

### siteData.json + Zod Validation
- Create the complete `siteData.json` with all sections (branding, nav, seo, hero, about, featuredMenu, menu, gallery, testimonials, contact, social, specialOffer, layout)
- Build a Zod schema that validates every field with friendly error messages
- Create a **SiteDataContext** that loads and validates JSON at startup
- If validation fails, render a styled error overlay showing exactly which fields are wrong and how to fix them
- All components consume typed data from context — zero hardcoded content

### EDITING_GUIDE.md
- Document every JSON field with type, required/optional status, example values, and formatting rules (e.g., "HSL string like `145 30% 60%`")

---

## Phase 2: Design System & Theming

### CSS Variables & Fonts
- Map the JSON color palette to HSL CSS variables (primary, accent, muted, card, background, foreground, border, etc.)
- Load **Fraunces** (display) and **Space Grotesk** (body) via Google Fonts CSS import
- Expose as `--font-display` / `--font-body` CSS variables
- Components use only Tailwind semantic tokens — never hardcoded colors

---

## Phase 3: Homepage Sections

### Sticky Navbar
- Glass blur effect that increases on scroll
- Active section highlighting using IntersectionObserver
- Animated underline indicator (framer-motion layoutId)
- Mobile: slide-out drawer with spring animation
- Scroll progress bar at the very top of the viewport

### Hero Section
- Ken Burns slideshow with crossfade between multiple background images
- Staggered word-reveal headline animation
- CTA buttons array from JSON with magnetic hover effect (subtle pull toward cursor)

### About Section
- Asymmetric layout with image and text
- Animated stats counters (value/suffix/label)
- Scroll-triggered fade-up entrance

### Featured Menu (togglable)
- Highlighted dishes with cursor-following glow effect on cards
- Each item shows name, description, price, image, and dietary tags
- Staggered card entrance animation

### Gallery (togglable)
- Masonry image grid with captions
- Lazy-loaded images with shimmer placeholder
- Organic, offset layout that feels hand-curated

### Testimonials (togglable)
- Swipeable carousel with framer-motion drag gestures
- Star ratings display
- Smooth spring physics on swipe

### Contact Section
- Address, phone (with WhatsApp link), email, opening hours
- Embedded Google Maps via configurable URL
- Clean, readable layout

### Special Offer Banner (togglable)
- Sticky/dismissible top banner with text and link

### Section Ordering
- `layout.sectionOrder` array controls the order sections appear
- Any section with `visible: false` is completely hidden

---

## Phase 4: Full Menu Page (`/menu`)

### Dedicated Menu Page
- Route: `/menu`
- Category-based layout with all menu items from JSON
- Filterable by tags (dietary/type filters)
- Configurable grid columns
- Cursor-following glow on item cards
- SEO meta tags via react-helmet-async

---

## Phase 5: Premium UX Polish

### Animations & Interactions
- Scroll-triggered section animations (fade-up, slide-up, scale-in) via IntersectionObserver + framer-motion
- Magnetic CTA buttons with subtle cursor-pull effect
- Cursor-following glow effect on cards
- Cinematic organic blob/wave section dividers (SVG)
- Lazy image loading with shimmer placeholder animation
- Back-to-top floating button with smooth scroll
- Custom styled scrollbar matching the theme
- Smooth scroll behavior globally

### SEO
- react-helmet-async on both pages with title, description, keywords, OG image — all from JSON

### Responsiveness
- Fully responsive down to 320px width
- Mobile-optimized navigation, layouts, and touch interactions

