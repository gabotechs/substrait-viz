import { promises as fs } from 'fs';
import path from 'path';
import semver from 'semver';

async function findPackageJsonFiles(dir) {
  let results = [];
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory() && file.name !== 'node_modules') {
      results = results.concat(await findPackageJsonFiles(fullPath));
    } else if (file.name === 'package.json') {
      results.push(fullPath);
    }
  }
  return results;
}

async function bumpPatchVersion(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(content);

    if (json.version) {
      const oldVersion = json.version;
      json.version = semver.inc(json.version, 'patch');

      if (json.version) {
        await fs.writeFile(filePath, JSON.stringify(json, null, 2) + '\n');
        console.log(`Updated ${filePath}: ${oldVersion} -> ${json.version}`);
      } else {
        console.warn(`Invalid version found in ${filePath}: ${oldVersion}`);
        return;
      }

      // If a dependency says something like "workspace:x.y.z", it will also
      // be bumped to "workspace:x.y.(z+1)"
      for (const depEntry of ['optionalDependencies', 'devDependencies', 'dependencies']) {
        for (const [dep, version] of Object.entries(json[depEntry] ?? {})) {
          if (!version.startsWith('workspace:')) continue;
          const versionNumber = version.slice('workspace:'.length);
          if (versionNumber.length > 2) {
            const newVersion = `workspace:${json.version}`;
            console.log(`Updating ${depEntry} ${dep} from ${version} to ${newVersion}`)
            json[depEntry][dep] = newVersion
          }
        }
      }
    } else {
      console.warn(`No version field found in ${filePath}`);
    }
  } catch (error) {
    console.error(`Failed to update ${filePath}:`, error);
  }
}

async function main() {
  const rootDir = process.cwd();
  console.log(`Searching for package.json files in ${rootDir}...`);

  const packageJsonFiles = await findPackageJsonFiles(rootDir);
  console.log(`Found ${packageJsonFiles.length} package.json files.`);

  for (const file of packageJsonFiles) {
    await bumpPatchVersion(file);
  }
  console.log('Version bump complete!');
}

main().catch(console.error);
