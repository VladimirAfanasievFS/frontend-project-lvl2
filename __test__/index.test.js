
import startGenDiff from '../src/index';
import readFileData from '../src/modules/readFileData';


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
  const result = readFileData(`__fixtures__/result${format}.txt`);
  expect(startGenDiff(`__fixtures__/before${extension}`, `__fixtures__/after${extension}`, format)).toEqual(result);
});
