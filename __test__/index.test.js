
import startGenDiff from '../src/index';
import readFileData from '../src/modules/readFileData';

const pathFile1 = '__fixtures__/before';
const pathFile2 = '__fixtures__/after';
const resultTree = readFileData('__fixtures__/resultTree.txt');
const resultPlain = readFileData('__fixtures__/resultPlain.txt');

test('diffJson', () => {
  expect(startGenDiff(`${pathFile1}.json`, `${pathFile2}.json`, 'tree')).toEqual(resultTree);
});
test('diffYaml', () => {
  expect(startGenDiff(`${pathFile1}.yaml`, `${pathFile2}.yaml`, 'tree')).toEqual(resultTree);
});
test('diffIni', () => {
  expect(startGenDiff(`${pathFile1}.ini`, `${pathFile2}.ini`, 'tree')).toEqual(resultTree);
});

test('diffJsonPlain', () => {
  expect(startGenDiff(`${pathFile1}.json`, `${pathFile2}.json`, 'plain')).toEqual(resultPlain);
});
