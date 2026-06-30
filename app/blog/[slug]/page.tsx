import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getAllSlugs, getPost, formatDate } from '@/lib/blog'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  return genMeta({ title: post.title, description: post.description, path: `/blog/${post.slug}` })
}

// Style MDX elements with the design system (no typography plugin needed).
const mdxComponents = {
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4" {...p} />,
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" {...p} />,
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className="my-4 leading-relaxed" {...p} />,
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 my-4 space-y-2" {...p} />,
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 my-4 space-y-2" {...p} />,
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-accent hover:underline" {...p} />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-foreground" {...p} />,
  table: (p: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-left border-collapse border border-border" {...p} />
    </div>
  ),
  th: (p: React.HTMLAttributes<HTMLTableCellElement>) => <th className="border border-border p-3 text-foreground font-semibold bg-secondary/50" {...p} />,
  td: (p: React.HTMLAttributes<HTMLTableCellElement>) => <td className="border border-border p-3" {...p} />,
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(post.date)}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-foreground text-balance">
          {post.title}
        </h1>
      </header>

      <div className="blog-body text-base leading-relaxed text-muted-foreground">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  )
}
