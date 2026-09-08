import type { Project } from '../types'

export const localProjects: Project[] = [
  {
    id: 'cs-hub',
    title: 'CS-HUB · Omnichannel WhatsApp CS Dashboard',
    description:
      'Dashboard customer service omnichannel WhatsApp untuk tim kecil: shared inbox, tiket, SLA monitoring, dan analytics real-time.',
    category: 'Full-Stack',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Bun', 'Express', 'Socket.IO', 'PostgreSQL', 'Prisma'],
    image: '/images/project-cs-hub.svg',
    repoUrl: 'https://github.com/jonathanhs581/CS-HUB',
    star: {
      situation:
        'Tim kecil yang melayani customer via WhatsApp kesulitan: chat tercecer di HP pribadi masing-masing agen: tidak ada pembagian tiket, tidak terlihat SLA, dan riwayat pelanggan hilang berganti device.',
      task:
        'Merancang dan membangun platform CS omnichannel WhatsApp untuk managed pilot deployment: satu workspace untuk owner, supervisor, dan agent.',
      action:
        'Frontend React + TypeScript + Tailwind (shadcn/ui); backend Bun + Express + Socket.IO. Multi-session WhatsApp via Baileys, data tenant-scoped di PostgreSQL + Prisma, RBAC empat level (super admin / supervisor / agent / pending), media privat via Supabase Storage, plus audit log dan health endpoint.',
      result:
        'Platform utuh siap pilot: siklus tiket lengkap (assign → transfer → close), update real-time ke semua client terhubung, SLA monitoring, dan analytics eksekutif. Dikembangkan aktif dan terbuka di GitHub.',
    },
  },
  {
    id: 'macro-automation',
    title: 'Macro-Based Automation · 5 Job Listing Platforms',
    description:
      'Sistem otomasi berbasis macro untuk operasional konten & administrasi 5 platform job listing secara bersamaan.',
    category: 'Automation & Ops',
    technologies: ['Macro Automation', 'Excel', 'Asana', 'Trello'],
    image: '/images/project-macro-automation.svg',
    star: {
      situation:
        'Operasional konten dan administrasi 5 platform job listing dikerjakan manual setiap hari: repetitif, lambat, dan rawan keteledoran data.',
      task:
        'Menyederhanakan alur operasional lintas 5 platform sambil menjaga akurasi data dan kecepatan pembaruan.',
      action:
        'Membangun sistem otomasi berbasis macro yang menjalankan alur posting dan pembaruan data secara terjadwal, dipantau lewat board Asana/Trello agar tetap terkontrol.',
      result:
        'Di-deploy mandiri dan dipakai harian, menghasilkan pendapatan berulang (recurring revenue) yang konsisten dari operasional yang sebelumnya sepenuhnya manual.',
    },
  },
  {
    id: 'aws-l1-monitoring',
    title: 'L1 AWS Alert Monitoring · Sistem Imigrasi',
    description:
      'Pemantauan & penanganan alert infrastruktur AWS level L1 untuk sistem imigrasi level pemerintah, termasuk deteksi dini DDoS.',
    category: 'Automation & Ops',
    technologies: ['AWS', 'Cloud Monitoring', 'Incident Response', 'Escalation'],
    image: '/images/project-aws-monitoring.svg',
    star: {
      situation:
        'Sistem imigrasi level pemerintah membutuhkan pemantauan 24/7: lonjakan traffic abnormal tidak boleh sampai mengganggu layanan publik.',
      task:
        'Menangani alert infrastruktur AWS level L1: deteksi dini, analisis, dan eskalasi cepat sesuai prosedur.',
      action:
        'Pemantauan alert AWS secara shift, analisis pola traffic untuk membedakan lonjakan normal vs anomali, identifikasi indikasi serangan DDoS, dan eskalasi terkoordinasi ke tim yang tepat.',
      result:
        'Beberapa percobaan DDoS teridentifikasi dan ter-eskalasi sebelum berdampak, sehingga kontinuitas layanan tetap terjaga tanpa interupsi.',
    },
  },
  {
    id: 'qa-tradein',
    title: 'Manual QA Testing · Web Trade-in & SMS Services',
    description:
      'Functional & UAT testing untuk platform web Trade-in dan layanan SMS content sebagai gate kualitas sebelum rilis.',
    category: 'QA & Testing',
    technologies: ['Functional Testing', 'UAT', 'Bug Reporting', 'Test Scenarios'],
    image: '/images/project-qa-tradein.svg',
    star: {
      situation:
        'Platform web Trade-in dan layanan SMS content membutuhkan jaminan kualitas sebelum setiap fitur dirilis ke pengguna.',
      task:
        'Menjalankan Manual QA Testing (Functional & UAT) sebagai gate kualitas rilis.',
      action:
        'Menyusun skenario uji fungsional per user flow, eksekusi UAT bersama pemilik bisnis, dokumentasi bug lengkap dengan langkah reproduksi, serta rekomendasi perbaikan untuk tim developer.',
      result:
        'Tingkat implementasi bug report dan rekomendasi perbaikan yang tinggi dan berkontribusi langsung pada kualitas produk yang dirilis.',
    },
  },
  {
    id: 'tokopedia-scraper',
    title: 'Tokopedia Product Scraper · Seblak Price Monitoring',
    description:
      'Script Python untuk scraping data produk & harga dari Tokopedia sebagai latihan web scraping dengan data nyata.',
    category: 'Automation & Ops',
    technologies: ['Python', 'Web Scraping', 'HTML Parsing'],
    image: '/images/project-scraper-seblak.svg',
    repoUrl: 'https://github.com/jonathanhs581/scrapingtokpedseblak',
    star: {
      situation:
        'Ingin belajar Python dan web scraping dengan data nyata, sekaligus penasaran pergerakan harga jajanan favorit (seblak) di Tokopedia.',
      task:
        'Membuat script yang mengambil data produk dan harga dari hasil pencarian Tokopedia lalu menyimpannya untuk dianalisis.',
      action:
        'Python dengan library scraping, parsing struktur HTML hasil pencarian, dan penyimpanan hasil scraping agar bisa dibandingkan antar waktu.',
      result:
        'Pipeline scraping berjalan sesuai target dan menjadi fondasi eksplorasi data selanjutnya. Repo terbuka di GitHub.',
    },
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website · Site Ini',
    description:
      'Personal website single-page: slicing per komponen, state management berlapis, filter portfolio, dan siap Contentful.',
    category: 'Front-End',
    technologies: ['React 19', 'TypeScript', 'Tailwind v4', 'Vite'],
    image: '/images/project-portfolio.svg',
    star: {
      situation:
        'Code Challenge 2 bootcamp: personal website single-page dengan bobot penilaian terbesar di PageSpeed, state management, dan aksesibilitas.',
      task:
        'Membangun portfolio yang memenuhi semua kebutuhan teknis tanpa mengorbankan desain dan performa.',
      action:
        'Arsitektur data-driven (konten dari src/data → .map()), stratifikasi state (useState + Context + localStorage + custom hook useScrollSpy/useCountUp), modal accessible dengan focus trap, filter kategori, serta integrasi Contentful dengan fallback data lokal.',
      result:
        'Build lolos tanpa error/warning lint, semua interaksi terverifikasi manual di desktop & mobile (375px, tanpa horizontal scroll). Dan kamu sedang melihat hasilnya.',
    },
  },
]
