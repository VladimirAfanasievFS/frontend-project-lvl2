#!/usr/bin/env node
import program from 'commander';
import startGenDiff from '..';

let pathToFile1;
let pathToFile2;

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.02.1', '-V, --version', 'output the current version')
  .option('-f, --format [type]', 'output format', 'plain')
  .arguments('<firstConfig> <secondConfig>')
  .action((argPathToFile1, argPathToFile2) => {
    pathToFile1 = argPathToFile1;
    pathToFile2 = argPathToFile2;
  });
program.parse(process.argv);

if (program.format) console.log(startGenDiff(pathToFile1, pathToFile2, program.format));
