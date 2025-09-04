'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { SampleData } from '@/app/page';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SampleCardProps {
  sample: SampleData;
}

// A simple parser to convert the markdown-like text to React elements
const renderDetails = (details: string) => {
  const lines = details.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2 pl-4">
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
      elements.push(<h4 key={index} className="text-lg font-semibold text-purple-300 mt-4 mb-2">{line.replace('### ', '')}</h4>);
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(<h3 key={index} className="text-xl font-bold text-green-400 mt-6 mb-3">{line.replace('## ', '')}</h3>);
    } else if (line.startsWith('**')) {
      flushList();
      elements.push(<p key={index} className="text-md font-bold text-gray-300 mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>);
    } else if (line.startsWith('- ')) {
      listItems.push(line);
    } else if (line.trim() === '') {
      flushList();
      elements.push(<div key={index} className="h-2" />);
    } else {
      flushList();
      elements.push(<p key={index} className="text-gray-400">{line}</p>);
    }
  });

  flushList(); // Add any remaining list items
  return elements;
};

export function SampleCard({ sample }: SampleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract the core mission to display even when collapsed.
  const coreMissionMatch = sample.details.match(/\*\*🎯 핵심 임무\*\*\n((?:- .+\n?)+)/);
  const coreMission = coreMissionMatch ? coreMissionMatch[1].trim().split('\n')[0].replace('- ', '') : sample.summary;

  return (
    <div className="bg-gray-950 border-2 border-green-800/50 rounded-lg flex flex-col h-full transition-all hover:border-green-500/80 hover:shadow-2xl hover:shadow-green-500/10">
      {/* Collapsed View Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-green-400 mb-2">{sample.title}</h3>
        <p className="text-gray-400 mb-4 h-12">
          <span className="font-semibold text-green-300/80">🎯 Core Mission:</span> {coreMission}
        </p>
        <div className="font-mono text-xs text-purple-400 bg-purple-900/20 px-2 py-1 rounded inline-block">
          {sample.route}
        </div>
      </div>

      {/* Expanded View Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-800">
          <div className="prose prose-invert prose-sm max-w-none text-gray-300">
            {renderDetails(sample.details)}
          </div>
        </div>
      )}

      {/* Footer with Buttons */}
      <div className="mt-auto p-4 bg-gray-900/50 border-t border-gray-800/80 rounded-b-lg flex items-center gap-4">
        <Link href={sample.route} legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2 bg-green-700 text-white font-bold rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Open Sample
          </a>
        </Link>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 px-4 py-2 bg-gray-700 text-white font-bold rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
    </div>
  );
}
