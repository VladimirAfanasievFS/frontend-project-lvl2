import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getAbsoluteFilePath = (fileName) => path.resolve(__dirname, '../__fixtures__/', fileName);
const getFileData = (fileName) => fs.readFileSync(getAbsoluteFilePath(fileName), 'utf-8');

const resultFileName = {
  json: 'result_json.json',
  plain: 'result_plain.txt',
  stylish: 'result_stylish.txt',
};
test.each([
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
])('Files: *%s Format: %s', (extension, format) => {
  const resultDifference = getFileData(resultFileName[format]);
  const filePath1 = getAbsoluteFilePath(`file1.${extension}`);
  const filePath2 = getAbsoluteFilePath(`file2.${extension}`);
  const difference = genDiff(filePath1, filePath2, format);
  expect(difference).toEqual(resultDifference);
});
