import { Link } from 'react-router-dom'
import { ArrowIcon } from './icons'
import type { Post } from '../data/posts'

export default function BlogCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <article className="group flex flex-col">
      <Link to={`/blog/${post.id}`} className="relative block overflow-hidden rounded-lg" tabIndex={-1} aria-hidden="true">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-navy-950/0 transition-colors duration-500 group-hover:bg-navy-950/20" />
        <span className="absolute bottom-0 left-0 h-1 w-0 bg-amber-brand transition-all duration-500 ease-out group-hover:w-full" />
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-body">
          <span className="text-amber-deep">{post.category}</span>
          <span className="mx-2 text-line">—</span>
          <time dateTime={post.date}>{date}</time>
        </p>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-navy-800">
          <Link
            to={`/blog/${post.id}`}
            className="decoration-amber-brand decoration-2 underline-offset-4 transition-all duration-300 hover:underline"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span className="text-xs font-medium text-navy-700">{post.author}</span>
          <Link
            to={`/blog/${post.id}`}
            aria-label={`Read ${post.title}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-navy-800 transition-all duration-300 group-hover:border-amber-brand group-hover:bg-amber-brand group-hover:text-navy-900"
          >
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
