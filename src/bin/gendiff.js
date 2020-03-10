#!/usr/bin/env node
import program from 'commander';
import startGenDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.02.1', '-V, --version', 'output the current version')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const firstConfigValue = firstConfig;
    const secondConfigValue = secondConfig;
    console.log(startGenDiff(firstConfigValue, secondConfigValue));
  });
program.parse(process.argv);

if (program.format) console.log(`- ${program.format}`);

// const obj1 = '__fixtures__/beforeTree.json';
// const obj2 = '__fixtures__/afterTree.json';

// startGenDiff(obj1, obj2);
