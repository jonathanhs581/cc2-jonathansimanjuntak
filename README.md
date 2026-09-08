# CC2 — Jonathan Simanjuntak

Kumpulan tugas CC2. Satu repo, tiga bagian:

| Tugas | Folder | Live Demo |
|---|---|---|
| Personal Portfolio | [`portfolio/`](./portfolio) | https://portofoliojonathan.vercel.app |
| Company Profile (NusaDrill Energy) | [`companyprofile/`](./companyprofile) | https://cc2-jonathansimanjuntak.vercel.app |
| LeetCode | [`leetcode/`](./leetcode) | — (screenshot solusi) |

## 🔑 Demo Access — Company Profile (untuk review)

```
Email    : admin@nusadrill.co.id
Password : password123
```

Login di `https://cc2-jonathansimanjuntak.vercel.app/login` untuk mencoba fitur Create Blog (tersimpan ke Backendless, langsung tampil di Blog List).

## Tech Stack

- **React + Vite + TypeScript** (kedua web project)
- **Tailwind CSS**
- **Zustand** — state management
- **Axios** — network call ke third-party API
- **Backendless** — headless CMS (auth + blog data)

## Menjalankan Lokal

```bash
# Portfolio
cd portfolio
npm install
npm run dev

# Company Profile
cd companyprofile
npm install
npm run dev
```

## Deployment

Kedua web app di-deploy ke Vercel dari repo yang sama, masing-masing dengan **Root Directory** berbeda:

- Project `portfolio` → Root Directory: `portfolio`
- Project `companyprofile` → Root Directory: `companyprofile`
