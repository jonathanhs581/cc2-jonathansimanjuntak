import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'
import { GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon, SendIcon } from './icons'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type ContactForm = { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof ContactForm, string>>

const DRAFT_KEY = 'portfolio:contact-draft'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY_FORM: ContactForm = { name: '', email: '', message: '' }

function readDraft(): ContactForm {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (raw) return { ...EMPTY_FORM, ...(JSON.parse(raw) as Partial<ContactForm>) }
  } catch {
  }
  return EMPTY_FORM
}

async function sendMessage(payload: ContactForm): Promise<void> {
  const subject = encodeURIComponent(`Pesan dari portfolio — ${payload.name}`)
  const body = encodeURIComponent(`${payload.message}\n\n—\n${payload.name}\n${payload.email}`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  await new Promise((resolve) => setTimeout(resolve, 800))
}

function Contact() {
  const [form, setForm] = useState<ContactForm>(readDraft)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form))
    } catch {
    }
  }, [form])

  const setField = (field: keyof ContactForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (form.name.trim().length < 2) e.name = 'Nama minimal 2 karakter.'
    if (!EMAIL_REGEX.test(form.email)) e.email = 'Format email belum benar.'
    if (form.message.trim().length < 10) e.message = 'Pesan minimal 10 karakter.'
    else if (form.message.length > 500) e.message = 'Pesan maksimal 500 karakter.'
    return e
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    try {
      await sendMessage(form)
      setStatus('success')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-md border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-1 ${
      hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-400' : 'border-line focus:border-accent-dark focus:ring-accent'
    }`

  const githubHandle = `@${profile.github.split('/').pop() ?? 'github'}`
  const contactItems = [
    { icon: MailIcon, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    ...(profile.linkedin
      ? [
          {
            icon: LinkedInIcon,
            label: 'LinkedIn',
            value: profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '/in/'),
            href: profile.linkedin,
          },
        ]
      : []),
    { icon: GitHubIcon, label: 'GitHub', value: githubHandle, href: profile.github },
    { icon: MapPinIcon, label: 'Lokasi', value: profile.location },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="contact" label="Contact" title="Mari Bekerja Sama" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-base leading-relaxed text-body">
              Punya ide project, lowongan, atau sekadar mau diskusi soal web
              development? Kirim pesan, biasanya saya balas dalam 1×24 jam.
            </p>

            <ul className="mt-8 space-y-4">
              {contactItems.map(({ icon: Icon, label, value, ...rest }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-white text-accent-dark">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {label}
                    </p>
                    {rest.href ? (
                      <a
                        href={rest.href}
                        target={rest.href.startsWith('http') ? '_blank' : undefined}
                        rel={rest.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm font-semibold text-ink underline-offset-4 hover:text-accent-dark hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Nama
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setField('name')(e.target.value)}
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="Nama kamu"
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email')(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="nama@email.com"
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setField('message')(e.target.value)}
                  required
                  minLength={10}
                  maxLength={500}
                  placeholder="Ceritakan kebutuhan atau idemu..."
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClass(Boolean(errors.message))} resize-y`}
                />
                <div className="mt-1.5 flex items-center justify-between">
                  {errors.message ? (
                    <p id="message-error" role="alert" className="text-xs text-red-600">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p aria-hidden="true" className="text-xs text-muted">
                    {form.message.length}/500
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <SendIcon className="h-4 w-4" />
                {status === 'submitting' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </div>

            {status === 'success' && (
              <p
                role="status"
                className="mt-4 rounded-md border border-line border-l-4 border-l-accent-dark bg-white px-4 py-3 text-sm text-ink"
              >
                Aplikasi email dibuka — tinggal tekan kirim dari sana. Terima kasih sudah menghubungi!
              </p>
            )}
            {status === 'error' && (
              <p
                role="alert"
                className="mt-4 rounded-md border border-line border-l-4 border-l-red-600 bg-white px-4 py-3 text-sm text-ink"
              >
                Gagal mengirim pesan. Isi form kamu masih tersimpan, silakan coba kirim lagi.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
