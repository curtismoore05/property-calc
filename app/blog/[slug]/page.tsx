import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getAllSlugs, getPost, formatDate } from '@/lib/blog'

const AUTHOR = 'Curtis Moore'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  return genMeta({ title: post.title, description: post.description, path: `/blog/${post.slug}` })
}

// Style MDX elements with the design system (no typography plugin needed).
const mdxComponents = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-4" {...p} />,
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-xl font-bold tracking-tight text-foreground mt-8 mb-3" {...p} />,
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-lg font-semibold text-foreground mt-6 mb-2" {...p} />,
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-muted-foreground leading-relaxed my-4" {...p} />,
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 my-4 space-y-2 text-muted-foreground" {...p} />,
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 my-4 space-y-2 text-muted-foreground" {...p} />,
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-accent hover:underline" {...p} />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-foreground" {...p} />,
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>
      <p className="mt-6 text-sm text-muted-foreground">
        {formatDate(post.date)} · {AUTHOR}
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">{post.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>
      <div className="mt-8 border-t border-border pt-8">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  )
}
