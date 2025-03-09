const https = require('https');
const zlib = require('zlib');
const path = require('path');
const fs = require('fs/promises');

const operatingSystem = process.platform;
const architecture = process.arch;

const packageJson = require('./package.json');
const version = packageJson.version;

const suffix = process.platform === 'win32' ? '.exe' : '';

const BIN = 'substrait-viz';
const BIN_PATH = path.join(__dirname, BIN + suffix);

const archOs2Url = {
  darwin: {
    x64: `https://github.com/gabotechs/${BIN}/releases/download/v${version}/${BIN}_Darwin_x86_64.tar.gz`,
    arm64: `https://github.com/gabotechs/${BIN}/releases/download/v${version}/${BIN}_Darwin_arm64.tar.gz`,
  },
  linux: {
    x64: `https://github.com/gabotechs/${BIN}/releases/download/v${version}/${BIN}_Linux_x86_64.tar.gz`,
    arm64: `https://github.com/gabotechs/${BIN}/releases/download/v${version}/${BIN}_Linux_arm64.tar.gz`,
  },
  win32: {
    x64: `https://github.com/gabotechs/${BIN}/releases/download/v${version}/${BIN}_Windows_x86_64.tar.gz`,
    arm64: `https://github.com/gabotechs/${BIN}/releases/download/v${version}/${BIN}_Windows_arm64.tar.gz`,
  },
};

/**
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        if (
          (res.statusCode === 301 || res.statusCode === 302) &&
          res.headers.location
        )
          return fetch(res.headers.location).then(resolve, reject);
        if (res.statusCode !== 200)
          return reject(new Error(`Server responded with ${res.statusCode}`));
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

/**
 * @param {Buffer} buffer
 * @param {string} subpath
 * @returns {Buffer}
 */
function extractFileFromTarGzip(buffer, subpath) {
  try {
    buffer = zlib.unzipSync(buffer);
  } catch (err) {
    throw new Error(
      `Invalid gzip data in archive: ${(err && err.message) || err}`,
    );
  }
  let str = (i, n) =>
    String.fromCharCode(...buffer.subarray(i, i + n)).replace(/\0.*$/, '');
  let offset = 0;
  while (offset < buffer.length) {
    let name = str(offset, 100);
    let size = parseInt(str(offset + 124, 12), 8);
    offset += 512;
    if (!isNaN(size)) {
      if (name === subpath) return buffer.subarray(offset, offset + size);
      offset += (size + 511) & ~511;
    }
  }
  throw new Error(`Could not find ${JSON.stringify(subpath)} in archive`);
}

async function install() {
  const releasedTarUrl = archOs2Url[operatingSystem]?.[architecture];

  if (releasedTarUrl === undefined) {
    console.error(`${operatingSystem}-${architecture} is not supported`);
    process.exit(1);
  }

  console.log(`Downloading ${BIN} release from`, releasedTarUrl);
  let binBuffer = await fetch(releasedTarUrl);
  console.log(`Extracting ${binBuffer.length} bytes into`, BIN + suffix);
  binBuffer = extractFileFromTarGzip(binBuffer, BIN + suffix);
  await fs.writeFile(BIN_PATH, binBuffer);
  await fs.chmod(BIN_PATH, 0o755);
  process.exit(0);
}

install().catch(err => {
  console.error(err);
  process.exit(1);
});
