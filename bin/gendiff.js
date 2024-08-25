#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from "../src/index.js";

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]',  'output format')
  .action((filepath1, filepath2, options) => {
    const diff = gendiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

program.parse();

