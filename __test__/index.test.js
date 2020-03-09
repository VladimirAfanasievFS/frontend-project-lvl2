import startGenDiff from '../src';

const pathFile1 = '__fixtures__/before';
const pathFile2 = '__fixtures__/after';
const resultTrue = `- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
+ timeout: 20
- timeout: 50
+ verbose: true`;

test('diffJson', () => {
  expect(startGenDiff(`${pathFile1}.json`, `${pathFile2}.json`)).toEqual(resultTrue);
});
test('diffYaml', () => {
  expect(startGenDiff(`${pathFile1}.yaml`, `${pathFile2}.yaml`)).toEqual(resultTrue);
});
test('diffIni', () => {
  expect(startGenDiff(`${pathFile1}.ini`, `${pathFile2}.ini`)).toEqual(resultTrue);
});
