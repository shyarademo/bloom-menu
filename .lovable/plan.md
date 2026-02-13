

# Major UI Improvements

## 1. Remove Special Offer Banner
- Remove `<SpecialOfferBanner />` from `Index.tsx`
- Set `specialOffer.visible` to `false` in `siteData.json`

## 2. Hero Section Overhaul
**Current issue**: The 60% background overlay washes out the images, making the hero feel flat. Text blends into the muted background.

**Improvements**:
- Replace the uniform overlay with a gradient that's darker on the left (where text sits) and transparent on the right, so the food imagery actually shines
- Add a subtle animated scroll indicator (chevron or mouse icon) at the bottom to invite scrolling
- Make CTA buttons larger with more visual weight
- Add a decorative botanical leaf SVG element floating near the text for the "neo-botanical" identity

## 3. Navbar Refinement
**Current issue**: The offer text was crammed between the logo and nav links, making it cluttered. With the banner removed, the navbar has room to breathe.

**Improvements**:
- Add a subtle top border/line accent when scrolled (not just shadow)
- Increase nav link spacing and add a hover fill effect (pill-shaped background on hover instead of just color change)
- Make the "Full Menu" button slightly larger with a subtle icon

## 4. About Section Enhancement
**Current issue**: The tilted image and stats are decent but the layout feels generic.

**Improvements**:
- Add a decorative quote mark or botanical accent near the headline
- Give stats a card-like treatment with subtle borders and background instead of plain text
- Add a subtle parallax-like offset to the decorative blur blob behind the image

## 5. Featured Menu Cards Upgrade
**Current issue**: Standard card layout with square images -- looks like every other food site.

**Improvements**:
- Use rounded-3xl cards with a slightly different aspect ratio (3:4 instead of 1:1) for a more editorial feel
- Add an overlay gradient on the image that reveals the price as a badge on hover
- Make tags more colorful -- each dietary tag gets a distinct subtle color (green for vegan, blue for gluten-free, etc.)
- Add a "View Full Menu" CTA with an arrow animation on hover

## 6. Gallery Section Redesign
**Current issue**: Basic masonry with flat rounded images and hidden captions.

**Improvements**:
- Add alternating sizes -- make certain images span 2 rows or 2 columns for a more editorial masonry
- Show captions always (not just on hover) as elegant overlaid text at the bottom
- Add a lightbox-style zoom on click using framer-motion `layoutId` for a smooth expand animation

## 7. Testimonials Section Polish
**Current issue**: Too much empty space below the carousel. The section feels bare and hollow.

**Improvements**:
- Add decorative large quotation marks behind the review text
- Show 3 reviews at once on desktop (card-based layout) instead of a single carousel
- On mobile, keep the swipeable single-review carousel
- Add subtle avatars or initials circles next to names
- Reduce vertical padding to eliminate the empty space

## 8. Contact Section Elevation
**Current issue**: Very plain -- just icons and text with a map.

**Improvements**:
- Wrap the contact info in a styled card with a light background tint
- Add a subtle decorative element (botanical illustration or leaf pattern) behind the section
- Style the "Visit us" heading with a decorative underline accent
- Give each info row (address, phone, email, hours) more breathing room and slightly card-like styling

## 9. Footer Redesign
**Current issue**: Dark footer feels visually disconnected from the light, airy theme.

**Improvements**:
- Change to a light footer with a subtle sage/secondary background instead of dark foreground
- Use the primary color for headings and muted text for body -- matching the site's tone
- Add a decorative wave/blob SVG at the top of the footer as a transition from the main content
- Include a small botanical logo/icon accent

## 10. Section Dividers Refinement
**Current issue**: The blob SVGs are somewhat rough and monotonous.

**Improvements**:
- Create 2-3 different divider shapes and rotate between them for variety
- Use more subtle, thinner divider shapes
- Add a very faint secondary color layer behind for depth (dual-layer SVG)

## 11. Global Polish
- Add a subtle background texture/pattern (very faint grain or linen-like noise) to the body for warmth
- Improve the scroll progress bar -- make it thinner (2px) and use a gradient from primary to accent
- Refine the back-to-top button with a softer shadow and slightly smaller size

---

## Technical Details

### Files to modify:
- `src/data/siteData.json` -- set `specialOffer.visible: false`
- `src/pages/Index.tsx` -- remove `SpecialOfferBanner` import and usage
- `src/components/HeroSection.tsx` -- gradient overlay, scroll indicator, botanical accent
- `src/components/Navbar.tsx` -- hover pill effect, refined spacing, scrolled border
- `src/components/AboutSection.tsx` -- stats card treatment, decorative accents
- `src/components/FeaturedMenuSection.tsx` -- editorial card redesign, colored tags
- `src/components/GallerySection.tsx` -- editorial masonry sizing, always-visible captions, lightbox
- `src/components/TestimonialsSection.tsx` -- multi-card desktop layout, quotation marks, initials
- `src/components/ContactSection.tsx` -- card wrapping, decorative elements
- `src/components/Footer.tsx` -- light theme, wave divider top
- `src/components/SectionDividers.tsx` -- multiple divider variants
- `src/index.css` -- background texture, refined scroll progress bar

### No new dependencies needed
All improvements use existing libraries (framer-motion, lucide-react, Tailwind CSS).
