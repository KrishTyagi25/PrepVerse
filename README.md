<div align="center">

# PrepVerse

**An end-to-end interview preparation platform for developers.**

Practice DSA · AI Mock Interviews · Resume Builder · Recruiter Connect · Leaderboard

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion)

[Live Demo](#) · [Report Bug](https://github.com/KrishTyagi25/PrepVerse/issues) · [Request Feature](https://github.com/KrishTyagi25/PrepVerse/issues)

</div>

---

## About

PrepVerse is a full stack interview preparation platform that brings everything a job seeker needs into one place — from solving DSA problems and simulating AI-powered mock interviews, to building a polished resume and connecting with recruiters.

Built with a focus on real-world features, clean UI, and a smooth user experience.

---

## Features

- **DSA Practice** — Browse and solve coding problems with a built-in code editor, test case panel, and problem statement view
- **AI Mock Interviews** — Simulate live interview sessions with an AI interviewer, complete with a score report, feedback timeline, and radar chart analysis
- **Recruiter Connect** — Recruiters can search and book sessions with candidates; candidates get a waiting room and video call flow
- **Resume Builder** — Section-by-section resume editor with live preview and ATS tips
- **Roadmap Tracker** — Structured week-by-week preparation roadmap with a sidebar and progress tracking
- **Social Feed** — Community posts, people search, and a dedicated feed sidebar
- **Leaderboard** — Top three podium with ranked rows for competitive motivation
- **Dashboard** — Progress rings, streak calendar, activity feed, quick actions, and recommended content
- **Profile** — Solve heatmap, badge shelf, stats grid, project cards, and a fully editable profile header
- **Onboarding** — 3-step onboarding flow: choose track, set up profile, first solve
- **Messages** — Real-time style chat UI with conversation list and message bubbles
- **Notifications** — Notification feed with individual notification items
- **Settings** — Account, privacy, and notification preferences with a dedicated sidebar

---

## Tech Stack

**Frontend**
- [React 19](https://react.dev) — UI library
- [Vite 8](https://vitejs.dev) — Build tool and dev server
- [React Router DOM 7](https://reactrouter.com) — Client-side routing
- [Tailwind CSS 3](https://tailwindcss.com) — Utility-first styling
- [Framer Motion 12](https://www.framer.com/motion) — Animations and transitions

**Backend**
- Node.js + Express
- MongoDB
- JWT Authentication

---

## Project Structure

```
src/
├── components/
│   ├── auth/           # ProtectedRoute
│   ├── layout/         # Navbar, Footer
│   └── ui/             # Button, Modal, Toast, Tabs, Field, GlobalSearchBar, Logo
├── context/            # AuthContext
├── hooks/              # useCanvasBg, useCountUp, useCursor, useScrollReveal
├── pages/
│   ├── Landing/        # Hero, Stats, Roles, Practice, Interview, Community sections
│   ├── Auth/           # Login, Signup
│   ├── Onboarding/     # 3-step onboarding flow
│   ├── Dashboard/      # Progress rings, streak calendar, activity feed
│   ├── Practice/       # Problem table, filter bar, code editor, test cases
│   ├── Interview/      # AI session, recruiter session, score report
│   ├── Resume/         # Editor, preview, ATS tips, section blocks
│   ├── Roadmap/        # Week cards, sidebar, header
│   ├── Profile/        # Heatmap, badges, stats, projects
│   ├── Feed/           # Posts, create post, people search, sidebar
│   ├── Leaderboard/    # Podium, rank rows
│   ├── Messages/       # Chat window, conversation list
│   ├── Recruiter/      # Candidate search, booking modal
│   ├── Notifications/  # Notification feed
│   ├── Settings/       # Account, privacy, notifications
│   └── NotFound/       # 404 page
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/KrishTyagi25/PrepVerse.git

# Navigate into the project
cd PrepVerse

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for production

```bash
npm run build
```

---

## Screenshots

> _Add screenshots or a GIF of the app here_

---

## Roadmap

- [x] Full frontend — all pages and components
- [x] Auth flow (Login, Signup, Protected Routes)
- [x] Backend API (Node.js + Express + MongoDB)
- [ ] Live deployment
- [ ] Real-time messaging with WebSockets
- [ ] AI interview integration

---

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Author

**Krish Tyagi**

[![GitHub](https://img.shields.io/badge/GitHub-KrishTyagi25-181717?style=flat&logo=github)](https://github.com/KrishTyagi25)

---

<div align="center">
  <sub>Built with dedication for developers who take their prep seriously.</sub>
</div>
