#!/usr/bin/env node
import program from "commander";

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.02.1', '-V, --version', 'output the current version')
  .option('-f, --format [type]', 'output format', 'defaultValue')
  .arguments('<firstConfig> <secondConfig>')
  .action(function (firstConfig, secondConfig) {
    const firstConfigValue = firstConfig;
    const secondConfigValue = secondConfig;
    console.log(firstConfigValue, secondConfigValue);
  });
program.parse(process.argv);

if (program.format) console.log(`- ${program.format}`);

