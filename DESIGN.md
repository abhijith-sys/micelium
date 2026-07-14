---
name: Forest Ethereal
colors:
  surface: '#F5F0E6'
  surface-dim: '#f2d4c2'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ea'
  surface-container: '#ffeade'
  surface-container-high: '#ffe3d2'
  surface-container-highest: '#fbddca'
  on-surface: '#28180d'
  on-surface-variant: '#414944'
  inverse-surface: '#3f2c20'
  inverse-on-surface: '#ffede4'
  outline: '#717973'
  outline-variant: '#c0c9c2'
  surface-tint: '#3a6753'
  primary: '#023625'
  on-primary: '#ffffff'
  primary-container: '#1f4d3a'
  on-primary-container: '#8dbda4'
  inverse-primary: '#a1d1b8'
  secondary: '#3a6847'
  on-secondary: '#ffffff'
  secondary-container: '#bcefc5'
  on-secondary-container: '#406e4d'
  tertiary: '#4d2400'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e3600'
  on-tertiary-container: '#ff9a4a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bceed3'
  primary-fixed-dim: '#a1d1b8'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#214f3c'
  secondary-fixed: '#bcefc5'
  secondary-fixed-dim: '#a1d2aa'
  on-secondary-fixed: '#00210d'
  on-secondary-fixed-variant: '#225031'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#FDFBF7'
  on-background: '#28180d'
  surface-variant: '#fbddca'
  glass-fill: rgba(255, 255, 255, 0.4)
  border-subtle: rgba(31, 77, 58, 0.08)
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Lexend
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  title-md:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 24px
  gutter: 16px
  section-gap: 80px
---

## Brand & Style
This design system embodies the intersection of high-end technology and organic nature. It leverages **Apple-style minimalism**—characterized by vast whitespace and precise alignment—infused with a **"Forest Modern"** aesthetic inspired by Linear’s clarity and Stripe’s fluidity.

The brand personality is **Organic yet Disciplined**. It avoids the "messy" look of traditional organic brands, opting instead for a highly structured, interactive experience. The UI should feel like a premium gallery: quiet, sophisticated, and sustainable. Interactive elements should use subtle physics-based animations (springs) to mimic the gentle resilience of forest flora.

## Colors
The palette is rooted in a **Cream White (#FDFBF7)** foundation to ensure a warmer, more premium feel than pure white. 

- **Forest Green (#1F4D3A)** is the primary anchor, used for key branding and high-importance CTAs.
- **Moss Green (#4A7856)** serves as a secondary tone for supporting elements and iconography.
- **Soft Orange (#E67E22)** acts as a "fruiting body" accent, used sparingly for notifications or status indicators to provide a pop of warmth.
- **Earth Brown (#3D2B1F)** is utilized for text to maintain a softer, more organic contrast than pure black.

**Glassmorphism** is a core component: use semi-transparent white fills with a `20px` backdrop blur for navigation bars and floating cards to create depth without visual clutter.

## Typography
The typography strategy balances the geometric friendliness of **Lexend** for headlines with the industrial precision of **Inter** for body copy.

- **Headlines:** Use Lexend with tight letter-spacing to create a "modern editorial" look. For display sizes, use bold weights to anchor the page.
- **Body:** Inter is set with a generous line height (1.6x) to ensure readability and a sense of "airiness" consistent with the minimalist style.
- **Labels:** Use Inter in SemiBold with increased letter-spacing and uppercase styling for small metadata or overlines to create a structured, "Linear-like" hierarchy.

## Layout & Spacing
This system follows a **Mobile-First, Fluid Grid** approach. 

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile.
- **Margins:** Generous 24px side margins on mobile to provide breathing room for the content.
- **Vertical Rhythm:** A strict 8px baseline grid. Section spacing is intentionally large (80px+) to emphasize the premium, minimalist nature of the brand.
- **Safe Areas:** Interactive elements should be inset from the edges of the screen, floating within the Cream White container rather than spanning full-width, reinforcing the "object-oriented" Apple aesthetic.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Ambient Shadows** rather than heavy gradients.

1.  **Base Layer:** Cream White (#FDFBF7) background.
2.  **Surface Layer:** Light Beige (#F5F0E6) for secondary containers (e.g., sidebars or nested cards).
3.  **Elevated Layer:** White cards with a subtle "Forest Tinted" shadow. Shadows should be ultra-diffused: `0px 10px 30px rgba(31, 77, 58, 0.04)`.
4.  **Glass Layer:** Navigation and contextual overlays use `backdrop-filter: blur(20px)` with a 40% white opacity.

Use thin, 1px borders in `rgba(31, 77, 58, 0.08)` on all cards and containers to provide crisp definition against the soft background.

## Shapes
The shape language is **Softly Geometric**. 

Primary containers and cards use **rounded-2xl (1.5rem/24px)** to mimic the organic curves found in fungi and nature. Smaller elements like buttons and input fields follow this hierarchy to maintain a friendly, approachable tactile feel. Interactive states (hover/active) should subtly increase the scale (e.g., 1.02x) rather than significantly changing the shape.

## Components
- **Buttons:** Primary buttons use the Forest Green background with white text. They should have a "squishy" physical feel—heavy on horizontal padding with a 24px radius.
- **Cards:** Cards are the hero of this system. Use a white background, the 1px subtle green border, and the 24px corner radius. Include high internal padding (minimum 32px).
- **Input Fields:** Use the Light Beige (#F5F0E6) as the fill color with no border in the default state. Upon focus, transition to a Forest Green border and a white background.
- **Chips/Tags:** Use the Moss Green with low opacity (10%) as a background and the primary Forest Green for the text. 
- **Interactive Spores (Custom):** Small, Soft Orange circular indicators used for "live" data points or availability, with a gentle pulse animation.
- **Lists:** Use wide spacing between list items, separated by 1px "Hairline" dividers that don't reach the container edges.