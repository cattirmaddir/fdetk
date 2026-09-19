import { spawnSync } from 'node:child_process';

const port = process.env.PORT || '5000';
process.env.PORT = port;

const isWin = process.platform === 'win32';
const buildCommand = isWin
  ? ['cmd', ['/d', '/s', '/c', 'pnpm run build:snorlax']]
  : ['sh', ['-lc', 'pnpm run build:snorlax']];

const build = spawnSync(buildCommand[0], buildCommand[1], {
  stdio: 'inherit',
  env: process.env,
});

if (build.error) {
  console.error('Failed to run build:', build.error);
  process.exit(1);
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const startCommand = isWin
  ? ['cmd', ['/d', '/s', '/c', 'pnpm --filter @workspace/api-server run start']]
  : ['sh', ['-lc', 'pnpm --filter @workspace/api-server run start']];

const start = spawnSync(startCommand[0], startCommand[1], {
  stdio: 'inherit',
  env: process.env,
});

if (start.error) {
  console.error('Failed to start server:', start.error);
  process.exit(1);
}

process.exit(start.status ?? 0);
