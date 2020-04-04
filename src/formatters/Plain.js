
import _ from 'lodash';

const getStrView = (value) => (_.isObject(value) ? '[complex value]' : value);

const iter = (AST, partsPath = []) => {
  const statusNode = {
    unChanged: () => null,
    added: ({ value }, path) => `Property '${path.join('.')}' was added with value: ${getStrView(value)}\n`,
    removed: (none, path) => `Property '${path.join('.')}' was deleted\n`,
    changed: ({ addedValue, removedValue }, path) => (
      `Property '${path.join('.')}' was changed from ${getStrView(removedValue)} to ${getStrView(addedValue)}\n`),
    nested: ({ children }, partsPathNode) => iter(children, partsPathNode),
  };

  const result = AST.map((node) => {
    const { key, status } = node;
    const partsPathNode = [...partsPath, key];
    const retVal = statusNode[status](node, partsPathNode);
    return retVal;
  });

  return _.flatten(result);
};

const renderTypePlain = (AST) => iter(AST).join('');
export default renderTypePlain;
