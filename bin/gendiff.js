#!/usr/bin/env node
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';
import { Command } from 'commander';
const program = new Command();
import process from 'process';

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
;