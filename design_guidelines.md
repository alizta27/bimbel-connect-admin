# KerjaAja Design Guidelines

## Design Approach: Retro-Modern Cheerful Aesthetic

This platform takes inspiration from vintage job boards and retro design with a modern, cheerful twist. Think 70s-inspired rounded corners, bold typography, and playful elements combined with contemporary UX patterns.

---

## Color System

**Primary Palette:**
- Light Yellow `#F0E491` - Main backgrounds, highlights, cheerful accents
- Light Greenish-Yellow `#BBC863` - Secondary backgrounds, hover states
- Deep Green `#31694E` - Primary CTAs, headers, important text
- Muted Green `#658C58` - Supporting elements, borders, icons

**Application:**
- Page backgrounds: Light Yellow with subtle texture/pattern overlay
- Cards/Job listings: White or cream backgrounds with colored borders
- CTAs and important buttons: Deep Green with Light Yellow text
- Navbar/Header: Deep Green or gradient between Deep Green and Muted Green
- Hover states: Light Greenish-Yellow transitions
- Success states: Muted Green
- Badges/Tags: Mix of all four colors for variety

---

## Typography

**Font Selection:**
- **Headers**: Bold, playful sans-serif (consider DM Sans Bold, Poppins Bold, or Montserrat ExtraBold)
- **Body**: Clean, readable sans-serif (Inter Regular, DM Sans Regular)
- **Accents**: Slightly rounded sans-serif for friendly feel

**Hierarchy:**
- H1: Bold, 48-56px desktop / 32-36px mobile - for hero sections
- H2: Bold, 36-40px desktop / 28px mobile - for section headers
- H3: Bold, 24-28px desktop / 20px mobile - for card titles
- Body: Regular, 16-18px - for content and descriptions
- Small: Regular, 14px - for metadata, timestamps, labels
- Button Text: Semibold, 16px - for clarity and impact

**Style Notes:**
- Use ALL CAPS sparingly for emphasis (badges, labels)
- Letter-spacing: slightly increased for headers (+0.5px to +1px)
- Line-height: 1.6 for body text, 1.2 for headers

---

## Layout System

**Spacing Primitives (using 8px base unit):**
- Base grid: 8px increments
- Common spacing: 8px, 16px, 24px, 32px, 48px, 64px
- Component padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Section margins: 48px (mobile), 64px (tablet), 96px (desktop)
- Card gaps: 16px (mobile), 24px (desktop)

**Container System:**
- Max-width: 1280px for main content
- Gutter padding: 16px (mobile), 32px (tablet), 48px (desktop)
- Grid columns: 1 (mobile), 2 (tablet), 3-4 (desktop)

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## Component Library

### Navigation
**Navbar:**
- Fixed top position with Deep Green background
- Logo with retro-style typography on left
- Navigation links in center (Desktop) / hamburger menu (Mobile)
- Token balance badge and user avatar on right
- Height: 64px with subtle shadow
- Rounded bottom corners (border-radius: 0 0 16px 16px)

**Sidebar (Dashboard):**
- Left-aligned, collapsible on mobile
- Light Yellow background with Deep Green icons
- Rounded corners on menu items
- Active state: Deep Green background with Light Yellow text
- Width: 240px (desktop), full-screen overlay (mobile)

### Job Cards
**JobCard Component:**
- White/cream background with 2px colored border (rotating palette colors)
- Rounded corners: 16px
- Padding: 24px
- Shadow: subtle on hover (0 4px 12px rgba(0,0,0,0.08))
- Layout: Title (H3), Company name, Location, Token cost badge, Brief description, Skills tags
- Footer: Posted timestamp + "Lihat Detail" button
- Hover: Slight lift animation (transform: translateY(-4px))

### Buttons
**Primary Button:**
- Background: Deep Green
- Text: Light Yellow, semibold
- Border-radius: 24px (pill-shaped for retro feel)
- Padding: 12px 32px
- Hover: Darken background, scale slightly (1.05)
- Active: Further darken, scale down (0.98)

**Secondary Button:**
- Background: Light Greenish-Yellow
- Text: Deep Green, semibold
- Same shape and interactions as primary

**Token Button:**
- Pill-shaped with token icon
- Background: gradient between yellows
- Border: 2px Deep Green
- Text: Deep Green showing token count
- Pulse animation on updates

### Forms
**Form Inputs (React Hook Form + Radix):**
- Border: 2px Muted Green
- Border-radius: 12px
- Padding: 12px 16px
- Focus state: Border Deep Green with subtle glow
- Error state: Red border with shake animation
- Labels: Bold, 14px, Deep Green, positioned above input
- Helper text: 12px, Muted Green

**Select/Dropdown:**
- Same styling as inputs
- Dropdown menu: White background with Light Yellow hover states
- Options with rounded corners

**Radio/Checkbox:**
- Custom styled with Radix
- Active state: Deep Green fill
- Border: 2px when inactive

### Cards & Containers
**Dashboard Cards:**
- White background with colored left border accent (4px)
- Border-radius: 12px
- Padding: 24px
- Shadow: 0 2px 8px rgba(0,0,0,0.04)

**Modal/Dialog:**
- Overlay: rgba(49, 105, 78, 0.4) - Deep Green tint
- Content: White with rounded corners (20px)
- Close button: Circular, top-right, Deep Green
- Max-width: 600px

### Badges & Tags
**Skill Tags:**
- Small pill badges
- Rotating colors from palette
- Border-radius: 16px
- Padding: 4px 12px
- Font-size: 12px, semibold

**Status Badges:**
- "Open", "Closed", "In Progress" states
- Colored backgrounds with white text
- Border-radius: 8px
- Bold text, uppercase

---

## Page-Specific Layouts

### Homepage
**Hero Section:**
- Full-width banner with Light Yellow to Light Greenish-Yellow gradient
- Large retro-style headline with playful typography
- Search bar prominent (large, centered, with filters)
- Decorative retro geometric shapes or pattern overlay
- Height: 50vh minimum

**Job Listings Grid:**
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Filters sidebar on left (desktop) or collapsible drawer (mobile)
- Pagination or infinite scroll
- Empty state with cheerful illustration

### Job Detail Page
**Layout:**
- Breadcrumb navigation at top
- Two-column layout: Main content (70%) + Sidebar (30%)
- Main: Job title, company, description, requirements, skills
- Sidebar: Token cost, apply button, company info, related jobs
- Sticky sidebar on scroll (desktop)

### Dashboard
**Employer Dashboard:**
- Stats cards at top (Total Jobs, Active Bids, etc.)
- Tabs: "Pekerjaan Saya", "Lamaran Masuk", "Buat Pekerjaan Baru"
- Table view for job listings with action buttons

**Freelancer Dashboard:**
- Token balance prominent at top
- Tabs: "Lamaran Saya", "Pekerjaan Tersimpan", "Riwayat"
- Card grid for applied jobs with status badges

### Auth Pages
**Login/Register:**
- Centered card (max-width 480px)
- Split design: Form on left, decorative pattern/illustration on right
- Social auth buttons with retro styling
- Toggle between Login/Register with tab-like interface

---

## Animations & Interactions

**Micro-animations:**
- Button hover: scale(1.05) + subtle shadow
- Card hover: translateY(-4px) + shadow increase
- Form focus: border color transition (200ms)
- Page transitions: fade-in (300ms ease)
- Loading states: gentle pulse or retro spinner

**Prohibited:**
- Excessive parallax or scroll-triggered animations
- Distracting background animations
- Complex hover effects that reduce readability

---

## Images

### Hero Image
- Large, cheerful illustration or photo of diverse Indonesian workers/freelancers
- Placement: Full-width background in hero section with color overlay
- Style: Warm, inviting, with people collaborating or working

### Job Listings
- Company logos: Small circular thumbnails (48x48px)
- Placeholder: Colorful initial badges if no logo

### Dashboard
- User avatars: Circular, 40px (navbar), 80px (profile)
- Empty state illustrations: Retro-style, cheerful, matching color palette

### General
- Decorative elements: Retro geometric shapes, abstract patterns in section backgrounds
- Icons: Rounded style from Heroicons or similar, colored with palette

---

## Accessibility

- Color contrast ratios meet WCAG AA standards (Deep Green text on Light Yellow backgrounds)
- Focus indicators: Visible 2px Deep Green outlines
- Form labels always present and associated
- Alt text for all images and icons
- Keyboard navigation fully supported
- Screen reader friendly with proper ARIA labels (in Indonesian)

---

## Language & Content

**UI Text:** All in Bahasa Indonesia
- Buttons: "Lamar Sekarang", "Lihat Detail", "Masuk", "Daftar"
- Labels: "Nama Pekerjaan", "Kategori", "Lokasi", "Budget"
- Messages: Error/success in Indonesian

**Tone:** Friendly, professional, encouraging - matching the cheerful aesthetic