import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getAbsoluteFilePath = (fileName) => path.resolve(__dirname, '../__fixtures__/', fileName);
const getFileData = (fileName) => fs.readFileSync(getAbsoluteFilePath(fileName), 'utf-8');

test.each([
  ['json', 'tree'],
  ['yaml', 'tree'],
  ['ini', 'tree'],
  ['json', 'plain'],
  ['yaml', 'plain'],
  ['ini', 'plain'],
  ['json', 'JSON'],
  ['yaml', 'JSON'],
// ['.ini', 'JSON'],
])('Files: *%s Format: %s', (extension, format) => {
  const resultDifference = getFileData(`result${format}.txt`);
  const filePath1 = getAbsoluteFilePath(`before.${extension}`);
  const filePath2 = getAbsoluteFilePath(`after.${extension}`);
  const difference = genDiff(filePath1, filePath2, format);
  expect(difference).toEqual(resultDifference);
});
