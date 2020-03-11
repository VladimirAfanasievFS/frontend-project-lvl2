import startGenDiff from '../src/index';

const pathFile1 = '__fixtures__/before';
const pathFile2 = '__fixtures__/after';
const resultTrue = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  + timeout: 20
  - timeout: 50
  + verbose: true
}`;
const resultTree = `{
    common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    + setting3: {
        key: value
      }
    - setting3: true
    + setting4: blah blah
    + setting5: {
        key5: value5
      }
      setting6: {
        key: value
      + ops: vops
      }
    }
    group1: {
    + baz: bars
    - baz: bas
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
    }
  - group2: {
      abc: 12345
    }
  + group3: {
      fee: 100500
    }
}`;
test('diffJson', () => {
  expect(startGenDiff(`${pathFile1}.json`, `${pathFile2}.json`)).toEqual(resultTrue);
});
test('diffYaml', () => {
  expect(startGenDiff(`${pathFile1}.yaml`, `${pathFile2}.yaml`)).toEqual(resultTrue);
});
test('diffIni', () => {
  expect(startGenDiff(`${pathFile1}.ini`, `${pathFile2}.ini`)).toEqual(resultTrue);
});
test('diffTreeJson', () => {
  expect(startGenDiff(`${pathFile1}Tree.json`, `${pathFile2}Tree.json`)).toEqual(resultTree);
});
// {
//   common: {
//     + follow: false
//       setting1: Value 1
//     - setting2: 200
//     - setting3: true
//     + setting3: {
//           key: value
//       }
//       setting6: {
//           key: value
//         + ops: vops
//       }
//     + setting4: blah blah
//     + setting5: {
//           key5: value5
//       }
//   }
//   group1: {
//     + baz: bars
//     - baz: bas
//       foo: bar
//     - nest: {
//           key: value
//       }
//     + nest: str
//   }
// - group2: {
//       abc: 12345
//   }
// + group3: {
//       fee: 100500
//   }
// }
