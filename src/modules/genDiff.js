import _ from 'lodash';

const getStatusKey = (valueUniq, value1, value2) => {
  const uniqEqualValue1 = valueUniq === value1;
  const uniqEqualValue2 = valueUniq === value2;

  if (uniqEqualValue1 && uniqEqualValue2) {
    return { statusKey: 'notChange' };
  }
  if (uniqEqualValue1) {
    return { statusKey: 'remove' };
  }
  if (uniqEqualValue2) {
    return { statusKey: 'add' };
  }
  return { statusKey: 'error' };
};

const getStatusKeyNode = (valueUniq, value1, value2) => {
  if (_.isObject(valueUniq) && _.isObject(value1) && _.isObject(value2)) {
    return { statusKey: 'notChange' };
  }
  const uniqEqualValue1 = valueUniq === value1;
  const uniqEqualValue2 = valueUniq === value2;
  if (uniqEqualValue1) {
    return { statusKey: 'remove' };
  }
  if (uniqEqualValue2) {
    return { statusKey: 'add' };
  }
  return { statusKey: 'error' };
};
const getKeysValues = (structuredData) => (_.isPlainObject(structuredData)
  ? Object.entries(structuredData) : structuredData);

const getDiff = (structuredData1 = {}, structuredData2 = {}) => {
  const keysValuesData1 = getKeysValues(structuredData1);
  const keysValuesData2 = getKeysValues(structuredData2);

  const keysValuesUniq = _.unionWith(keysValuesData1, keysValuesData2, _.isEqual).sort();

  const difference = keysValuesUniq.reduce((acc, keyValueUniq) => {
    const [keyUniq, valueUniq] = keyValueUniq;
    if (_.isPlainObject(valueUniq)) {
      const hasInTwoObject = _.has(structuredData1, keyUniq) && _.has(structuredData2, keyUniq);
      const statusKey = getStatusKeyNode(valueUniq, structuredData1[keyUniq],
        structuredData2[keyUniq], hasInTwoObject);
      const resultValue = getDiff(structuredData1[keyUniq], structuredData2[keyUniq]);

      const resultPresentation = {
        key: keyUniq,
        value: resultValue,
        ...statusKey,
      };
      return [...acc, resultPresentation];
    }

    const statusKey = getStatusKey(valueUniq, structuredData1[keyUniq], structuredData2[keyUniq]);
    const resultPresentation = {
      key: keyUniq, value: valueUniq, ...statusKey,
    };
    return [...acc, resultPresentation];
  }, []);
  const result = _.uniqWith(difference, _.isEqual);
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
