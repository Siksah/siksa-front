import { test, expect } from 'vitest';
import { execSync } from 'child_process';

test('Main Page Visual Similarity > 80%', () => {
  // Runs the CLI command which returns exit code 1 if similarity < 80%
  try {
    execSync(
      'bun run scripts/figma/cli.ts visual --compare-figma --page=main',
      {
        stdio: 'inherit',
        encoding: 'utf-8',
      }
    );
  } catch (error) {
    throw new Error('Visual similarity is below 80%. Check logs for details.');
  }
});
