'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { SampleSlug } from '@/lib/types';

const components: Record<SampleSlug, React.ComponentType> = {
  'rokaf-data-analyst-workstation': dynamic(() => import('@/samples/rokaf-data-analyst-workstation')),
  'rokaf-flight-controller-workstation': dynamic(() => import('@/samples/rokaf-flight-controller-workstation')),
  'rokaf-mcrc-advanced-v2': dynamic(() => import('@/samples/rokaf-mcrc-advanced-v2')),
  'rokaf-mcrc-ai-system': dynamic(() => import('@/samples/rokaf-mcrc-ai-system')),
  'rokaf-mcrc-east-asia': dynamic(() => import('@/samples/rokaf-mcrc-east-asia')),
  'rokaf-radar-controller-workstation': dynamic(() => import('@/samples/rokaf-radar-controller-workstation')),
  'rokaf-sector-ke14-operations': dynamic(() => import('@/samples/rokaf-sector-ke14-operations')),
  'comm-coordinator-workstation': dynamic(() => import('@/samples/comm-coordinator-workstation')),
};

export function SampleViewer({ slug }: { slug: SampleSlug }) {
  const Component = components[slug];

  if (!Component) {
    return <div>Sample not found.</div>;
  }

  return <Component />;
}
