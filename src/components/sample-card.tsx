import React from 'react';
import Link from 'next/link';

interface PageManifest {
  id: string;
  route: string;
  title: string;
  summary: string;
  tags: string[];
}

interface SampleCardProps {
  sample: PageManifest;
}

export function SampleCard({ sample }: SampleCardProps) {
  return (
    <div className="bg-gray-950 border-2 border-green-800 rounded-lg p-6 flex flex-col h-full transition-all hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/10">
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-green-400 mb-2">{sample.title}</h3>
        <p className="text-sm text-gray-400 mb-4">{sample.summary}</p>
        <div className="font-mono text-xs text-purple-400 bg-purple-900/20 px-2 py-1 rounded inline-block">
          {sample.route}
        </div>
      </div>
      <div className="mt-6">
        <Link href={sample.route} legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2 bg-green-700 text-white font-bold rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Open Sample
          </a>
        </Link>
      </div>
    </div>
  );
}
