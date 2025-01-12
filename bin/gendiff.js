#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .action((filePath1, filePath2, option) => {
    console.log(genDiff(filePath1, filePath2, option.format));
  });

program.parse();
