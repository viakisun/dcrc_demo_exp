'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const components = {
  'rokaf-data-analyst-workstation': dynamic(() => import('@/samples/rokaf-data-analyst-workstation.tsx')),
  'rokaf-flight-controller-workstation': dynamic(() => import('@/samples/rokaf-flight-controller-workstation.tsx')),
  'rokaf-mcrc-advanced-v2': dynamic(() => import('@/samples/rokaf-mcrc-advanced-v2.tsx')),
  'rokaf-mcrc-ai-system': dynamic(() => import('@/samples/rokaf-mcrc-ai-system.tsx')),
  'rokaf-mcrc-east-asia': dynamic(() => import('@/samples/rokaf-mcrc-east-asia.tsx')),
  'rokaf-radar-controller-workstation': dynamic(() => import('@/samples/rokaf-radar-controller-workstation.tsx')),
  'rokaf-sector-ke14-operations': dynamic(() => import('@/samples/rokaf-sector-ke14-operations.tsx')),
};

type SampleSlug = keyof typeof components;

export function SampleViewer({ slug }: { slug: SampleSlug }) {
  const Component = components[slug];

  if (!Component) {
    return <div>Sample not found.</div>;
  }

  return <Component />;
}
