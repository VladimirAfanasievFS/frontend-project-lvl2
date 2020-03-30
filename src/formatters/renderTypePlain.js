
import _ from 'lodash';

const getStrView = (value) => (_.isObject(value) ? '[complex value]' : value);
const statusNode = {
  unChanged: () => '',
  added: ({ value }, path) => {
    const addView = `Property '${path.join('.')}' was added with value: ${getStrView(value)}\n`;
    return addView;
  },
  removed: (none, path) => {
    const removeView = `Property '${path.join('.')}' was deleted\n`;
    return removeView;
  },
  changed: ({ addedValue, removedValue }, path) => {
    const changedView = `Property '${path.join('.')}' was changed from ${getStrView(removedValue)} to ${getStrView(addedValue)}\n`;
    return changedView;
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
