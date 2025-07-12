
import fs from 'fs/promises';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const MAX_CONCURRENT = 100;
let active = 0;
let queue = [];

async function limitedReadFile(filename, callback) {
  if (active < MAX_CONCURRENT) {
    active++;
    try {
      const data = await fs.readFile(filename);
      callback(null, data);
    } catch (err) {
      callback(err);
    }
    active--;
    if (queue.length > 0) {
      const next = queue.shift();
      next();
    }
  } else {
    queue.push(() => limitedReadFile(filename, callback));
  }
}

// Usage:
async function main() {
  const dir = "./test-files/"; // Change to your directory
  if (!existsSync(dir)) {
    mkdirSync(dir);
    console.log(`Directory '${dir}' created. Please add files to it and rerun the script.`);
    return;
  }
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filename = path.join(dir, file);
    limitedReadFile(filename, (err, data) => {
      if (err) console.error(err);
      else console.log(filename, data.length);
    });
  }
}

main();
