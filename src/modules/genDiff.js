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

const getDiff = (structuredData1 = {}, structuredData2 = {}) => {
  const keysValuesData1 = _.isPlainObject(structuredData1)
    ? Object.entries(structuredData1)
    : structuredData1;

  const keysValuesData2 = _.isPlainObject(structuredData2)
    ? Object.entries(structuredData2)
    : structuredData2;

  const keysValuesUniq = _.unionWith(keysValuesData1, keysValuesData2, _.isEqual).sort();

  const convertToAst = keysValuesUniq.reduce((acc, keyValueUniq) => {
    const [key, value] = keyValueUniq;
    if (_.isPlainObject(value)) {
      const hasInTwoObject = _.has(structuredData1, key) && _.has(structuredData2, key);
      const statusKey = getStatusKeyNode(value, structuredData1[key],
        structuredData2[key], hasInTwoObject);
      const resultValue = getDiff(structuredData1[key], structuredData2[key]);

      const resultPresentation = {
        key,
        value: resultValue,
        ...statusKey,
      };
      return [...acc, resultPresentation];
    }

    const statusKey = getStatusKey(value, structuredData1[key], structuredData2[key]);
    const resultPresentation = {
      key, value, ...statusKey,
    };
    return [...acc, resultPresentation];
  }, []);
  const result = _.uniqWith(convertToAst, _.isEqual);
  return result;
};


const generateDiffAST = (structuredData1, structuredData2) => {
  const AST = getDiff(structuredData1, structuredData2);
  // console.log(JSON.stringify(AST));
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

export default generateDiffAST;
