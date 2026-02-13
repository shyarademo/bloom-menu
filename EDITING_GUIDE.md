# 🌿 Editing Guide — Verdana Table Website

All content is controlled by `src/data/siteData.json`. Edit that file to change text, images, colors, sections, and layout. No code edits needed.

---

## Color Format

All colors use **HSL without the `hsl()` wrapper**:
```
"145 35% 42%"    ← hue saturation% lightness%
```

---

## Fields Reference

### `branding` (required)
| Field | Type | Required | Example |
|-------|------|----------|---------|
| `name` | string | ✅ | `"Verdana Table"` |
| `tagline` | string | ✅ | `"Where nature meets flavor"` |
| `logo` | string | ✅ | `"🌿"` or image URL |
| `palette` | object | ✅ | See Palette section below |

#### `palette` (all required, HSL strings)
`primary`, `primaryForeground`, `accent`, `accentForeground`, `secondary`, `secondaryForeground`, `background`, `foreground`, `card`, `cardForeground`, `muted`, `mutedForeground`, `border`, `input`, `ring`, `destructive`, `destructiveForeground`, `popover`, `popoverForeground`

---

### `navigation` (required, array)
| Field | Type | Required | Example |
|-------|------|----------|---------|
| `label` | string | ✅ | `"About"` |
| `href` | string | ✅ | `"#about"` — must match section ID |

---

### `seo` (required)
| Field | Type | Required | Example |
|-------|------|----------|---------|
| `title` | string | ✅ | `"Verdana Table — Where Nature Meets Flavor"` |
| `description` | string | ✅ | Max 160 chars recommended |
| `keywords` | string | ❌ | Comma-separated |
| `ogImage` | string (URL) | ❌ | `"https://..."` |

---

### `hero` (required)
| Field | Type | Required | Example |
|-------|------|----------|---------|
| `images` | string[] (URLs) | ✅ | At least 1. Multiple = slideshow |
| `headline` | string | ✅ | `"A garden on your plate"` |
| `subtext` | string | ✅ | Supporting description |
| `ctaButtons` | array | ✅ | At least 1 button |

#### `ctaButtons[]`
| Field | Type | Required | Values |
|-------|------|----------|--------|
| `label` | string | ✅ | `"Reserve a Table"` |
| `href` | string | ✅ | `"#contact"` or `"/menu"` |
| `variant` | string | ✅ | `"primary"` or `"secondary"` |

---

### `about` (required)
| Field | Type | Required |
|-------|------|----------|
| `visible` | boolean | ✅ |
| `headline` | string | ✅ |
| `body` | string | ✅ |
| `image` | string (URL) | ✅ |
| `stats` | array | ❌ |

#### `stats[]`
| Field | Type | Required |
|-------|------|----------|
| `value` | number | ✅ |
| `suffix` | string | ✅ (`"+", "%"`) |
| `label` | string | ✅ |

---

### `featuredMenu` (required)
| Field | Type | Required |
|-------|------|----------|
| `visible` | boolean | ✅ |
| `headline` | string | ✅ |
| `subtext` | string | ❌ |
| `items` | array | ✅ (min 1) |

#### Menu Item (shared by `featuredMenu` and `menu`)
| Field | Type | Required |
|-------|------|----------|
| `name` | string | ✅ |
| `description` | string | ✅ |
| `price` | string | ✅ (`"$18"`) |
| `image` | string (URL) | ✅ |
| `tags` | string[] | ❌ (`["vegetarian", "gluten-free"]`) |

---

### `menu` (required) — Full menu page
| Field | Type | Required |
|-------|------|----------|
| `seo` | object | ❌ (same shape as top-level `seo`) |
| `gridColumns` | number (1–4) | ❌ (default: 3) |
| `filterTags` | string[] | ❌ |
| `categories` | array | ✅ (min 1) |

#### `categories[]`
| Field | Type | Required |
|-------|------|----------|
| `name` | string | ✅ |
| `description` | string | ❌ |
| `items` | array | ✅ (min 1, same as Menu Item above) |

---

### `gallery` (required)
| Field | Type | Required |
|-------|------|----------|
| `visible` | boolean | ✅ |
| `headline` | string | ✅ |
| `images` | array | ✅ (min 1) |

#### `images[]`
| Field | Type | Required |
|-------|------|----------|
| `src` | string (URL) | ✅ |
| `caption` | string | ❌ |

---

### `testimonials` (required)
| Field | Type | Required |
|-------|------|----------|
| `visible` | boolean | ✅ |
| `headline` | string | ✅ |
| `reviews` | array | ✅ (min 1) |

#### `reviews[]`
| Field | Type | Required |
|-------|------|----------|
| `name` | string | ✅ |
| `text` | string | ✅ |
| `rating` | number (1–5) | ✅ |

---

### `contact` (required)
| Field | Type | Required |
|-------|------|----------|
| `address` | string | ✅ |
| `phone` | string | ✅ |
| `whatsapp` | string | ❌ (digits only, e.g. `"+442079460958"`) |
| `email` | string (email) | ✅ |
| `mapUrl` | string | ❌ (Google Maps embed URL) |
| `hours` | array | ✅ (min 1) |

#### `hours[]`
| Field | Type | Required |
|-------|------|----------|
| `days` | string | ✅ (`"Monday — Friday"`) |
| `time` | string | ✅ (`"12:00 PM — 10:00 PM"`) |

---

### `social` (optional)
| Field | Type | Required |
|-------|------|----------|
| `instagram` | string (URL) | ❌ |
| `facebook` | string (URL) | ❌ |
| `twitter` | string (URL) | ❌ |
| `tiktok` | string (URL) | ❌ |

---

### `specialOffer` (optional)
| Field | Type | Required |
|-------|------|----------|
| `visible` | boolean | ✅ |
| `text` | string | ✅ |
| `link` | string | ❌ |
| `linkText` | string | ❌ |

---

### `layout` (required)
| Field | Type | Required |
|-------|------|----------|
| `sectionOrder` | string[] | ✅ |

**Valid section keys**: `hero`, `about`, `featuredMenu`, `gallery`, `testimonials`, `contact`

Sections are rendered in the order listed. Any section with `visible: false` is hidden regardless of order.

---

## Tips

- **Hide a section**: Set its `visible` field to `false`
- **Reorder sections**: Change the `layout.sectionOrder` array
- **Change colors**: Update `branding.palette` — all HSL strings, no `hsl()` wrapper
- **Add menu items**: Add objects to the relevant `categories[].items` array
- **Images**: Use full URLs (Unsplash, Cloudinary, etc.). Recommended minimum 500×500px for menu items, 1920×1080 for hero
