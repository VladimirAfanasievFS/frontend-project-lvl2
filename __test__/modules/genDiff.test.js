import GenDiff from '../../src/modules/genDiff.js';

const obj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const obj2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};
test('startGenDiff', () => {
  expect(GenDiff(obj1, obj2)).toEqual(`- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
+ timeout: 20
- timeout: 50
+ verbose: true`);
});
