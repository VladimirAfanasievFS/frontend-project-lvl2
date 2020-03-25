import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const absolutePathFile = (fileName) => path.resolve(__dirname, '../__fixtures__/', fileName);
const dataFile = (fileName) => fs.readFileSync(absolutePathFile(fileName), 'utf-8');

test.each([
  ['.json', 'tree'],
  ['.yaml', 'tree'],
  ['.ini', 'tree'],
  ['.json', 'plain'],
  ['.yaml', 'plain'],
  ['.ini', 'plain'],
  ['.json', 'JSON'],
  ['.yaml', 'JSON'],
// ['.ini', 'JSON'],
])('Files: *%s Format: %s', (extension, format) => {
  const resultDifference = dataFile(`result${format}.txt`);
  const pathFile1 = absolutePathFile(`before${extension}`);
  const pathFile2 = absolutePathFile(`after${extension}`);
  const difference = genDiff(pathFile1, pathFile2, format);
  expect(difference).toEqual(resultDifference);
});
