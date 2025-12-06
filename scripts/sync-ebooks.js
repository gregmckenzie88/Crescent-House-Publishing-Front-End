const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const ARCHIVE_DIR = path.join(process.cwd(), '_archive');
const DATA_EBOOKS_DIR = path.join(process.cwd(), 'data', 'ebooks');
const PUBLIC_EBOOKS_DIR = path.join(process.cwd(), 'public', 'ebooks');
const IMAGE_QUALITY = 80;
const IMAGE_WIDTH = 800; // Reasonable width for covers

// Ensure directories exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function processEbook(slug) {
  console.log(`Processing: ${slug}`);
  const sourceDir = path.join(ARCHIVE_DIR, slug);
  const dataTargetDir = path.join(DATA_EBOOKS_DIR, slug);
  const publicTargetDir = path.join(PUBLIC_EBOOKS_DIR, slug);

  ensureDir(dataTargetDir);
  ensureDir(publicTargetDir);

  // 1. Process Metadata
  const metadataPath = path.join(sourceDir, 'metadata.json');
  if (fs.existsSync(metadataPath)) {
    try {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      
      // Check for sample chapter
      const sampleChapterSrc = path.join(sourceDir, 'sample_first_chapter.md');
      if (fs.existsSync(sampleChapterSrc)) {
        // Copy sample chapter
        fs.copyFileSync(sampleChapterSrc, path.join(dataTargetDir, 'sample-chapter.md'));
        metadata.sampleChapterPath = 'sample-chapter.md';
        console.log(`  - Sample chapter copied`);
      }

      // Write updated metadata
      fs.writeFileSync(path.join(dataTargetDir, 'metadata.json'), JSON.stringify(metadata, null, 2));
      console.log(`  - Metadata updated`);
    } catch (err) {
      console.error(`  ! Error processing metadata for ${slug}:`, err.message);
    }
  } else {
    console.warn(`  ! No metadata.json found for ${slug}`);
  }

  // 2. Process Images (Convert to WebP)
  const imageTypes = [
    { srcPattern: /^ebook_cover\.(jpg|jpeg|png)$/i, dest: 'compressed_ebook_cover.webp' },
    { srcPattern: /^audiobook_cover\.(jpg|jpeg|png)$/i, dest: 'compressed_audiobook_cover.webp' }
  ];

  const files = fs.readdirSync(sourceDir);

  for (const type of imageTypes) {
    const matchingFile = files.find(file => type.srcPattern.test(file));
    
    if (matchingFile) {
      const srcPath = path.join(sourceDir, matchingFile);
      const destPath = path.join(publicTargetDir, type.dest);
      
      try {
        await sharp(srcPath)
          .resize({ width: IMAGE_WIDTH, withoutEnlargement: true }) // Resize if too large
          .webp({ quality: IMAGE_QUALITY })
          .toFile(destPath);
          
        console.log(`  - Processed image: ${matchingFile} -> ${type.dest}`);
      } catch (err) {
        console.error(`  ! Error processing image ${matchingFile}:`, err.message);
      }
    }
  }
}

async function main() {
  if (!fs.existsSync(ARCHIVE_DIR)) {
    console.error(`Archive directory not found: ${ARCHIVE_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(ARCHIVE_DIR, { withFileTypes: true });
  const directories = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

  console.log(`Found ${directories.length} ebooks in archive.`);

  for (const slug of directories) {
    await processEbook(slug);
  }

  console.log('\nSync complete!');
}

main().catch(console.error);

