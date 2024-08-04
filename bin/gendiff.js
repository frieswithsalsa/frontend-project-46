#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const path = require('node:path');
const parse = require('../src/file-parser')


const program = new Command();


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const data1 = fs.readFileSync(absolutePath1);
    const data2 = fs.readFileSync(absolutePath2);

    const parsedData1 = parse(data1, path.extname(filepath1))
    const parsedData2 = parse(data2, path.extname(filepath2))

  });


program.parse(process.argv)


const options = program.opts();
if (options.format) console.log(options);
