import _ from 'lodash';

const stringify = (value) => {
  if (value === null) {
    return value;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const makePlain = (AST, ancestors = []) => {
  const statusNode = {
    unChanged: () => null,
    added: ({ value }, path) => `Property '${path.join('.')}' was added with value: ${stringify(value)}`,
    removed: (none, path) => `Property '${path.join('.')}' was removed`,
    changed: ({ addedValue, removedValue }, path) => (
      `Property '${path.join('.')}' was updated. From ${stringify(removedValue)} to ${stringify(addedValue)}`),
    nested: ({ children }, path) => makePlain(children, path),
  };

  const result = AST.map((node) => {
    const { key, status } = node;
    const newAncestors = [...ancestors, key];
    return statusNode[status](node, newAncestors);
  });

  return _.compact(_.flatten(result)).join('\n');
};

const renderPlain = makePlain;
export default renderPlain;
