import { createReader } from '@keystatic/core/reader';
import config from './keystatic.config.ts';
import fs from 'fs';
import path from 'path';

const reader = createReader(process.cwd(), config);

console.log('Testing Keystatic reader...');
console.log('CWD:', process.cwd());

// Check config paths
console.log('\nConfig collections:');
for (const [name, col] of Object.entries(config.collections || {})) {
  console.log(`  ${name}: path="${col.path}", slugField="${col.slugField}"`);
}

// Check if directory exists
const zajeciaPath = path.join(process.cwd(), 'content/zajecia');
console.log('\nChecking:', zajeciaPath);
console.log('Exists:', fs.existsSync(zajeciaPath));
if (fs.existsSync(zajeciaPath)) {
  console.log('Files:', fs.readdirSync(zajeciaPath));
}

try {
  const zajecia = await reader.collections.zajecia.list();
  console.log('\nZajecia from reader:', zajecia);
  
  if (zajecia.length > 0) {
    const first = await reader.collections.zajecia.read(zajecia[0]);
    console.log('First zajecia:', first);
  }
} catch (e) {
  console.error('Error:', e);
}
