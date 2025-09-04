'use client';

import React, { useState, useMemo } from 'react';
import { SampleCard } from './sample-card';

export interface PageManifest {
  id: string;
  route: string;
  title: string;
  summary: string;
  tags: string[];
}

interface DashboardContainerProps {
  samples: PageManifest[];
}

export function DashboardContainer({ samples }: DashboardContainerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSamples = useMemo(() => {
    if (!searchTerm) {
      return samples;
    }
    return samples.filter(sample =>
      sample.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [samples, searchTerm]);

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <header className="text-center py-16">
        <h1 className="text-5xl font-bold text-green-400">DCRC Demo Samples</h1>
        <p className="text-lg text-gray-400 mt-4">
          A collection of interactive command and control user interface demonstrations.
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-12 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search samples by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Samples Grid */}
      {filteredSamples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSamples.map(sample => (
            <SampleCard key={sample.id} sample={sample} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No samples found matching your search.</p>
        </div>
      )}

      {/* How to Contribute Section */}
      <footer className="text-center mt-24 py-8 border-t border-gray-800">
        <h2 className="text-2xl font-bold text-green-400">Contribute a Sample</h2>
        <p className="text-gray-500 mt-2 max-w-3xl mx-auto">
          To add a new sample, create a new `.tsx` file in the `src/samples` directory. The manifest will be automatically updated during the next build.
        </p>
      </footer>
    </div>
  );
}
