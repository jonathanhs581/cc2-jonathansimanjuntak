# Panduan Lengkap Setup Backendless — NusaDrill Energy

Panduan ini menjelaskan cara menyiapkan Backendless untuk project company profile ini, mulai dari nol sampai blog & login admin berfungsi penuh.

---

## Daftar Isi

1. [Cara Kerja Project Ini dengan Backendless](#1-cara-kerja-project-ini-dengan-backendless)
2. [Prasyarat](#2-prasyarat)
3. [Membuat Akun & Aplikasi di Backendless](#3-membuat-akun--aplikasi-di-backendless)
4. [Mengambil API Key & Setup `.env`](#4-mengambil-api-key--setup-env)
5. [Membuat Tabel `Posts`](#5-membuat-tabel-posts)
6. [Membuat User Admin](#6-membuat-user-admin)
7. [Setting Permissions](#7-setting-permissions)
8. [Fix Bug `objectId` & `postDate` (Sudah Diterapkan)](#8-fix-bug-objectid--postdate-sudah-diterapkan)
9. [Menjalankan & Testing End-to-End](#9-menjalankan--testing-end-to-end)
10. [Opsional: Import Seed Posts ke Backendless](#10-opsional-import-seed-posts-ke-backendless)
11. [Troubleshooting](#11-troubleshooting)
12. [FAQ & Catatan Penting](#12-faq--catatan-penting)

---

## 1. Cara Kerja Project Ini dengan Backendless

Project ini pakai Backendless untuk **2 fitur saja**:

| Fitur | File | Service Backendless | Fungsi |
|---|---|---|---|
| Login admin | `src/lib/auth.tsx` | **Users** (`UserService`) | `login`, `logout`, `getCurrentUser` |
| Blog posts | `src/lib/posts.tsx` | **Data** (tabel `Posts`) | `find` (baca), `save` (tulis) |

Semua komunikasi ke Backendless lewat satu gerbang: `src/lib/backendless.ts` yang membaca 2 variabel dari `.env`:

```
.env ──► src/lib/backendless.ts ──► SDK backendless (initApp)
                                      │
                                      ├──► src/lib/auth.tsx  (login/logout)
                                      └──► src/lib/posts.tsx (tabel Posts)
```

**Penting — Mode Fallback:**

- Kalau `.env` **kosong / belum diisi** → `getBackendless()` mengembalikan `null`, dan app jalan pakai **localStorage**:
  - Login menerima **email & password apa pun** (fake login)
  - Posts tersimpan di localStorage browser
- Kalau `.env` **terisi dengan benar** → app otomatis pakai Backendless beneran.

Jadi selama ini app lo jalan dalam mode fallback. Begitu `.env` keisi, semua berpindah ke Backendless secara otomatis — tanpa perlu ubah kode lain (dua penyesuaian kecil sudah diterapkan langsung di kode, lihat [bagian 8](#8-fix-bug-objectid--postdate-sudah-diterapkan)).

---

## 2. Prasyarat

- [ ] Node.js terinstall (cek: `node -v`)
- [ ] Git terinstall
- [ ] Email untuk daftar akun Backendless
- [ ] Repo sudah di-clone dan `npm install` sudah dijalankan (atau jalankan nanti di [bagian 9](#9-menjalankan--testing-end-to-end))

---

## 3. Membuat Akun & Aplikasi di Backendless

1. Buka **https://backendless.com** → klik **Get Started / Sign Up** (bisa daftar pakai Google/GitHub biar cepat).
2. Plan **gratis (Springboard)** sudah cukup untuk project ini — tidak perlu kartu kredit.
3. Setelah login ke Console, buat **app baru**:
   - Klik nama app (default-nya biasanya semacam "Team-app") → **Create New App**
   - Nama: bebas, disarankan `nusadrill` (nama app tidak harus sama dengan nama tabel/kolom)
4. Pilih **region** server (misal `US` atau yang terdekat) — ini nggak bisa diganti nanti, tapi nggak mempengaruhi fungsi.

> 💡 Nama menu Console bisa sedikit berbeda antar versi. Yang penting: lo berakhir di sebuah **app** yang punya **App ID** dan **API keys**.

---

## 4. Mengambil API Key & Setup `.env`

### Ambil kredensial

1. Di Console Backendless, buka **App Settings** (klik nama app / ikon gear, atau lewat menu **Manage → App Settings**).
2. Cari bagian **API Keys** (atau "Keys").
3. Copy dua nilai ini:

| Nilai | Di file `.env` |
|---|---|
| **App ID** | `VITE_BACKENDLESS_APP_ID` |
| **JavaScript API Key** | `VITE_BACKENDLESS_JS_KEY` |

> ⚠️ **Hati-hati:** Backendless menyediakan banyak jenis key (JS, REST, Android, .NET, dll). Yang dipakai project ini adalah **JS API Key** — karena app ini web app pakai JS SDK. Salah key = error `Invalid application id or api key`.

### Isi `.env` di project

Buat file `.env` di root project (copy dari `.env.example`):

```bash
# dari root project
cp .env.example .env
```

Lalu isi:

```env
VITE_BACKENDLESS_APP_ID=XXXX-XXXX-XXXX-XXXX-XXXX
VITE_BACKENDLESS_JS_KEY=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

> ⚠️ **Setiap kali mengubah `.env`, dev server harus di-restart** (`Ctrl+C` lalu `npm run dev` lagi). Vite hanya membaca env saat startup.
>
> ✅ File `.env` sudah masuk `.gitignore`, jadi aman — tidak akan ikut ke-commit ke GitHub.

---

## 5. Membuat Tabel `Posts`

Tabel ini menyimpan artikel blog. **Isinya boleh kosong** (kode otomatis menampilkan 6 artikel seed lokal + artikel dari Backendless), tapi **strukturnya** harus benar.

### Langkah

1. Di Console: menu **Data** (Data Manager) → **Create New Table** / ikon **(+)** → pilih **Custom table**.
2. Nama tabel: **`Posts`** — harus persis (huruf besar P, case-sensitive), karena kode memanggil `Backendless.Data.of('Posts')`.
3. Tambahkan kolom (Add Column) satu per satu:

| Kolom | Tipe | Wajib diisi? | Default di kode kalau kosong | Keterangan |
|---|---|---|---|---|
| `title` | **STRING** | ✅ | — | Judul artikel |
| `excerpt` | **STRING** | ❌ | 140 karakter pertama dari `content` | Ringkasan di kartu blog |
| `content` | **STRING** | ✅ | — | Isi lengkap artikel |
| `author` | **STRING** | ❌ | `NusaDrill Newsroom` | Nama penulis |
| `postDate` | **STRING** | ❌ | diambil dari kolom sistem `created` | Format `YYYY-MM-DD`. **Nama `date` DILARANG di Backendless** (reserved word) — wajib pakai `postDate`; kode otomatis konversi. Tipe tetap **STRING**, bukan DATE |
| `category` | **STRING** | ❌ | `Engineering` | Pilihan valid: `Drilling`, `Engineering`, `HSE`, `Energy Transition` |
| `image` | **STRING** | ❌ | `/images/blog-2.jpg` | Path gambar di folder `public/images/` |

### Catatan penting

- ❌ **JANGAN buat** kolom `id`, `objectId`, `created`, `updated`, `ownerId` — itu **kolom sistem** yang sudah otomatis ada di setiap tabel Backendless.
- 🔢 `postDate` pakai tipe **STRING**, bukan DATE. Kode mengirim `new Date().toISOString().slice(0, 10)` → `"2026-09-08"`. Kalau dipaksa jadi tipe DATE, nilai yang dibalikin Backendless berubah bentuk dan tampilan tanggal bisa rusak.
- 🚫 Nama kolom tertentu **dilarang** Backendless (reserved word), termasuk `date`. Kalau ketemu error *"This name is forbidden"*, ganti nama kolomnya — di project ini pakai `postDate` dan kodenya sudah menangani konversinya (lihat [bagian 8](#8-fix-bug-objectid--postdate-sudah-diterapkan)).
- ⚙️ **Dynamic Schema**: Backendless punya fitur "Dynamic Schema Definition" (di Manage → App Settings). Kalau aktif, kolom bisa otomatis terbuat saat penyimpanan pertama. Tapi **tetap disarankan bikin kolom manual** seperti tabel di atas supaya nama & tipe kolom ter-kunci dan tidak ada kejutan.

---

## 6. Membuat User Admin

User ini yang dipakai untuk login di halaman `/login` project (route `/create-post` dilindungi — wajib login dulu).

1. Di Console: menu **Users** (tabel `Users` bawaan Backendless).
2. Klik **Add New User** (atau tombol **+**).
3. Isi:

| Field | Nilai contoh |
|---|---|
| `email` | `jonathansimanjuntak98@gmail.com` |
| `password` | password kuat pilihan lo |
| `name` | `Jonathan Simanjuntak` (opsional — dipakai sebagai nama author artikel) |

4. Save.

### Catatan

- Kalau setelah save user terlihat **belum aktif / pending confirmation**:
  - Cek **Users → Settings** (atau Manage → App Settings → User Settings) → matikan dulu **Email Confirmation** untuk development, atau konfirmasi via link email.
  - Login akan ditolak selama user belum terverifikasi/enabled.
- Kolom `name` di tabel `Users` sudah ada secara default di Backendless. `auth.tsx` otomatis fallback ke email kalau `name` kosong — jadi kolom ini opsional tapi bagus untuk diisi.
- Bisa bikin lebih dari satu user (misal editor lain) — semua user yang bisa login bisa membuat artikel.

---

## 7. Setting Permissions

Tujuan akhirnya:

- Siapa pun (publik) bisa **membaca** posts → blog tampil tanpa login
- Hanya yang login (Authenticated User) bisa **membuat** post
- Nobody publik yang bisa update/delete

### Langkah

1. **Data → Posts → tab Permissions** (atau ikon shield/lock di tabel).
2. Atur **Table Permissions**:

| Operasi | Role | Nilai |
|---|---|---|
| **Find** (baca) | Everyone / NotAuthenticatedUser | ✅ Allow |
| **Find** (baca) | AuthenticatedUser | ✅ Allow |
| **Create / Save** | AuthenticatedUser | ✅ Allow |
| **Create / Save** | Everyone / NotAuthenticatedUser | ❌ Deny |
| **Update** | AuthenticatedUser | ✅ Allow (opsional, untuk edit ke depannya) |
| **Delete** | AuthenticatedUser | ✅ Allow (opsional) |
| **Update / Delete** | Everyone / NotAuthenticatedUser | ❌ Deny |

3. Kalau lo bikin kolom `title`/`content` sebagai required, pastikan permission **column-level** tidak memblokir operasi di atas.

> 💡 Tabel yang dibuat lewat Console kadang sudah terbuka (allow all untuk Everyone). Kalau app jalan normal, skip fine-tuning ini. Panduan di atas adalah setting yang **aman** untuk production.

> 🔒 Login (`UserService.login`) tidak butuh permission khusus — itu operasi sistem yang sudah dibuka default.

---

## 8. Fix Bug `objectId` & `postDate` (Sudah Diterapkan)

> ✅ **Status: kedua fix di bawah ini SUDAH diterapkan langsung ke `src/lib/posts.tsx`.** Tidak perlu edit manual — bagian ini dokumentasi saja, biar lo tahu apa yang berubah dan kenapa.

### Fix 1 — Mapping `objectId` → `id`

Backendless mengembalikan field **`objectId`** sebagai identitas unik — **bukan `id`**. Tanpa mapping, artikel dari Backendless punya `id === undefined`:

- React `key` jadi `undefined`
- Link halaman detail jadi `/blog/undefined` (halaman detail tidak ketemu)

**Solusinya** (sudah di kode): setiap artikel dari Backendless di-map `id: p.objectId || p.id` — baik hasil `find()` di fungsi `load()` maupun hasil `save()` di `createPost()`.

### Fix 2 — Kolom `date` → `postDate`

Nama kolom `date` adalah **reserved word yang dilarang** di Backendless (error: *"Invalid parameter 'date'. This name is forbidden"*). Jadi kolom di tabel `Posts` memakai nama **`postDate`**, dan kode melakukan konversi dua arah (sudah di kode):

- **Simpan** (`createPost`): field `date` dari form dikirim ke Backendless sebagai `postDate`
- **Baca** (`load`): `postDate` dipetakan balik ke `date`, dengan fallback ke kolom sistem `created` kalau `postDate` kosong

Frontend (type `Post`, form `CreatePost.tsx`, halaman Blog) tetap memakai `date` — tidak ada yang berubah di sisi UI.

> Tanpa kedua fix ini, artikel tetap **tersimpan** ke Backendless (data aman), tapi **link detail & tampilan list**-nya rusak.

---

## 9. Menjalankan & Testing End-to-End

### Setup awal (sekali saja)

```bash
npm install          # install dependencies
cp .env.example .env # lalu isi sesuai bagian 4
```

### Jalankan

```bash
npm run dev
```

Buka **http://localhost:5173**

### Checklist testing

| # | Tes | Hasil yang diharapkan |
|---|---|---|
| 1 | Buka `/` (home) | Halaman normal, tidak ada error merah di Console browser |
| 2 | Buka `/blog` | 6 artikel seed tampil. Kalau Backendless aktif & tabel berisi, artikel Backendless muncul paling atas |
| 3 | Buka `/create-post` tanpa login | Di-redirect ke `/login` |
| 4 | Login pakai email & password user dari [bagian 6](#6-membuat-user-admin) | Masuk, diarahkan ke `/create-post` |
| 5 | Isi form: Title (min. 8 karakter), Category, Content (min. 40 karakter), Excerpt (opsional) → Submit | Diarahkan ke `/blog`, artikel baru muncul paling atas |
| 6 | Buka Console Backendless → **Data → Posts** | Ada 1 record baru dengan kolom terisi |
| 7 | Klik artikel baru di `/blog` | Halaman detail terbuka dengan URL `/blog/<objectId>` — **bukan** `/blog/undefined` |
| 8 | Refresh halaman | Masih login (session persist), artikel masih ada |
| 9 | Logout → login lagi | Berfungsi normal |

Kalau semua ✅ — setup lo komplit. 🎉

---

## 10. Opsional: Import Seed Posts ke Backendless

Secara default, 6 artikel seed dari `src/data/posts.ts` **selalu** ditampilkan digabung dengan artikel Backendless. Kalau lo mau semua konten dikelola dari Backendless:

1. Di Console → **Data → Posts → Import** (atau tambah record manual).
2. Isi 6 artikel seed (copy teks dari `src/data/posts.ts`) ke kolom yang sesuai. Kolom `id` diabaikan (biarkan kosong), Backendless yang bikin `objectId`. Kolom `date` di file seed = kolom **`postDate`** di Backendless.
3. (Lanjutan opsional) Hapus atau kosongkan `seedPosts` di `src/lib/posts.tsx` baris `setPosts([...mapped, ...seedPosts])` → jadi `setPosts(mapped)` — supaya seed lokal tidak ikut tampil.

Ini tidak wajib — mode default (gabungan) sudah cukup untuk memulai.

---

## 11. Troubleshooting

| Gejala | Penyebab | Solusi |
|---|---|---|
| `Invalid application id or api key` saat load halaman | Salah key (pakai REST key dll), atau App ID salah | Pastikan pakai **JS API Key** + App ID yang benar; **restart dev server** |
| Perubahan `.env` tidak berefek | Vite hanya baca env saat startup | Restart `npm run dev` |
| Error **403 / Forbidden** saat load `/blog` | Permission `Find` untuk Everyone belum di-allow | Bagian [7](#7-setting-permissions) |
| Error **403 / Forbidden** saat submit artikel baru | Permission `Create/Save` untuk AuthenticatedUser belum di-allow | Bagian [7](#7-setting-permissions) |
| Login gagal terus padahal email/password bener | User belum verified/enabled, atau Email Confirmation aktif | Bagian [6](#6-membuat-user-admin) — matikan email confirmation / verify user |
| Artikel tersimpan tapi **URL detail `/blog/undefined`** | Kode lama, sebelum fix `objectId` | Pastikan pakai kode terbaru — [bagian 8](#8-fix-bug-objectid--postdate-sudah-diterapkan) |
| Error saat bikin kolom: *"This name is forbidden"* | Nama kolom pakai reserved word Backendless (mis. `date`) | Ganti nama kolom — project ini pakai `postDate` ([bagian 8](#8-fix-bug-objectid--postdate-sudah-diterapkan)) |
| Artikel muncul **dobel** | By design: seed lokal + Backendless digabung | Normal. Atau ikuti [bagian 10](#10-opsional-import-seed-posts-ke-backendless) |
| Login **menerima password apa pun** | Mode fallback — `.env` kosong/tidak kebaca | Isi `.env` dengan benar + restart server |
| Artikel baru hilang setelah ganti browser/clear cache | Masih mode fallback (localStorage) | Sama seperti atas — isi `.env` |

---

## 12. FAQ & Catatan Penting

**Q: Apa JS API Key aman walau ada di kode client-side?**
Ya, itu memang desainnya — JS API key dipakai publik by design. Keamanan data lo ada di **permissions** (bagian 7), bukan di kerahasiaan key. Yang harus dirahasiakan adalah **secret key** untuk server-side (tidak dipakai project ini).

**Q: Kalau deploy ke Vercel/Netlify/GitHub Pages, perlu apa?**
Tambahkan kedua variabel (`VITE_BACKENDLESS_APP_ID` & `VITE_BACKENDLESS_JS_KEY`) di **Environment Variables** platform deploy tersebut, lalu redeploy. Karena `.env` tidak ikut ter-commit.

**Q: Tanpa Backendless sama sekali, app hancur nggak?**
Nggak. Semua halaman lain (Home, About, Services, Teams) murni statis. Hanya login & blog yang pakai fallback localStorage. Tapi ingat: mode fallback = login menerima **apa pun** → jangan dipakai untuk production.

**Q: Bisa tambah kolom baru, misal `tags`?**
Bisa — tambah kolom di Console (STRING), lalu tambahkan di form `CreatePost.tsx` dan type `Post` di `src/data/posts.ts`. Tapi mapping `excerpt`/`image`/dll di `posts.tsx` tidak otomatis tahu kolom baru.

**Q: Bisa hapus artikel?**
Belum ada UI-nya. Sementara: hapus record langsung dari Console Backendless (Data → Posts → pilih record → Delete). Untuk kode, gunakan `Backendless.Data.of('Posts').remove(objectId)`.

**Q: Region server ngaruh?**
Hanya latensi. Fungsi sama saja.

---

*Terakhir diperbarui: 2026-09-08 — dibuat untuk repo `companyprofile` (NusaDrill Energy).*
