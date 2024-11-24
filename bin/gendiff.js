#!/usr/bin/env node
import { Command } from 'commander';
import showDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff', '<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const result = showDiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  });

program.parse();
