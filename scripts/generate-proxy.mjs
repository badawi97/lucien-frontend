import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { rm, unlink } from 'node:fs/promises';
import { get } from 'node:https';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';

const swaggerUrl = 'https://localhost:7086/swagger/v1/swagger.json';
const specPath = join(tmpdir(), 'lucien-openapi.json');
const outputPath = resolve('src', 'app', 'proxy');
const generatorCommand = process.platform === 'win32'
  ? resolve('node_modules', '.bin', 'openapi-generator-cli.cmd')
  : resolve('node_modules', '.bin', 'openapi-generator-cli');

async function downloadSpecification() {
  const response = await new Promise((resolve, reject) => {
    // This is intentionally limited to the local .NET development certificate.
    get(swaggerUrl, { rejectUnauthorized: false }, resolve).on('error', reject);
  });

  if (response.statusCode !== 200) {
    response.resume();
    throw new Error(`Swagger download failed with HTTP ${response.statusCode}.`);
  }

  await pipeline(response, createWriteStream(specPath));
}

async function generateProxy() {
  await rm(outputPath, { recursive: true, force: true });

  await new Promise((resolve, reject) => {
    const generator = spawn(generatorCommand, [
      'generate',
      '-i', specPath,
      '-g', 'typescript-angular',
      '-o', outputPath,
      '--additional-properties=providedInRoot=true,ngVersion=18.0.0,modelPropertyNaming=original',
    ], { stdio: 'inherit', shell: process.platform === 'win32' });

    generator.on('error', reject);
    generator.on('exit', (code) => {
      code === 0 ? resolve() : reject(new Error(`Proxy generation exited with code ${code}.`));
    });
  });
}

try {
  await downloadSpecification();
  await generateProxy();
} finally {
  await unlink(specPath).catch(() => undefined);
}
