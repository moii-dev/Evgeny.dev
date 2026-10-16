import { rm } from 'node:fs/promises';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'dist');
if (target !== root + sep + 'dist') throw new Error('Refusing to clean an unexpected path.');
await rm(target, { recursive: true, force: true });
