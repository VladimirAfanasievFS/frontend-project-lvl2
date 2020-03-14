
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

// test('diffJson', () => {
  
//   expect(startGenDiff(`${pathFile1}.json`, `${pathFile2}.json`, 'tree')).toEqual(resultTree);
// });
// test('diffYaml', () => {
//   expect(startGenDiff(`${pathFile1}.yaml`, `${pathFile2}.yaml`, 'tree')).toEqual(resultTree);
// });
// test('diffIni', () => {
//   expect(startGenDiff(`${pathFile1}.ini`, `${pathFile2}.ini`, 'tree')).toEqual(resultTree);
// });

// test('diffJsonPlain', () => {
//   expect(startGenDiff(`${pathFile1}.json`, `${pathFile2}.json`, 'plain')).toEqual(resultPlain);
// });
// test('diffJsonJSON', () => {
//   expect(startGenDiff(`${pathFile1}.json`, `${pathFile2}.json`, 'JSON')).toEqual(resultJSON);
// });
