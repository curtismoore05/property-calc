import Link from 'next/link'
import { ArrowLeft, Calendar, Scale, Shield, Building2, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { generateMetadata as genMeta } from '@/lib/seo'
import { blogPostingSchema } from '@/lib/schema'
import { getAllSlugs, getPost, formatDate } from '@/lib/blog'

// Icons available to <Section icon="..."> in MDX, matching the source site.
const SECTION_ICONS: Record<string, LucideIcon> = { scale: Scale, shield: Shield, building2: Building2, globe: Globe }

// A titled content section with an optional leading accent icon.
function Section({ icon, title, children }: { icon?: string; title: string; children: React.ReactNode }) {
  const Icon = icon ? SECTION_ICONS[icon] : null
  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="h-6 w-6 text-accent shrink-0" />}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground m-0">{title}</h2>
      </div>
      {children}
    </section>
  )
}

// A highlighted callout card (e.g. "Impact on Different Investor Types").
function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-secondary border border-border rounded-xl my-12 p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-foreground mt-0 mb-6">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  const meta = genMeta({ title: post.title, description: post.description, path: `/blog/${post.slug}` })
  // Mark this page as an article for richer social/search metadata.
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

// Style MDX elements with the design system (no typography plugin needed).
const mdxComponents = {
  Section,
  InfoCard,
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl md:text-3xl font-semibold text-foreground mt-12 mb-4" {...p} />,
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-lg font-semibold text-accent mt-8 mb-2" {...p} />,
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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema(post)) }}
      />
      <Link href="/blog" className="inline-flex items-center gap-2 -ml-1 mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <header className="mb-12 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-muted-foreground">
            <Calendar className="h-4 w-4 text-accent" />
            {formatDate(post.date)}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-foreground text-balance">
          {post.title}
        </h1>
      </header>

      <div className="blog-body animate-children text-base leading-relaxed text-muted-foreground">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  )
}
