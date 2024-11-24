import fs from 'fs';
import path from 'path';
import { parse } from './parser.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const run = () => {
  const filepath1 = process.argv[2];
  const filepath2 = process.argv[3];
  const formatName = process.argv[4] || 'stylish';

  const data1 = parse(fs.readFileSync(filepath1, 'utf-8'), path.extname(filepath1));
  const data2 = parse(fs.readFileSync(filepath2, 'utf-8'), path.extname(filepath2));

  const diff = buildDiff(data1, data2);
  const result = format(diff, formatName);
  console.log(result);
};

run();
