import { create } from 'zustand'
import { backendlessReady, getBackendless } from './backendless'

export type AuthUser = {
  email: string
  name: string
}

const SESSION_KEY = 'nusadrill-session'

type BackendlessUser = { email?: string; name?: string }

type AuthState = {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

function readSession(): AuthUser | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export const useAuth = create<AuthState>()((set) => ({
  user: readSession(),
  loading: backendlessReady,

  async login(email, password) {
    const Backendless = await getBackendless()
    if (Backendless) {
      const current = await Backendless.UserService.login<BackendlessUser>(email, password, true)
      const logged = { email: current.email || email, name: current.name || current.email || email }
      localStorage.setItem(SESSION_KEY, JSON.stringify(logged))
      set({ user: logged })
      return
    }
    const logged = { email, name: email.split('@')[0] }
    localStorage.setItem(SESSION_KEY, JSON.stringify(logged))
    set({ user: logged })
  },

  logout() {
    localStorage.removeItem(SESSION_KEY)
    set({ user: null })
    getBackendless()
      .then((Backendless) => Backendless?.UserService.logout())
      .catch(() => {})
  },
}))

if (backendlessReady) {
  getBackendless()
    .then((Backendless) =>
      Backendless?.UserService.getCurrentUser<BackendlessUser>().then((current) => {
        if (current?.email) {
          const restored = { email: current.email, name: current.name || current.email }
          localStorage.setItem(SESSION_KEY, JSON.stringify(restored))
          useAuth.setState({ user: restored })
        }
      }),
    )
    .catch(() => {})
    .finally(() => useAuth.setState({ loading: false }))
}
