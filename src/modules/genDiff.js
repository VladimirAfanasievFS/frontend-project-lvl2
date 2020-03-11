import _ from 'lodash';
import render from './render.js';

const getStatusKey = (valueUniq, value1, value2) => {
  // console.log(valueUniq);
  // console.log(value1);
  // console.log(value2);
  const equalWithValue1 = valueUniq === value1;
  const equalWithValue2 = valueUniq === value2;
  // console.log(equalWithValue1);
  // console.log(equalWithValue2);
  if (equalWithValue1 && equalWithValue2) {
    return { statusKey: 'notChange' };
  }
  if (equalWithValue1) {
    return { statusKey: 'remove' };
  }
  if (equalWithValue2) {
    return { statusKey: 'add' };
  }
  return { statusKey: 'error' };
};
const getStatusKeyNode = (valueUniq, value1, value2) => {
  if (_.isObject(valueUniq) && _.isObject(value1) && _.isObject(value2)) {
    return { statusKey: 'notChange' };
  }
  const equalWithValue1 = valueUniq === value1;
  const equalWithValue2 = valueUniq === value2;
  if (equalWithValue1) {
    return { statusKey: 'remove' };
  }
  if (equalWithValue2) {
    return { statusKey: 'add' };
  }
};
const getDiff = (objFile1 = {}, objFile2 = {}) => {
  const keyValue1 = Object.entries(objFile1);
  const keyValue2 = Object.entries(objFile2);
  // console.table(keyValue1);
  // console.table(keyValue2);

  const keyValueUnionUniq = _.unionWith(keyValue1, keyValue2, _.isEqual).sort();
  // console.table(keyValueUnionUniq);

  const convertToAst = keyValueUnionUniq.reduce((acc, keyValueUniq) => {
    const [key, value] = keyValueUniq;
    if (_.isPlainObject(value)) {
      const hasInTwoObject = _.has(objFile1, key) && _.has(objFile2, key);
      const statusKey = getStatusKeyNode(value, objFile1[key], objFile2[key], hasInTwoObject);
      const resultValue = hasInTwoObject
        ? getDiff(objFile1[key], objFile2[key])
        : (objFile1[key] || objFile2[key]);

      const resultPresentation = {
        key,
        value: resultValue,
        ...statusKey,
      };
      return [...acc, resultPresentation];
    }
    const statusKey = getStatusKey(value, objFile1[key], objFile2[key]);
    const resultPresentation = {
      key, value, ...statusKey,
    };
    return [...acc, resultPresentation];
  }, []);
  const result = _.uniqWith(convertToAst, _.isEqual);
  return result;
};


const genDiff = (objFile1, objFile2) => {
  const ploskAST = getDiff(objFile1, objFile2);
  // console.log(ploskAST);
  console.table(ploskAST);
  console.table(ploskAST[0].value);
  console.table(ploskAST[1].value);
  // console.table(ploskAST[5].value[2].value);
  // console.table(ploskAST[6].value[3].value);
  // console.table(ploskAST[5].user);
  // console.table(ploskAST[7].vasa);
  // console.table(ploskAST[4].user[1]);
  const result = `{${_.flattenDeep(render(ploskAST)).join('').trimRight()}\n}`;
  console.log(result);
  return result;
};

export default genDiff;

// {
//   host: hexlet.io
// + timeout: 20
// - timeout: 50
// - proxy: 123.234.53.22
// + verbose: true
// - follow: false
// }
