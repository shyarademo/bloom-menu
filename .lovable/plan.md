
# Fix Text Contrast Over Background Images

## Problem
Text throughout the hero section and navbar is nearly invisible because dark-colored text is placed over busy, medium-toned restaurant photos. The current overlay (`from-background/80`) uses a light cream color, which doesn't create enough contrast against the images.

## Solution: Switch to Light Text on Dark Overlay

### 1. Hero Section (`src/components/HeroSection.tsx`)

**Overlay**: Change from light cream overlay to a dark overlay gradient:
- `from-black/70 via-black/40 to-black/10` instead of `from-background/80 via-background/50 to-background/20`

**Headline**: Change from `text-foreground` (dark green) to `text-white`

**Subtext**: Change from `text-muted-foreground` to `text-white/80`

**CTA Buttons**:
- Primary button stays as-is (green bg with light text -- already good)
- Secondary "View Menu" button: change from green outline on transparent to `border-white text-white hover:bg-white/20` so it pops against the dark overlay

**Scroll indicator**: Change from `text-muted-foreground` to `text-white/70`

### 2. Navbar (`src/components/Navbar.tsx`)

When not scrolled (transparent over hero):
- Change nav link text from `text-foreground/70` to `text-white/90` and hover to `text-white`
- Change logo text from `text-foreground` to `text-white`
- Active nav link: change from `text-primary bg-primary/10` to `text-white bg-white/15`
- The "Full Menu" button already has a solid green background so it's fine

When scrolled (has background): keep existing dark text colors since there's a solid light background behind it

### 3. Gallery Captions (already okay)
The gallery uses `text-primary-foreground` over a `from-foreground/50` gradient which provides adequate contrast -- no changes needed.

## Technical Details

### Files to modify:
- `src/components/HeroSection.tsx` -- overlay gradient, text colors, button variant
- `src/components/Navbar.tsx` -- conditional text color classes based on `scrolled` state
