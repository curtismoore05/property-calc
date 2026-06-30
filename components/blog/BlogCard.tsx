import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatDate, type PostMeta } from '@/lib/blog'

const AUTHOR = 'Curtis Moore'

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <p className="text-xs text-muted-foreground">
        {formatDate(post.date)} · {AUTHOR}
      </p>
      <h2 className="mt-2 text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
        {post.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read full article
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
