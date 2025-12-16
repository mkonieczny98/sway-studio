import fs from 'node:fs';
import path from 'node:path';
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

function resolveProjectRoot() {
	const cwd = process.cwd();
	if (fs.existsSync(path.join(cwd, 'content'))) return cwd;
	const nested = path.join(cwd, 'sway-nextjs');
	if (fs.existsSync(path.join(nested, 'content'))) return nested;
	return cwd;
}

const projectRoot = resolveProjectRoot();

export const { POST, GET } = makeRouteHandler({ config, localBaseDirectory: projectRoot });
