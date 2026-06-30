import { generateMetadata as genMeta } from '@/lib/seo'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'

export const metadata = genMeta({
  title: 'Property Investment Insights',
  description:
    'Guides and articles on Australian property investment — stamp duty, negative gearing, depreciation, capital gains tax and more.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Property Investment Insights
      </h1>
      <p className="mt-3 text-muted-foreground">
        Practical guides to help you make smarter property decisions.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 animate-children">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
