import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../lib/posts'
import { useAuth } from '../lib/auth'
import { categories } from '../data/posts'

export default function CreatePost() {
  const { user } = useAuth()
  const { createPost } = usePosts()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    if (title.trim().length < 8) {
      setError('Title should be at least 8 characters.')
      return
    }
    if (content.trim().length < 40) {
      setError('Content should be at least 40 characters.')
      return
    }
    setSubmitting(true)
    try {
      await createPost({
        title: title.trim(),
        excerpt: excerpt.trim() || content.trim().slice(0, 150),
        content: content.trim(),
        author: user?.name || 'NusaDrill Newsroom',
        date: new Date().toISOString().slice(0, 10),
        category,
        image: `/images/blog-${(Math.floor(Math.random() * 6) + 1)}.webp`,
      })
      navigate('/blog')
    } catch {
      setError('Could not publish the article. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-mist py-28 lg:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-deep before:block before:h-px before:w-8 before:bg-amber-deep">
          Newsroom
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-navy-800 sm:text-4xl">Write an article</h1>
        <p className="mt-3 text-sm text-body">
          Published articles appear instantly in the Blog List. Separate paragraphs with a blank line.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-line bg-white p-8">
          <div>
            <label htmlFor="title" className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
              Title
            </label>
            <input
              id="title"
              required
              minLength={8}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-amber-brand"
              placeholder="How we cut drilling costs by 18%"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-amber-brand"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="excerpt" className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
                Excerpt <span className="normal-case text-body">(optional)</span>
              </label>
              <input
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="mt-2 w-full rounded-lg border border-line px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-amber-brand"
                placeholder="One-line summary for the blog card"
              />
            </div>
          </div>
          <div>
            <label htmlFor="content" className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
              Content
            </label>
            <textarea
              id="content"
              required
              minLength={40}
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-2 w-full resize-y rounded-lg border border-line px-4 py-3 text-sm leading-relaxed text-navy-800 outline-none transition-colors focus:border-amber-brand"
              placeholder="Tell the story the way you would at a pre-shift meeting…"
            />
          </div>
          {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-amber-brand px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-navy-900 transition-colors hover:bg-amber-deep disabled:opacity-60"
          >
            {submitting ? 'Publishing…' : 'Publish Article'}
          </button>
        </form>
      </div>
    </section>
  )
}
