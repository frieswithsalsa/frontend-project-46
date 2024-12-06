#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const diff = genDiff(filepath1, filepath2);
      console.log(diff);
    } catch (error) {
      console.error(error.message);
    }
  });

program.parse();
