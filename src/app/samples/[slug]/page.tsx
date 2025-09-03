import React from 'react';
import { SampleViewer } from '@/components/sample-viewer';

// We can add generateStaticParams here to pre-build these pages at build time.
// This is good practice for performance.
export function generateStaticParams() {
  const sampleSlugs = [
    'rokaf-data-analyst-workstation',
    'rokaf-flight-controller-workstation',
    'rokaf-mcrc-advanced-v2',
    'rokaf-mcrc-ai-system',
    'rokaf-mcrc-east-asia',
    'rokaf-radar-controller-workstation',
    'rokaf-sector-ke14-operations',
  ];

  return sampleSlugs.map((slug) => ({
    slug: slug,
  }));
}

export default function SamplePage({ params }: { params: { slug: string } }) {
  // Type assertion is safe here because generateStaticParams ensures the slug is valid.
  return <SampleViewer slug={params.slug as any} />;
}
