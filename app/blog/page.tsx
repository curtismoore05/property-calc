import { generateMetadata as genMeta } from '@/lib/seo'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'

export const metadata = genMeta({
  title: 'Blog',
  description:
    'Property investment insights, tax updates, and market analysis for Australian investors.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          Property Investment Insights
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Tax updates, legislative changes, market analysis, and practical advice for Australian
          property investors.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-children">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
