import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from || '/create-post'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="/images/services-bg.webp"
          srcSet="/images/services-bg-mobile.webp 800w, /images/services-bg.webp 1920w"
          sizes="100vw"
          alt="Offshore oil rig structure"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-navy-900/40" />
        <div className="absolute bottom-0 p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-brand">NusaDrill Energy</p>
          <p className="mt-4 max-w-md font-display text-3xl font-bold leading-snug text-white">
            Drilling Deeper, Delivering Further.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white px-5 py-28">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-bold text-navy-800">Welcome back</h1>
          <p className="mt-2 text-sm text-body">
            Sign in to publish articles and manage content.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate={false}>
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-line px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-amber-brand"
                placeholder="you@nusadrill.co.id"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-line px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-amber-brand"
                placeholder="••••••••"
              />
            </div>
            {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-amber-brand py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-navy-900 transition-colors hover:bg-amber-deep disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-body">
            Not registered yet?{' '}
            <a href="mailto:info@nusadrill.co.id" className="font-semibold text-amber-deep">
              Contact the administrator
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
