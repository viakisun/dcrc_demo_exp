import React from 'react';
import { SampleViewer } from '@/components/sample-viewer';
import { sampleSlugs, type SampleSlug } from '@/lib/types';

export function generateStaticParams() {
  return sampleSlugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function SamplePage(props: { params: Promise<{ slug: SampleSlug }> }) {
  const { slug } = await props.params;
  return <SampleViewer slug={slug} />;
}
