import { execSync } from 'child_process';
import * as path from 'path';

console.log('Starting TrikaKosh deterministic canonical corpus ingestion...');
try {
  execSync('python scripts/build_corpus.py', { stdio: 'inherit', cwd: process.cwd() });
  execSync('python scripts/generate_ontology.py', { stdio: 'inherit', cwd: process.cwd() });
  execSync('python scripts/generate_lexicon.py', { stdio: 'inherit', cwd: process.cwd() });
  execSync('python scripts/generate_curriculum_and_graph.py', { stdio: 'inherit', cwd: process.cwd() });
  execSync('npm run validate:graph', { stdio: 'inherit', cwd: process.cwd() });
  console.log('\n✅ Ingestion and graph validation completed successfully.');
} catch (error) {
  console.error('\n❌ Ingestion failed:', error);
  process.exit(1);
}
