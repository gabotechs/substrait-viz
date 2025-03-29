#!/usr/bin/env node

const path = require('path')
const child_process = require('child_process')

try {
  child_process.execFileSync(
    path.join(__dirname, "substrait-viz"),
    process.argv.slice(2),
    { stdio: "inherit" }
  );
} catch (e) {
  if (e && e.status) process.exit(e.status);
  throw e;
}
