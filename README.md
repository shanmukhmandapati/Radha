# Radha Rani Art Studio

A fully client-side art portfolio website for an Indian painting artist. Built with React + Vite, all content is managed through a built-in admin panel and stored in `localStorage` — no backend required.

---

## Features

**Public Website**
- Auto-rotating hero slideshow with navigation dots and arrows
- Filterable painting gallery with masonry grid layout
- Workshops listing with topics, pricing, and badges
- Upcoming and past art events
- Shop with available paintings for sale
- About section with artist bio, stats, and signature
- Contact form (saves enquiries to localStorage)
- Newsletter subscribe (saves emails to localStorage)
- WhatsApp floating button
- Responsive design, smooth scroll, frosted-glass navbar

**Admin Panel** (`/admin`)
- Password-protected login (default: `radharani2025`)
- Forgot / reset password flow
- Manage hero slideshow (upload, reorder, delete — up to 6 images)
- Manage gallery paintings (CRUD, category filter)
- Manage shop paintings (CRUD, availability toggle)
- Manage events (upcoming / past)
- Manage workshops (topics, pricing, badges)
- Manage enquiries (read, reply by email/WhatsApp, delete)
- View subscribers list
- Profile editor (artist name, bio, photo, contact info, stats)
- Stats overview with setup checklist

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Styling | Inline styles + Tailwind CSS v4 |
| Fonts | Google Fonts (Playfair Display, Cormorant Garamond, Jost, Dancing Script) |
| Data storage | Browser localStorage |
| Build tool | Vite |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd radha

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `/dist` folder. Deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

---

## Project Structure

```
src/
├── admin/
│   ├── AdminLogin.jsx          # Password login + reset flow
│   ├── AdminDashboard.jsx      # Dashboard shell
│   ├── AdminLayout.jsx         # Sidebar + top bar
│   └── sections/
│       ├── HeroImageManager.jsx
│       ├── GalleryManager.jsx
│       ├── ShopManager.jsx
│       ├── EventsManager.jsx
│       ├── WorkshopsManager.jsx
│       ├── EnquiriesManager.jsx
│       ├── ProfileManager.jsx
│       └── StatsOverview.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── HeroSlideshow.jsx
│   ├── About.jsx
│   ├── Gallery.jsx
│   ├── Workshops.jsx
│   ├── Events.jsx
│   ├── Shop.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── WhatsAppButton.jsx
│   └── Testimonials.jsx
├── lib/
│   ├── storage.js              # localStorage helpers + default data
│   ├── useProfile.js           # Profile data hook
│   └── supabase.js             # Supabase client (unused currently)
├── App.jsx                     # Main layout + wave dividers
├── main.jsx                    # Router setup
└── index.css                   # Global styles, fonts, animations
```

---

## Admin Access

| URL | Purpose |
|---|---|
| `/admin` | Admin login page |
| `/admin/dashboard` | Admin dashboard |

**Default password:** `radharani2025`

To change the password, use the "Forgot password?" link on the login page. The new password is saved in `localStorage`.

---

## localStorage Keys

| Key | Contents |
|---|---|
| `heroSlideshow` | Array of slideshow images (base64 + title) |
| `galleryPaintings` | Array of gallery painting objects |
| `shopPaintings` | Array of shop painting objects |
| `events` | Array of event objects |
| `workshops` | Array of workshop objects |
| `profile` | Artist profile object (name, bio, photo, contact) |
| `enquiries` | Array of contact form submissions |
| `subscribers` | Array of newsletter email subscriptions |
| `adminLoggedIn` | `"true"` when admin is logged in |
| `adminPassword` | Custom admin password (if changed) |

---

## Customisation

1. **Artist name & branding** — Edit via Admin → Profile
2. **Hero images** — Upload via Admin → Hero Image (up to 6 slides)
3. **Content** — All sections are manageable from the admin panel
4. **Default password** — Change the `DEFAULT_PASSWORD` constant in `src/admin/AdminLogin.jsx` before deploying

---

## License

Private project. All rights reserved.
