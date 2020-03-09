import startGenDiff from '../src';

const obj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
test('startGenDiff', () => {
  expect(startGenDiff('before.json', 'after.json')).toEqual(`- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
+ timeout: 20
- timeout: 50
+ verbose: true`);
});
