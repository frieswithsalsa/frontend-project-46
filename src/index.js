import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = fs.readFileSync(
    path.resolve(process.cwd(), filepath1),
    'utf-8'
  );
  const data2 = fs.readFileSync(
    path.resolve(process.cwd(), filepath2),
    'utf-8'
  );

  const obj1 = parse(data1, path.extname(filepath1).slice(1));
  const obj2 = parse(data2, path.extname(filepath2).slice(1));

  const diff = buildDiff(obj1, obj2);
  return format(diff, formatName);
};

export default genDiff;
