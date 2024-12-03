#!/usr/bin/env node
const genDiff = require('../src/index.js');
const parseFile = require('../src/parsers.js');
const { Command } = require('commander');
const program = new Command();


program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format' )
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        try {
            const file1Data = parseFile(filepath1);
            const file2Data = parseFile(filepath2);
            const diff = genDiff(file1Data, file2Data)
            console.log(diff)
    } catch (error) {
      console.error(error.message);  
    }
  });

program.parse(process.argv);