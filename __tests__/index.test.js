import path from 'path';
import fs from 'fs';
import startGenDiff from '../dist';

const absolutePathFile = (fileName) => path.resolve(__dirname,'../__fixtures__/', fileName);
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
  const result = dataFile(`result${format}.txt`);
  expect(startGenDiff(absolutePathFile(`before${extension}`), absolutePathFile(`after${extension}`), format)).toEqual(result);
});
