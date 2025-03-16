"use client";

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MdxContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function MdxContent({ mdxSource }: MdxContentProps) {
  return <MDXRemote {...mdxSource} />;
}
