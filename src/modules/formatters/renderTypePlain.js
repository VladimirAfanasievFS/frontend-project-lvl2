
import _ from 'lodash';

const statusKeySimple = {
  notChange: () => '',
  remove: (el, path) => `Property '${path.join('.')}' was deleted\n`,
  add: (el, path) => {
    const value = _.isObject(el.value) ? '[complex value]' : el.value;
    return `Property '${path.join('.')}' was added with value: ${value}\n`;
  },
};
const getBeforeValue = (AST, key) => {
  const findedValue = AST.find((el) => el.key === key && el.statusKey === 'remove').value;
  return _.isObject(findedValue) ? '[complex value]' : findedValue;
};
const getAfterValue = (AST, key) => {
  const findedValue = AST.find((el) => el.key === key && el.statusKey === 'add').value;
  return _.isObject(findedValue) ? '[complex value]' : findedValue;
};
const getResultChanged = (path, beforeValue, afterValue) => `Property '${path.join('.')}' was changed from ${beforeValue} to ${afterValue}\n`;
const iter = (AST, pathNode = []) => {
  //  console.table(AST);
  // console.table(AST[0].value);
  const result = AST.reduce((acc, node) => {
    const { key, statusKey, value } = node;
    const fullPathNode = [...pathNode, key];
    if (_.isArray(value) && statusKey === 'notChange') {
      return [...acc, ...iter(value, fullPathNode)];
    }
    const isRepetitiveKey = AST.filter((el) => el.key === key).length > 1;
    const retVal = isRepetitiveKey
      ? getResultChanged(fullPathNode, getBeforeValue(AST, key), getAfterValue(AST, key))
      : statusKeySimple[statusKey](node, fullPathNode);
    return [...acc, retVal];
  }, []);

  return _.uniq(result);
};

const renderTypeTree = (AST) => iter(AST).join('');
export default renderTypeTree;
