
import _ from 'lodash';

const getStrView = (value) => (_.isObject(value) ? '[complex value]' : value);

const iter = (AST, ancestors = []) => {
  const statusNode = {
    unChanged: () => null,
    added: ({ value }, path) => `Property '${path.join('.')}' was added with value: ${getStrView(value)}`,
    removed: (none, path) => `Property '${path.join('.')}' was deleted`,
    changed: ({ addedValue, removedValue }, path) => (
      `Property '${path.join('.')}' was changed from ${getStrView(removedValue)} to ${getStrView(addedValue)}`),
    nested: ({ children }, path) => iter(children, path),
  };

  const result = AST.map((node) => {
    const { key, status } = node;
    const newAncestors = [...ancestors, key];
    const retVal = statusNode[status](node, newAncestors);
    return retVal;
  });

  return _.compact(_.flatten(result)).join('\n');
};

const renderPlain = iter;
export default renderPlain;
