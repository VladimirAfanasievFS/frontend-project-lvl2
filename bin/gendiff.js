#!/usr/bin/env node
import program from "commander";

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.02.1', '-V, --version', 'output the current version')

 program.parse(process.argv);

 