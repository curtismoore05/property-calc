import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function generateStaticParams() {
  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({ slug: file.replace(/\.mdx$/, '') }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-accent">{params.slug}</h1>
    </main>
  )
}
