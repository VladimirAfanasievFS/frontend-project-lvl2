import GenDiff from '../../src/modules/genDiff.js';

const obj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
  user: {
    name: 'Vova',
    age: 29,
    const: {
      a: '`1`',
      b: '`2`',
    },
  },
  vasa: {
    ddd: 33,
  },
};
const obj2 = {
  verbose: true,
  host: 'hexlet.io',
  user: {
    name: 'Vova',
    age: 30,
    wife: 'Irina',
    const: {
      d: '1',
      c: '2',
    },
  },
  timeout: 20,
};
test('startGenDiff', () => {
   expect(GenDiff(obj1, obj2)).toEqual(``);
//   expect(GenDiff(obj1, obj2)).toEqual(`{
// - follow: false
//   host: hexlet.io
// - proxy: 123.234.53.22
// + timeout: 20
// - timeout: 50
//   user: {
//     name: Vova
//     const: {
//       - a: '1'
//       - b: '2'
//       + d: '1'
//       + c: '2'
//     }
// - vasa: {
//   ddd: 33
// }
// }
// + verbose: true
// }`);
});
