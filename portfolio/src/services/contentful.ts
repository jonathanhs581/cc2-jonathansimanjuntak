import type { Project, ProjectCategory, Testimonial } from '../types'
import { localProjects } from '../data/projects'
import { localTestimonials } from '../data/testimonials'

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN

export const isContentfulConfigured = Boolean(SPACE_ID && ACCESS_TOKEN)

async function getClient() {
  const { createClient } = await import('contentful')
  return createClient({ space: SPACE_ID!, accessToken: ACCESS_TOKEN! })
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []
}

function assetUrl(value: unknown): string {
  const url = (value as { fields?: { file?: { url?: string } } } | undefined)?.fields?.file?.url
  return url ? `https:${url}` : '/images/project-fallback.svg'
}

export async function getProjects(): Promise<Project[]> {
  if (!isContentfulConfigured) return localProjects

  const client = await getClient()
  const res = await client.getEntries({ content_type: 'project' })

  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>
    return {
      id: item.sys.id,
      title: asString(f.title),
      description: asString(f.description),
      category: (asString(f.category) as ProjectCategory) || 'Full-Stack',
      technologies: asStringArray(f.technologies),
      image: assetUrl(f.image),
      liveUrl: asString(f.liveUrl) || undefined,
      repoUrl: asString(f.repoUrl) || undefined,
      star: {
        situation: asString(f.situation),
        task: asString(f.task),
        action: asString(f.action),
        result: asString(f.result),
      },
    }
  })
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isContentfulConfigured) return localTestimonials

  const client = await getClient()
  const res = await client.getEntries({ content_type: 'testimonial' })

  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>
    return {
      id: item.sys.id,
      quote: asString(f.quote),
      name: asString(f.name),
      role: asString(f.role),
      avatar: assetUrl(f.avatar),
    }
  })
}
