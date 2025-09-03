const fs = require('fs').promises;
const path = require('path');

const SAMPLES_DIR = path.join(process.cwd(), 'src/samples');
const MANIFEST_OUTPUT_PATH = path.join(process.cwd(), 'public/pages.manifest.json');

function formatTitle(id) {
  return id
    .split('-')
    .map(word => {
      if (word.toUpperCase() === 'ROKAF') return 'ROKAF';
      if (word.toUpperCase() === 'AI') return 'AI';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

async function generateManifest() {
  try {
    const files = await fs.readdir(SAMPLES_DIR);
    const manifest = [];

    for (const file of files) {
      if (file.endsWith('.tsx')) {
        const id = file.replace(/\.tsx$/, '');
        const title = formatTitle(id);
        const summary = `An interactive demonstration of the ${title} interface.`;

        manifest.push({
          id,
          route: `/samples/${id}`,
          title,
          summary,
          tags: [],
        });
      }
    }

    await fs.mkdir(path.dirname(MANIFEST_OUTPUT_PATH), { recursive: true });
    await fs.writeFile(MANIFEST_OUTPUT_PATH, JSON.stringify(manifest, null, 2));
    console.log(`✅ Manifest generated successfully at ${MANIFEST_OUTPUT_PATH}`);
  } catch (error) {
    console.error('❌ Error generating manifest:', error);
    process.exit(1);
  }
}

generateManifest();
