import fs from 'fs/promises';
import path from 'path';
import { DashboardContainer } from '@/components/dashboard-container';

// Represents the basic data for a sample page, read from the manifest.
interface PageManifest {
  id: string;
  route: string;
  title: string;
  summary: string;
  tags: string[];
}

// Represents the full, combined data for a sample, including detailed content.
export interface SampleData extends PageManifest {
  details: string;
}

// Fetches data from both the manifest and the details file and merges them.
async function getSampleData(): Promise<SampleData[]> {
  const manifestPath = path.join(process.cwd(), 'public/pages.manifest.json');
  const detailsPath = path.join(process.cwd(), 'public/workstation-details.json');

  try {
    const [manifestJson, detailsJson] = await Promise.all([
      fs.readFile(manifestPath, 'utf-8'),
      fs.readFile(detailsPath, 'utf-8'),
    ]);

    const manifest: PageManifest[] = JSON.parse(manifestJson);
    const details: Record<string, string> = JSON.parse(detailsJson);

    // Merge the manifest data with the detailed descriptions.
    const combinedData = manifest.map((sample) => ({
      ...sample,
      details: details[sample.id] || 'No details available.',
    }));

    return combinedData;
  } catch (error) {
    // If any file doesn't exist or there's an error, return an empty array.
    // This prevents the page from crashing if data files haven't been generated.
    console.error("Could not read sample data files:", error);
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
