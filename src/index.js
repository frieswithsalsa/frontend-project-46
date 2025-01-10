import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import formatter from './formatters/index.js';

const readFile = (filepath) => {
  const currentDir = cwd();
  const absolutePath = resolve(currentDir, filepath);
  const content = readFileSync(absolutePath, 'utf-8');
  return content;
};

const getExtension = (file) => extname(file).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parse(getExtension(filepath1), readFile(filepath1));
  const file2 = parse(getExtension(filepath2), readFile(filepath2));
  const diffTree = buildDiff(file1, file2);
  return formatter(diffTree, format);
};

export default genDiff;
