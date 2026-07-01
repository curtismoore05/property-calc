import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { formatDate, type PostMeta } from '@/lib/blog'

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col rounded-xl border border-border bg-card p-6 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
        post.featured ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formatDate(post.date)}
        </span>
      </div>
      <h2
        className={`mt-4 font-bold text-balance leading-snug text-foreground group-hover:text-accent transition-colors ${
          post.featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
        }`}
      >
        {post.title}
      </h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">{post.description}</p>
      <span className="mt-6 inline-flex items-center text-accent font-medium group-hover:underline">
        Read full article
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  )
}
