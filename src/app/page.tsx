import fs from 'fs/promises';
import path from 'path';
import { DashboardContainer } from '@/components/dashboard-container';

export interface PageManifest {
  id: string;
  route: string;
  title: string;
  summary: string;
  tags: string[];
}

async function getSampleData(): Promise<PageManifest[]> {
  const manifestPath = path.join(process.cwd(), 'public/pages.manifest.json');
  try {
    const manifestJson = await fs.readFile(manifestPath, 'utf-8');
    return JSON.parse(manifestJson);
  } catch (error) {
    // If the file doesn't exist or there's an error, return an empty array.
    // This prevents the page from crashing if the manifest hasn't been generated.
    console.error("Could not read pages.manifest.json:", error);
    return [];
  }
}

export default async function Home() {
  const samples = await getSampleData();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <DashboardContainer samples={samples} />
    </main>
  );
}
