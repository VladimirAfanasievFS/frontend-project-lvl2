import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (obj, depth = 0) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isPlainObject(currentValue)) {
      return String(currentValue);
    }
    const result = Object.entries(currentValue).map(([key, value]) => {
      const beginSpace = getIndent(currentDepth + 1);
      return `${beginSpace}  ${key}: ${stringify(value, currentDepth + 1)}`;
    });
    const endSpace = getIndent(currentDepth);
    return `{\n${result.join('\n')}\n  ${endSpace}}`;
  };

  return iter(obj, depth);
};

const makeTree = (ast, depth = 1) => {
  const statusMap = {
    nested: ({ key, children }) => {
      const child = makeTree(children, depth + 1);
      return `  ${getIndent(depth)}${key}: {\n${child}\n${getIndent(depth)}  }`;
    },
    unChanged: ({ key, value }) => `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`,
    added: ({ key, value }) => `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`,
    removed: ({ key, value }) => `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`,
    changed: ({ key, addedValue, removedValue }) => {
      const added = `${getIndent(depth)}+ ${key}: ${stringify(addedValue, depth)}`;
      const removed = `${getIndent(depth)}- ${key}: ${stringify(removedValue, depth)}`;
      return `${removed}\n${added}`;
    },
  };
  const result = ast.map((node) => {
    const { status } = node;
    return statusMap[status](node, depth);
  });
  return result.join('\n');
};

const renderTree = (ast) => `{\n${makeTree(ast)}\n}`;
export default renderTree;
