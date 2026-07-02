# Suman Kumar's Developer Portfolio

A modern, interactive developer portfolio built with **Vue 3 + TypeScript + Vite**. Features an API/developer-themed design with a dark color scheme, terminal animations, scroll-reveal effects, and an interactive animated mascot.

**Live Site:** [sumankumarmca.netlify.app](https://sumankumarsde.netlify.app)  
**Repository:** [github.com/SumanMCAMR/portfolio](https://github.com/SumanMCAMR/portfolio)

---

## 🎯 About

**Suman Kumar** — Full-Stack Software Developer based in Kolkata, India with **3+ years** of professional experience building web applications with Laravel, Vue.js, React, and modern JavaScript frameworks.

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # Root HTML with SEO meta tags & Google Fonts preconnect
├── package.json                # Dependencies: Vue 3, Vite, TypeScript, vue-tsc
├── vite.config.ts              # Vite config with Vue plugin
├── tsconfig.json               # TypeScript project references
├── tsconfig.app.json           # App-level TS config
├── tsconfig.node.json          # Node-level TS config
├── AGENTS.md                   # Project guidelines for AI agents
├── .gitignore                  # Node, Vite, TypeScript, macOS, IDE rules
├── public/                     # Static public assets (favicon, etc.)
├── src/
│   ├── main.ts                 # App entry — creates Vue app, imports global CSS
│   ├── style.css               # Global stylesheet with CSS custom properties,
│   │                           # layout, typography, animations, responsive breakpoints
│   ├── App.vue                 # Root component — composes all sections,
│   │                           # implements IntersectionObserver scroll-reveal
│   ├── assets/                 # Imported source assets
│   └── components/
│       ├── NavBar.vue          # Fixed navigation with mobile hamburger toggle
│       ├── HeroSection.vue     # Hero grid + terminal typing animation
│       ├── AboutSection.vue    # Profile text + stat cards (3+ yrs, 30%, 25%)
│       ├── SkillsSection.vue   # Data-driven skill groups in tagged cards
│       ├── ExperienceSection.vue  # Timeline for work history & education
│       ├── ProjectsSection.vue # Project cards with links (professional + personal)
│       ├── CertificationsSection.vue  # LinkedIn Learning certificates
│       ├── ContactSection.vue  # CTA box with email, LinkedIn, GitHub
│       └── FooterSection.vue   # Footer with dynamic page load time metric
```

---

## 🎨 Component Architecture

### Key Patterns

- **Scroll Reveal:** Global `IntersectionObserver` (threshold 0.15) adds `.visible` class to elements with `.reveal`, triggering opacity/transform transitions
- **Terminal Animation:** `HeroSection.vue` types out a curl command character-by-character on mount, then reveals a JSON response
- **Mobile Navigation:** `NavBar.vue` uses a boolean ref to toggle hamburger menu; links auto-close on click
- **Dynamic Project Links:** `ProjectsSection.vue` renders project cards as `<a>` or `<div>` depending on link availability
- **Interactive Portfolio Pet:** Custom animated mascot (`PortfolioPet.vue`) uses a state machine (`usePetStateMachine.ts`) to manage sprite animations and interactive behaviors
- **Performance Monitoring:** `FooterSection.vue` displays dynamic page load time using the browser's `Performance API`

### Design System

**CSS Custom Properties** (defined in `src/style.css`):

- **Colors:** `--bg` (#0B0E14), `--bg-alt` (#11151F), `--bg-raise` (#161B27), `--text` (#E8E6DE), `--text-dim` (#8B93A7), `--accent` (#FF5A3C, orange-red), `--accent-2` (#5EEAD4, teal), `--line` (#232838)
- **Typography:** `--mono` (JetBrains Mono), `--display` (Space Grotesk), `--body` (Inter)
- **Spacing:** `--radius` (10px)
- **Fonts:** Google Fonts preconnect in `index.html` + `@import` in `style.css`

### Responsive Breakpoints

- **820px:** Hero grid → single column, nav → mobile dropdown
- **700px:** Project grid and contact box → single column
- **600px:** Skill groups → single column

---

## 💼 Professional Experience

| Role | Company | Period |
|------|---------|--------|
| **Software Developer** | Webskitters Technology Solutions | Aug 2024 – Present |
| **Software Developer** | WebReinvent Technologies | Jun 2023 – Aug 2024 |
| **MCA** | Manav Rachna International | 2021–2023 (CGPA 7.8) |
| **BCA** | B.S.S College, Supaul | 2016–2019 (78%) |

---

## 🚀 Projects

### Professional

| Project | Company | Description |
|---------|---------|-------------|
| **Bullfincher** | Webskitters Technology | Visual-first BI & research platform. Owned News, Ownership, Earnings Transcript, Org Chart, SEC Filings (10-K/10-Q) pages. Built AI-powered earning calculator. Tech: Vue.js, Nuxt, REST APIs |
| **MyWhiteCoats** | Webskitters Technology | HIPAA-compliant healthcare platform. Built ERX generation via provider API, doctor/patient onboarding with NPI & state license verification, Zoom integration. Tech: Vue.js, Laravel, PostgreSQL |
| **Merchan.io** | WebReinvent Technologies | Multi-store Shopify PIM and bulk editor. Integrated ag-grid for Excel-like grid view to bulk edit products, variants, collections, tags with auto-save. Tech: React, Next.js |

### Personal

| Project | Description | Repository |
|---------|-------------|------------|
| **AR Restaurant Menu** | QR-based AR menu using browser WebXR. No app install required. | [GitHub](https://github.com/SumanMCAMR/AR_web_app_restaurant) |
| **Ride-Sharing App** | Full-stack ride-hailing with real-time tracking, Twilio OTP, Pusher WebSockets. | [GitHub](https://github.com/SumanMCAMR/Ride-Sharing-App-Vue3-Laravel) |

---

## 🛠️ Skills

**Languages:** PHP, JavaScript (ES6+), TypeScript, HTML5, CSS3, jQuery

**Frameworks & Libraries:** Laravel, Vue.js, Nuxt 3, React, Next.js

**Backend:** REST APIs, MVC, Sanctum, Passport, Queues & Jobs, Artisan CLI, Eloquent ORM

**Frontend:** SPA Development, Axios, Pinia, Vuex

**Database:** MySQL, PostgreSQL

**Tools & DevOps:** Git, GitHub, Postman, Composer, Microservices, Caching

**AI Tools:** Antigravity, Claude Code, Codex

---

## 📜 Certifications

- **Project Management Foundations** — LinkedIn Learning

---

## 📧 Contact

- **Email:** sumankumarmca022@gmail.com
- **Phone:** 8709583934
- **LinkedIn:** [linkedin.com/in/sumanmca](https://linkedin.com/in/sumanmca)
- **GitHub:** [github.com/SumanMCAMR](https://github.com/SumanMCAMR)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Development

```sh
# Install dependencies
npm install

# Run the local development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```sh
# Create a production build (runs vue-tsc type check + Vite build)
npm run build

# Preview the production build locally
npm run preview
```

---

## 📝 Development Guidelines

### Coding Style

- Use Vue single-file components with `<script setup lang="ts">`
- Two-space indentation, single quotes in TypeScript imports
- PascalCase component names (e.g., `HeroSection.vue`, `NavBar.vue`)
- Section components end in `Section.vue`
- Component-scoped styles use `<style scoped>`; shared styles in `src/style.css`
- Data arrays (projects, skills, experience) live in the component that renders them

### Commit Messages

Use short, imperative commits:
- ✅ `Add contact section animation`
- ✅ `Update project cards`
- ✅ `Fix mobile nav dropdown`

### Pull Requests

Include a concise summary and screenshots/videos for visual changes.

---

## ⚙️ Stack & Technologies

- **Frontend Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS with CSS Custom Properties
- **Typography:** Google Fonts (JetBrains Mono, Space Grotesk, Inter)
- **Hosting:** Netlify (or similar)

---

## 🔒 Security

- No secrets or private credentials committed
- External links use `target="_blank"` with `rel="noopener noreferrer"`
- Environment files excluded from version control

---

## 📄 License

This portfolio is personal work. Feel free to use as inspiration for your own portfolio, but please do not copy content or branding.

---

**Built with ❤️ by Suman Kumar**
