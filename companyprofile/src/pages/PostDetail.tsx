import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { usePosts } from '../lib/posts'

export default function PostDetail() {
  const { id } = useParams()
  const { posts } = usePosts()
  const post = posts.find((p) => p.id === id)

  if (!post) {
    return (
      <>
        <PageHero title="Article Not Found" crumb="Blog" />
        <section className="bg-white py-20 text-center">
          <p className="text-body">This article may have been moved or removed.</p>
          <Link
            to="/blog"
            className="mt-6 inline-block rounded-full bg-navy-800 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white"
          >
            Back to Blog
          </Link>
        </section>
      </>
    )
  }

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <PageHero title={post.title} crumb="Blog" />
      <section className="bg-white py-16 lg:py-24">
        <article className="mx-auto max-w-3xl px-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-body">
            <time dateTime={post.date}>{date}</time>
            <span className="mx-2 text-line">•</span>
            <span className="text-amber-deep">{post.category}</span>
            <span className="mx-2 text-line">•</span>
            {post.author}
          </p>
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
          />
          <div className="mt-10 space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-navy-700">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-12 border-t border-line pt-8">
            <Link
              to="/blog"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-deep"
            >
              ← Back to all articles
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}
