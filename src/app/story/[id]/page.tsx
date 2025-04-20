// /src/app/story/[id]/page.tsx
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeRaw from 'rehype-raw';
import MdxContent from '@/components/MdxContent';

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), 'public', 'stories', `${id}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, 'utf8');

  const mdxSource = await serialize(source, {
    mdxOptions: {
      rehypePlugins: [
        [rehypeRaw, { passThrough: ['mdxJsxFlowElement', 'mdxJsxTextElement'] }],
      ],
    },
    scope: {},
  });

  return (
    <article>
      <MdxContent mdxSource={mdxSource} />
    </article>
  );
}
