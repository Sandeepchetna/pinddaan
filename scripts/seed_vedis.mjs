import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to database and reading SACRED_VEDIS_MASTER...");
  
  // Read SACRED_VEDIS_MASTER from src/data/sacredVedisData.ts
  const dataPath = path.join(__dirname, '..', 'src', 'data', 'sacredVedisData.ts');
  const content = fs.readFileSync(dataPath, 'utf-8');
  
  // Parse all objects from the file
  const regex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?slug:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?hindiName:\s*['"]([^'"]+)['"][\s\S]*?tagline:\s*['"]([^'"]+)['"][\s\S]*?category:\s*['"]([^'"]+)['"][\s\S]*?location:\s*['"]([^'"]+)['"][\s\S]*?description:\s*['"]([^'"]+)['"][\s\S]*?history:\s*['"]([^'"]+)['"][\s\S]*?timings:\s*['"]([^'"]+)['"][\s\S]*?visitorInfo:\s*['"]([^'"]+)['"][\s\S]*?heroImage:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
  
  let match;
  let count = 0;
  
  while ((match = regex.exec(content)) !== null) {
    const [_, id, slug, name, hindiName, tagline, category, location, description, history, timings, visitorInfo, heroImage] = match;
    
    await prisma.sacredPlace.upsert({
      where: { slug },
      update: {
        name,
        hindiName,
        tagline,
        description,
        history,
        timings,
        visitorInfo: `${category} • ${location} • ${visitorInfo}`,
        heroImage
      },
      create: {
        slug,
        name,
        hindiName,
        tagline,
        description,
        history,
        timings,
        visitorInfo: `${category} • ${location} • ${visitorInfo}`,
        heroImage
      }
    });
    count++;
    console.log(`Seeded [${count}]: ${name} (${hindiName})`);
  }
  
  console.log(`\nSuccessfully seeded ${count} sacred places & vedis into MySQL database!`);
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
