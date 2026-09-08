import axios from 'axios'
import { create } from 'zustand'

export type TeamMember = {
  name: { first: string; last: string }
  picture: { large: string }
  location: { city: string }
  registered: { date: string }
  login: { username: string }
}

type TeamState = {
  members: TeamMember[]
  loading: boolean
  error: boolean
  fetchMembers: () => Promise<void>
}

const api = axios.create({
  baseURL: 'https://randomuser.me/api',
  timeout: 10000,
})

export const useTeam = create<TeamState>()((set) => ({
  members: [],
  loading: false,
  error: false,

  async fetchMembers() {
    set({ loading: true, error: false })
    try {
      const { data } = await api.get('/', {
        params: { results: 9, inc: 'name,picture,location,registered,login' },
      })
      set({ members: data.results, loading: false })
    } catch {
      set({ error: true, loading: false })
    }
  },
}))
