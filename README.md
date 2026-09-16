<div align="center">

# 🎓 1st Year MC Portal
### Mathematics & Computing | B.Tech 1st Year Engineering Academic Hub

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Telegram Bot](https://img.shields.io/badge/Telegram_Bot-@firstyearhelpbot-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/firstyearhelpbot)

<p align="center">
  A high-performance, neo-brutalist academic study portal engineered for first-year engineering students. Consolidates syllabus roadmaps, interactive reading split-panes, video lectures, PYQs, temporary formula vaults, and a 24/7 integrated Telegram support bot.
</p>

[Explore Core Modules](#-core--non-core-academics) • [Telegram Bot Walkthrough](#-telegram-bot-integration-firstyearhelpbot) • [Architecture](#-system-architecture) • [Getting Started](#-getting-started--local-development)

</div>

---

## 📖 Table of Contents

- [🌟 Overview & Mission](#-overview--mission)
- [✨ Key Features](#-key-features)
- [🗺️ Application Walkthrough & Routes](#️-application-walkthrough--routes)
- [🤖 Telegram Bot Integration (`@firstyearhelpbot`)](#-telegram-bot-integration-firstyearhelpbot)
- [🏛️ System Architecture & Database](#️-system-architecture--database)
- [📂 Project Directory Structure](#-project-directory-structure)
- [🚀 Getting Started & Local Development](#-getting-started--local-development)
- [🔐 Environment Variables](#-environment-variables)
- [🧪 Verification & Testing](#-verification--testing)
- [📦 Deployment](#-deployment)
- [🤝 Contributing & License](#-contributing--license)

---

## 🌟 Overview & Mission

First-year engineering curricula—particularly in rigorous disciplines like **Mathematics & Computing (MC)**—can be overwhelming. Course materials, video playlists, lab manuals, viva questions, and notices are often scattered across disparate drives, emails, and messaging groups.

**1st Year MC Portal** unifies the entire freshman academic experience into a single, high-contrast, distraction-free environment:
- **Zero Friction**: Direct access to subject units, formula sheets, and curated lecture videos without paywalls or login barriers for general reading.
- **Deep Study Workflows**: Integrated split-pane PDF & note viewers, distraction-free reading modals, and embedded video players with timestamped unit playlists.
- **Instant Student Support**: A 24/7 Telegram Bot (`@firstyearhelpbot`) backed by Supabase for instantaneous material search, ticket logging, and login troubleshooting.

---

## ✨ Key Features

### 📚 Curated Academic Roadmaps
- **Core Engineering Modules**: Mathematics-I (Calculus & Linear Algebra), Engineering Physics (Quantum & Optics), Basic Electrical Engineering, and Programming for Problem Solving (C / Data Structures).
- **Non-Core & Applied Subjects**: Engineering Chemistry, Mechanics & Graphics/CAD, Soft Skills & Technical Communication, and Environmental Studies.
- **Unit-by-Unit Breakdowns**: Each subject includes detailed syllabus outlines, recommended textbooks, downloadable lecture notes, and formula sheets.

### 🖥️ Focused Study UI
- **Split-Pane Viewer (`SplitPaneViewer.tsx`)**: Read reference documents and take markdown notes side-by-side with synchronized resizable panels.
- **Immersive Reading Modal (`ImmersiveReadingModal.tsx`)**: Clean, full-screen reading experience with reading progress indicators, dark mode controls, and quick navigation.
- **Timestamped Video Hub (`VideoPlayer.tsx`)**: Integrated video player designed for lecture playlists with bookmarking and speed controls.

### ⚡ Temp Vault & PYQ Repository (`/temp-pdfs`)
- Instant access to mid-semester and end-semester past examination questions (PYQs).
- High-yield formula cheat sheets, lab experiment rubrics, and viva question banks.

### 🛡️ Authentication & Admin Management
- **Supabase SSR Authentication**: Cookie-based persistent sessions supporting sign-up, sign-in, email verification, and password reset.
- **Admin Control Hub (`/admin`)**: Real-time management interface to review incoming student support tickets, upload lecture resources, and monitor portal activity.

### 💬 Seamless Help & Support Modal
- Embedded `ContactHelpModal.tsx` in the Navbar and Footer with instant links to the official Telegram Bot and direct support dispatch.

---

## 🗺️ Application Walkthrough & Routes

| Route | Purpose | Key Components |
| :--- | :--- | :--- |
| `/` | **Command Dashboard**: Notices, exam timetables, recent study history, quick links | `app/page.tsx`, `Navbar`, `Footer` |
| `/core` | **Core Subjects Hub**: Mathematics, Physics, Programming, Electrical | `app/core/page.tsx`, `modulesData.ts` |
| `/non-core` | **Applied Sciences Hub**: Chemistry, Mechanics, Soft Skills, Environment | `app/non-core/page.tsx`, `modulesData.ts` |
| `/module/[id]` | **Subject Deep-Dive**: Syllabus units, lecture notes, formula sheets, videos | `SplitPaneViewer`, `ImmersiveReadingModal` |
| `/temp-pdfs` | **Temp Vault**: Quick-access PDF documents, PYQs, and viva notes | `app/temp-pdfs/page.tsx` |
| `/lectures` | **Video Lecture Hub**: Curated video playlists with custom player | `VideoPlayer.tsx`, `app/lectures/page.tsx` |
| `/admin` | **Admin Dashboard**: Ticket moderation, database inspection, management | `app/admin/page.tsx` |
| `/login` & `/auth/*` | **Auth Portal**: User login, registration, password recovery | Supabase Auth SSR handlers |
| `/profile` & `/settings` | **Student Profile**: Academic preferences, session management | `app/profile/page.tsx`, `app/settings/page.tsx` |

---

## 🤖 Telegram Bot Integration (`@firstyearhelpbot`)

The portal includes an integrated Node.js Telegram Bot built on **Telegraf 4.x** connected directly to Supabase via Row Level Security (RLS) policies.

```
┌─────────────────┐       Telegram Updates       ┌────────────────────────┐
│  Telegram User  │ ◄──────────────────────────► │  Telegraf Bot Worker   │
│ (@firstyear...) │                              │    (test-bot.js)       │
└─────────────────┘                              └───────────┬────────────┘
                                                             │
                                        RLS-Governed Queries │ (Anon / Service)
                                                             ▼
                                                 ┌────────────────────────┐
                                                 │   Supabase Database    │
                                                 │ ┌────────────────────┐ │
                                                 │ │ bot_tickets        │ │
                                                 │ │ materials (FTS)    │ │
                                                 │ └────────────────────┘ │
                                                 └────────────────────────┘
```

### Bot Commands & Features

| Command | Description | Action / Flow |
| :--- | :--- | :--- |
| `/start` | Welcome screen & menu | Displays interactive inline keyboard buttons for Temp Vault, Search, Help, and Feedback. |
| `/signup` | Sign-in & verification help | Guides students facing portal login issues and logs a ticket directly to `bot_tickets`. |
| `/tempvault` | Instant document fetch | Queries the Supabase `materials` table for `temp_vault` items and returns direct file buttons. |
| `/search` | Full-text material search | Performs PostgreSQL full-text search (`to_tsvector`) and fuzzy ILIKE queries over titles. |
| `/submit` | Feedback & suggestions | Collects student requests or feature ideas and stores them in the database. |
| `/admin` | Administrator panel | Restricted by numeric Telegram ID (`ADMIN_TELEGRAM_ID`). Allows instant ticket review in chat. |

---

## 🏛️ System Architecture & Database

### Technology Stack
- **Frontend Framework**: Next.js (App Router, Server Components & Client Components)
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS with custom neo-brutalist shadows (`shadow-[4px_4px_0_0_#000]`), borders (`border-4 border-black`), and vibrant palettes
- **Icons**: Lucide React
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS)
- **Bot Engine**: Telegraf, Node.js runtime, Dotenv

### Database Schema (`supabase/migrations/01_telegram_bot_tickets.sql`)

1. **`bot_tickets` Table**:
   - `id`: Unique serial identifier
   - `user_id`: Telegram numeric user ID
   - `username`: Telegram handle or display name
   - `type`: Enum (`'signup_issue'`, `'material_issue'`, `'feedback'`)
   - `message`: Student report message body
   - `created_at`: Timestamp (UTC)
   - *RLS*: Public anonymous `INSERT` allowed; `SELECT` restricted to admins and ticket authors.

2. **`materials` Table**:
   - `id`: UUID primary key
   - `title`: Subject / document title
   - `description`: Overview or topic details
   - `category`: Category string (`'core'`, `'non_core'`, `'temp_vault'`, etc.)
   - `file_url` & `storage_path`: Storage endpoints
   - *Search Index*: GIN Full-Text Index on `to_tsvector('english', title)` for lightning-fast keyword searches.

---

## 📂 Project Directory Structure

```text
1st-Year-MC-Portal/
├── app/                                 # Next.js App Router
│   ├── admin/                          # Administrative dashboard
│   ├── auth/                           # Supabase auth handlers (confirm, login, signup)
│   ├── core/                           # Core Engineering modules hub
│   ├── lectures/                       # Curated lecture video hub
│   ├── login/                          # Student sign-in page
│   ├── module/[moduleId]/              # Individual subject module detail viewer
│   ├── non-core/                       # Applied sciences & humanities hub
│   ├── profile/                        # User profile page
│   ├── settings/                       # User settings & preferences
│   ├── temp-pdfs/                      # Temporary PDF & PYQ vault
│   ├── globals.css                     # Global design tokens and styles
│   ├── layout.tsx                      # Root application layout
│   └── page.tsx                        # Main landing dashboard
├── bot/                                 # Telegram Bot engine & validation
│   ├── config.js                       # Environment validation & loader (CommonJS)
│   ├── config.ts                       # TypeScript configuration module
│   └── test-validation.js              # Unit tests for bot configuration
├── components/                          # Reusable UI component library
│   ├── ContactHelpModal.tsx            # Support modal with Telegram bot integration
│   ├── Footer.tsx                      # Application footer with status & quick links
│   ├── ImmersiveReadingModal.tsx       # Distraction-free full-screen reader
│   ├── Navbar.tsx                      # Sticky neo-brutalist navigation header
│   ├── SplitPaneViewer.tsx             # Dual-pane PDF & Markdown reader
│   └── VideoPlayer.tsx                 # Enhanced video lecture playback component
├── lib/                                 # Shared application utilities & business logic
│   ├── contactConfig.ts                # Telegram bot handles & support email configs
│   ├── modulesData.ts                  # Curated syllabus, units, and learning resources
│   ├── supabase/                       # Supabase client instances & bot database service
│   │   ├── bot-service.ts              # Ticket submission & full-text material search
│   │   ├── client.ts                   # Browser Supabase client
│   │   ├── server.ts                   # Server-side Supabase client (cookies)
│   │   └── middleware.ts               # Session token refresh middleware
├── supabase/
│   └── migrations/
│       └── 01_telegram_bot_tickets.sql # DDL script with RLS & FTS indexes
├── .env.example                         # Environment configuration template
├── package.json                         # Project dependencies and npm scripts
├── test-bot.js                          # Root bot runner daemon
└── tsconfig.json                        # TypeScript configuration
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm**, **yarn**, or **pnpm**
- A **Supabase** project (free tier is fully compatible)
- (Optional) A **Telegram Bot Token** from [@BotFather](https://t.me/BotFather) for bot testing

### 1. Clone the Repository
```bash
git clone https://github.com/itsHardik2005/1st-Year-MC-Portal.git
cd 1st-Year-MC-Portal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
```
Fill in your Supabase credentials and Telegram bot token (see [Environment Variables](#-environment-variables) below).

### 4. Run Database Migrations
Execute the SQL migration located at `supabase/migrations/01_telegram_bot_tickets.sql` in your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql) to provision the `bot_tickets` and `materials` tables with their corresponding RLS policies and search indexes.

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. (Optional) Run the Telegram Bot Daemon
In a separate terminal, launch the bot:
```bash
node test-bot.js
```
The bot will initialize and begin listening for Telegram events via long-polling.

---

## 🔐 Environment Variables

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | **Yes** | Supabase Project REST URL | `https://xyzcompany.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Yes** | Supabase Anonymous / Public API Key | `eyJhbGciOiJIUzI1Ni...` |
| `TELEGRAM_BOT_TOKEN` | Optional* | Token obtained from @BotFather | `8631409156:AAHIXJjco...` |
| `SUPABASE_URL` | Optional* | Backend REST URL for the Telegram Bot | `https://xyzcompany.supabase.co` |
| `SUPABASE_ANON_KEY` | Optional* | Anon key used by the bot worker | `eyJhbGciOiJIUzI1Ni...` |
| `ADMIN_TELEGRAM_ID` | Optional* | Numeric Telegram User ID for `/admin` | `598129384` |
| `NEXT_PUBLIC_TELEGRAM_BOT_URL` | Optional | Direct link to Telegram Bot | `https://t.me/firstyearhelpbot` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Optional | Fallback support email address | `support@studyportal.edu` |

*\* Required only when running the Telegram bot service.*

---

## 🧪 Verification & Testing

### TypeScript Type-Checking
Verify that all components and route handlers conform to TypeScript rules:
```bash
npx tsc --noEmit
```

### Bot Environment Schema Validation
Test environment variable parsing and validation rules without starting the bot:
```bash
node bot/test-validation.js
```

### Next.js Production Build Test
Ensure the application bundles correctly for production:
```bash
npm run build
```

---

## 📦 Deployment

### Deploying the Web Portal (Vercel)
1. Push your code to your GitHub repository (`main` branch).
2. Import the project into [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_TELEGRAM_BOT_URL`
4. Click **Deploy**. Vercel will build and serve the application globally.

### Deploying the Telegram Bot Worker
The bot runs as a lightweight long-polling Node.js process. You can deploy it to:
- **Render** / **Railway** / **Fly.io** as a background worker process running `node test-bot.js`.
- An **AWS EC2**, **DigitalOcean Droplet**, or any VPS using `pm2`:
  ```bash
  pm2 start test-bot.js --name "mc-portal-bot"
  ```

---

## 🤝 Contributing & License

Contributions, bug reports, and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "feat: add some AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ for 1st Year Engineering & Mathematics & Computing Students</sub>
</div>
