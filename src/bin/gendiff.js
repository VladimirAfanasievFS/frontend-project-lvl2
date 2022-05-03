#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

let pathToFile1;
let pathToFile2;

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.02.1', '-V, --version', 'output the current version')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((argPathToFile1, argPathToFile2) => {
    pathToFile1 = argPathToFile1;
    pathToFile2 = argPathToFile2;
    console.log(genDiff(pathToFile1, pathToFile2, program.format));
  });
program.parse(process.argv);
