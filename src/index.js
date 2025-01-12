import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const absolutePath = resolve(filepath);
  const content = readFileSync(absolutePath, 'utf-8');
  const extension = extname(filepath).slice(1);
  return parse(extension, content);
};

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diffTree = buildDiff(data1, data2);
  return format(diffTree, formatType);
};

export default genDiff;
