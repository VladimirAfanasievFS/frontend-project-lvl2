import _ from 'lodash';

const getStatusKey = (valueUniq, value1, value2) => {
  const equalWithValue1 = valueUniq === value1;
  const equalWithValue2 = valueUniq === value2;

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
  return { statusKey: 'error' };
};
const getDiff = (objFile1 = {}, objFile2 = {}) => {
  const keyValue1 = _.isPlainObject(objFile1) ? Object.entries(objFile1) : objFile1;
  const keyValue2 = _.isPlainObject(objFile2) ? Object.entries(objFile2) : objFile2;

  const keyValueUnionUniq = _.unionWith(keyValue1, keyValue2, _.isEqual).sort();
  // console.table(keyValueUnionUniq);

  const convertToAst = keyValueUnionUniq.reduce((acc, keyValueUniq) => {
    const [key, value] = keyValueUniq;
    if (_.isPlainObject(value)) {
      const hasInTwoObject = _.has(objFile1, key) && _.has(objFile2, key);
      const statusKey = getStatusKeyNode(value, objFile1[key], objFile2[key], hasInTwoObject);
      const resultValue = getDiff(objFile1[key], objFile2[key]);

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
  const AST = getDiff(objFile1, objFile2);
  // console.log(ploskAST);
  // console.table(AST);
  // console.table(AST[1].value[3].value);
  // console.table(AST[1].value);
  // console.table(AST[5].value[2].value);
  // console.table(AST[6].value[3].value);
  // console.table(AST[5].user);
  // console.table(AST[7].vasa);
  // console.table(AST[4].user[1]);

  // console.log(result);
  return AST;
};

export default genDiff;
