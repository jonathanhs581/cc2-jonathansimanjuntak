import { create } from 'zustand'
import { getBackendless } from './backendless'
import { seedPosts } from '../data/posts'
import type { Post } from '../data/posts'

type NewPost = Omit<Post, 'id'>

type PostsState = {
  posts: Post[]
  loading: boolean
  createPost: (post: NewPost) => Promise<void>
}

const STORE_KEY = 'nusadrill-posts'

function toDateString(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10)
}

function readLocalPosts(): Post[] {
  const raw = localStorage.getItem(STORE_KEY)
  if (!raw) {
    localStorage.setItem(STORE_KEY, JSON.stringify(seedPosts))
    return seedPosts
  }
  try {
    const parsed = JSON.parse(raw) as Post[]
    const custom = parsed.filter((p) => !p.id.startsWith('seed-'))
    return [...custom, ...seedPosts]
  } catch {
    return seedPosts
  }
}

export const usePosts = create<PostsState>()((set) => ({
  posts: [],
  loading: true,

  async createPost(post) {
    const Backendless = await getBackendless()
    if (Backendless) {
      const { date, ...rest } = post
      const saved = (await Backendless.Data.of('Posts').save({ ...rest, postDate: date })) as Post & {
        objectId?: string
        postDate?: string
      }
      const normalized: Post = {
        ...saved,
        id: saved.objectId || saved.id,
        date: saved.postDate || date,
      }
      set((state) => ({ posts: [normalized, ...state.posts] }))
      return
    }
    const local = { ...post, id: `local-${Date.now()}` }
    const raw = localStorage.getItem(STORE_KEY)
    const existing = raw ? (JSON.parse(raw) as Post[]) : []
    localStorage.setItem(STORE_KEY, JSON.stringify([local, ...existing]))
    set((state) => ({ posts: [local, ...state.posts] }))
  },
}))

async function loadPosts() {
  const Backendless = await getBackendless()
  if (!Backendless) {
    usePosts.setState({ posts: readLocalPosts(), loading: false })
    return
  }
  try {
    const query = Backendless.DataQueryBuilder.create()
    query.setSortBy(['created desc'])
    type RemotePost = Post & { objectId?: string; postDate?: string; created?: string | number }
    const remote = (await Backendless.Data.of('Posts').find(query)) as RemotePost[]
    const mapped = remote.map((p) => ({
      ...p,
      id: p.objectId || p.id,
      date: p.postDate || toDateString(p.created) || new Date().toISOString().slice(0, 10),
      image: p.image || '/images/blog-2.webp',
      author: p.author || 'NusaDrill Newsroom',
      category: p.category || 'Engineering',
      excerpt: p.excerpt || p.content.slice(0, 140),
    }))
    usePosts.setState({ posts: [...mapped, ...seedPosts], loading: false })
  } catch {
    usePosts.setState({ posts: readLocalPosts(), loading: false })
  }
}

loadPosts()
