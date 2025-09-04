import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { sampleSlugs, type SampleSlug } from '@/lib/types';
import { notFound } from 'next/navigation';

// Generate static pages for all slugs at build time
export function generateStaticParams() {
  return sampleSlugs.map((slug) => ({
    slug: slug,
  }));
}

// A simple parser to convert the markdown-like text to React elements
const renderDetails = (details: string) => {
  const lines = details.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
          {listItems.map((item, index) => (
            <li key={index}>{item.replace(/^- /, '')}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={index} className="text-2xl font-semibold text-purple-300 mt-8 mb-4">{line.replace('### ', '')}</h3>);
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={index} className="text-4xl font-bold text-green-400 mt-10 mb-6 border-b-2 border-green-800 pb-2">{line.replace('## ', '')}</h2>);
    } else if (line.startsWith('**')) {
      flushList();
      elements.push(<h4 key={index} className="text-xl font-bold text-gray-200 mt-6 mb-3">{line.replace(/\*\*/g, '')}</h4>);
    } else if (line.startsWith('- ')) {
      listItems.push(line);
    } else if (line.trim() === '') {
      flushList();
      elements.push(<div key={index} className="h-4" />);
    } else {
      flushList();
      elements.push(<p key={index} className="text-gray-400 leading-relaxed">{line}</p>);
    }
  });

  flushList(); // Add any remaining list items
  return elements;
};


async function getWorkstationDetails(slug: SampleSlug) {
  const detailsPath = path.join(process.cwd(), 'public/workstation-details.json');
  try {
    const detailsJson = await fs.readFile(detailsPath, 'utf-8');
    const details: Record<string, string> = JSON.parse(detailsJson);
    return details[slug] || null;
  } catch (error) {
    console.error("Could not read workstation-details.json:", error);
    return null;
  }
}

export default async function AboutPage(props: { params: Promise<{ slug: SampleSlug }> }) {
  const { slug } = await props.params;
  const details = await getWorkstationDetails(slug);

  if (!details) {
    notFound();
  }

  const sampleRoute = `/samples/${slug}`;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          {renderDetails(details)}
        </div>
        <div className="mt-16 text-center">
          <Link href={sampleRoute}>
            <div className="inline-block px-12 py-4 bg-green-700 text-white font-bold text-lg rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer">
              Open Interactive Sample
            </div>
          </Link>
        </div>
        <div className="mt-8 text-center">
            <Link href="/" className="text-green-400 hover:text-green-300 transition-colors">
                &larr; Back to Dashboard
            </Link>
        </div>
      </div>
    </main>
  );
}
