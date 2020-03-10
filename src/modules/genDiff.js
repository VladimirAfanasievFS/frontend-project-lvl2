import _ from 'lodash';


const statusKeyFUNC = {
  notChange: (el) => `  ${el.key}: ${el.value}\n`,
  remove: (el) => `- ${el.key}: ${el.value}\n`,
  add: (el) => `+ ${el.key}: ${el.value}\n`,
};

const myStringify = (obj) => {
  const arr = _.keys(obj).map((el) => `${el}: ${obj[el]}`);
  return arr.join('');
};
const render = (AST, level = 1) => {
  // console.log(AST);
  // console.table(AST);
  const result = AST.reduce((acc, child) => {
    // console.log('el   ', el)
    if (_.isArray(child.value)) {
      // console.log('el.value   ', el.value);
      const childRender = render(child.value, level + 1).map((el) => `${' '.repeat(level)}${el}`).join('');
      return [...acc, `${'  '.repeat(level)}${child.key}: {\n${childRender}}\n`];
    }
    if (_.isObject(child.value)) {
      return [...acc, `${child.key} {\n${myStringify(child.value)}\n}`];
    }
    //  console.log('elafter   ', el);
    return [...acc, `${''.repeat(level)}${statusKeyFUNC[child.statusKey](child)}`];
  }, []);
  // console.log('result  ', result);
  return result;
};

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

const getDiff = (objFile1 = {}, objFile2 = {}) => {
  const keyValue1 = Object.entries(objFile1);
  const keyValue2 = Object.entries(objFile2);
  // console.table(keyValue1);
  // console.table(keyValue2);

  const keyValueUnionUniq = _.unionWith(keyValue1, keyValue2, _.isEqual).sort();
  // console.table(keyValueUnionUniq);

  const result = keyValueUnionUniq.reduce((acc, keyValueUniq) => {
    const [key, value] = keyValueUniq;
    if (_.isPlainObject(value)) {
      const hasInTwoObject = _.has(objFile1, key) && _.has(objFile2, key);
      const statusKey = hasInTwoObject ? { statusKey: 'notChange' } : getStatusKey(value, objFile1[key], objFile2[key]);
      const resultValue = hasInTwoObject ? getDiff(objFile1[key], objFile2[key]) : (objFile1[key] || objFile2[key]);
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
  return result;
};


const genDiff = (objFile1, objFile2) => {
  const ploskAST = getDiff(objFile1, objFile2);
  console.table(ploskAST);
  console.table(ploskAST[1].value);
  // console.table(ploskAST[3].user[1]);
  // console.table(ploskAST[4].user[0]);
  // console.table(ploskAST[4].user[1]);
  return `{\n${_.flattenDeep(render(ploskAST)).join('').trimRight()}\n}`;
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
