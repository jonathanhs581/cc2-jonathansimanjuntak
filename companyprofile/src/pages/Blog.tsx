import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import BlogCard from '../components/BlogCard'
import { usePosts } from '../lib/posts'
import { categories } from '../data/posts'

export default function Blog() {
  const { posts, loading } = usePosts()
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <PageHero title="Blog & Insights" crumb="Blog" />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h1 className="font-display text-2xl font-bold text-navy-800">
              Field notes from our engineers
            </h1>
            <Link
              to="/create-post"
              className="rounded-full bg-amber-brand px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-navy-900 transition-colors hover:bg-amber-deep"
            >
              Write an Article
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3" role="group" aria-label="Filter by category">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  active === category
                    ? 'border-navy-800 bg-navy-800 text-white'
                    : 'border-line text-body hover:border-navy-800 hover:text-navy-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading && (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-line">
                  <div className="aspect-[3/2] animate-pulse bg-mist" />
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-1/2 animate-pulse rounded bg-mist" />
                    <div className="h-3 w-full animate-pulse rounded bg-mist" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="mt-12 rounded-xl border border-line bg-mist p-10 text-center text-sm text-body">
              No articles in this category yet.
            </p>
          )}

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
