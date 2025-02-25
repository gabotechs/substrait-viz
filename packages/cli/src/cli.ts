#!/usr/bin/env node
const fs = require('fs/promises');
const os = require('os');
const childProcess = require('child_process');
const path = require('path');

async function main() {
  const content = await fs.readFile(path.join(__dirname, './index.html'));
  let html = content.toString();

  let data = '';

  for await (const chunk of process.stdin) {
    data += chunk;
  }

  html = html.replace(
    '__substrait_plan:""',
    `__substrait_plan:${JSON.stringify(data)}`,
  );

  await fs.writeFile('/tmp/index.html', html);

  openInBrowser('/tmp/index.html');
}

function openInBrowser(url: string) {
  let command;

  switch (os.platform()) {
    case 'linux':
      command = `xdg-open "${url}"`;
      break;
    case 'win32':
      command = `rundll32 url.dll,FileProtocolHandler "${url}"`;
      break;
    case 'darwin':
      command = `open "${url}"`;
      break;
    default:
      throw new Error(`Unsupported platform '${os.platform()}'`);
  }

  return childProcess.execSync(command);
}

main();
