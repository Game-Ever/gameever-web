// Build stamp shown in the footer so every preview can be identified: version · commit · date.
// The version comes from package.json; bump it on each design round.
import { execSync } from 'node:child_process';
import pkg from '../../package.json';

const commit = (() => {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  try { return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; }
})();

export const BUILD = {
  version: pkg.version,
  commit: commit.slice(0, 7),
  date: new Date().toISOString().slice(0, 10),
};
