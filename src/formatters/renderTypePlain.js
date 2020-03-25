
import _ from 'lodash';

const getStrView = (value) => (_.isObject(value) ? '[complex value]' : value);
const statusNode = {
  unChangedValue: () => '',
  changedValue: ({ addedValue, deletedValue }, path) => {
    const addView = `Property '${path.join('.')}' was added with value: ${getStrView(addedValue)}\n`;
    const deleteView = `Property '${path.join('.')}' was deleted\n`;
    if (addedValue && deletedValue) {
      return `Property '${path.join('.')}' was changed from ${getStrView(deletedValue)} to ${getStrView(addedValue)}\n`;
    }
    return addedValue !== undefined ? addView : deleteView;
  },
};
const iter = (AST, pathNode = []) => {
  // console.table(AST[0].value);
  const result = AST.reduce((acc, node) => {
    const { key, status, children } = node;
    const fullPathNode = [...pathNode, key];
    if (children) { return [...acc, ...iter(children, fullPathNode)]; }
    const retVal = statusNode[status](node, fullPathNode);
    return [...acc, retVal];
  }, []);

  return result;
};

const renderTypePlain = (AST) => iter(AST).join('');
export default renderTypePlain;
