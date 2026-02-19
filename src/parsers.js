import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

const parseFile = (filepath) => {
  const absolutePath = resolve(process.cwd(), filepath);
  const extension = extname(filepath).toLowerCase();
  const content = readFileSync(absolutePath, 'utf-8');

  if (!parsers[extension]) {
    throw new Error(`Unsupported format: ${extension}`);
  }

  return parsers[extension](content);
};

export default parseFile;