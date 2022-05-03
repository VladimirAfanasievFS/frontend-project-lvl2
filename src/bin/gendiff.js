#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.02.1', '-V, --version', 'output the current version')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((pathToFile1, pathToFile2) => {
    console.log(genDiff(pathToFile1, pathToFile2, program.format));
  });
program.parse(process.argv);
