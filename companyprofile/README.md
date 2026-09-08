# NusaDrill Energy — Company Profile

Company profile website untuk PT NusaDrill Energi Nusantara (fiktif), perusahaan jasa drilling & energy solutions. Dibangun sebagai tugas CC2.

🔗 **Live demo:** https://cc2-jonathansimanjuntak.vercel.app

## 🔑 Demo Access (Admin)

Fitur Create Blog & Logout memerlukan login:

```
Email    : admin@nusadrill.co.id
Password : password123
```

Login di halaman `/login`, setelah itu artikel bisa dibuat di `/create-post` dan langsung muncul di `/blog`.

## Tech Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** — styling & UI slicing
- **Zustand** — state management (`useAuth`, `usePosts`, `useTeam`)
- **Axios** — HTTP client untuk third-party API (randomuser.me)
- **Backendless** — headless CMS: user authentication (Users) + blog data (Data table `Posts`)

## Fitur

- 7 halaman: Home, About Us, Services, Teams, Blog List, Create Blog, Login
- Autentikasi via Backendless — `/create-post` dilindungi, redirect ke `/login` jika belum masuk
- Blog tersimpan di Backendless Data Service, langsung tampil di Blog List
- Teams di-fetch live dari randomuser.me API
- Responsive (mobile-first), lazy-loaded routes, responsive images (`srcset`)
- PageSpeed Insights: **Performance 100 (Desktop) / 90 (Mobile)**, SEO 100, Best Practices 100

## Menjalankan Lokal

```bash
npm install
cp .env.example .env
# isi VITE_BACKENDLESS_APP_ID & VITE_BACKENDLESS_JS_KEY dari console Backendless
npm run dev
```

Tanpa `.env`, aplikasi tetap berjalan dalam mode fallback (localStorage) untuk keperluan development.
