import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'
import Stats from './Stats'
import { ChatIcon, ClockIcon, SearchIcon } from './icons'

const CORE_SKILLS = ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'AWS', 'Git']

const KEY_VALUES = [
  {
    icon: ClockIcon,
    title: 'Timeliness',
    text: 'First response < 15 menit dan resolusi < 1 jam adalah standar harian saya. Deadline adalah komitmen.',
  },
  {
    icon: SearchIcon,
    title: 'Attention to Detail',
    text: 'Biasa membedakan lonjakan traffic normal vs anomali DDoS. Edge case kecil tidak boleh lolos.',
  },
  {
    icon: ChatIcon,
    title: 'Clear Communication',
    text: 'Menangani klien lintas negara (Singapura) dan menerjemahkan masalah teknis ke bahasa user.',
  },
] as const

const BIO_DATA = [
  { label: 'Nama', value: profile.name },
  { label: 'Role', value: profile.role },
  { label: 'Email', value: profile.email },
  { label: 'Lokasi', value: profile.location },
  { label: 'Pendidikan', value: 'S1 Sistem Informasi, Universitas Terbuka' },
  { label: 'Bootcamp', value: 'Full Stack Dev, Purwadhika Technology School' },
  { label: 'Sertifikasi', value: 'AWS Certified Cloud Practitioner' },
  { label: 'Status', value: 'Kerja + kuliah + bootcamp · open to junior web dev roles' },
] as const

function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="about" label="About Me" title="Kenalan Lebih Dekat" />

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <p className="text-base leading-relaxed text-body">
              Perjalanan saya tidak biasa: 7 semester Meteorologi di ITB yang
              menempa cara berpikir analitis, lalu turun ke dunia hospitality
              (hotel &amp; yoga studio) sebelum menemukan rumah di{' '}
              <strong className="font-semibold text-ink">
                IT Support &amp; Operations
              </strong>{' '}
              di Triple One Global.
            </p>
            <p className="mt-4 text-base leading-relaxed text-body">
              Di sana saya menjalani tiga dunia sekaligus: customer service level
              1 untuk ZYM Mobile Singapore via Moobidesk (200–300 tiket/hari),
              monitoring alert AWS untuk sistem imigrasi level pemerintah, dan
              QA testing untuk platform web. Dari QA dan monitoring, saya mulai
              bertanya &ldquo;kenapa tidak saya yang membangun?&rdquo; Jawabannya:
              bootcamp full-stack yang sedang saya jalani.
            </p>
            <p className="mt-4 text-base leading-relaxed text-body">
              Sekarang saya menjalani mode <strong className="font-semibold text-ink">triple-shift</strong>
              : bekerja di Triple One Global, kuliah S1 Sistem Informasi di Universitas
              Terbuka (materi berjalan: pemrograman Java dan database MongoDB), sekaligus bootcamp Full Stack Development di Purwadhika Technology School.
              Fokus saya sederhana: aplikasi yang andal, teruji, dan enak dipakai.
              Itu standar yang saya bawa dari dunia operasional.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core skills">
              {CORE_SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink"
                >
                  {skill}
                </li>
              ))}
            </ul>

            <ul className="mt-10">
              {KEY_VALUES.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex items-start gap-4 border-t border-line py-5 last:border-b"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-white text-accent-dark">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-lg border border-line bg-white p-6 sm:p-8 md:mt-14">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Bio Data
            </h3>
            <dl className="mt-4">
              {BIO_DATA.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid gap-1 border-t border-line py-3.5 last:border-b sm:grid-cols-[110px_1fr] sm:gap-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted sm:pt-0.5">
                    {label}
                  </dt>
                  <dd className="break-words text-sm font-semibold text-ink sm:text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <Stats />
      </div>
    </section>
  )
}

export default About
