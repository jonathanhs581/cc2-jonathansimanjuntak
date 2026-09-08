# Personal Portfolio

Portfolio website pribadi yang dibangun dengan React, TypeScript, Vite, dan Tailwind CSS v4.

**Live demo:** https://portofoliojonathan.vercel.app

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 8** — build tool
- **Tailwind CSS v4** — styling
- **Google Fonts** — Play (heading) + Open Sans (body)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Deskripsi |
|---|---|
| `npm run dev` | Jalankan dev server |
| `npm run build` | Build produksi |
| `npm run preview` | Preview build |
| `npm run lint` | Jalankan linter |

## Struktur Folder

```
src/
├── components/     # Komponen UI (Navbar, Hero, About, Skills, dll.)
├── context/        # React Context (active section)
├── data/           # Data statis (profile, skills, projects, dll.)
├── hooks/          # Custom hooks (useScrollSpy, useCountUp)
├── services/       # Integrasi API (Contentful)
├── types/          # TypeScript types
├── App.tsx
├── main.tsx
└── index.css       # Design tokens & global styles
```

## Deploy

Sudah live di Vercel: https://portofoliojonathan.vercel.app

Setiap push ke `main` akan otomatis ter-deploy ulang.

## License

MIT
