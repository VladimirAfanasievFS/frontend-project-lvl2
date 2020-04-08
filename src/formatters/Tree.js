
import _ from 'lodash';

const formatSpace = (count, simbol) => `${'    '.repeat(count)}  ${simbol} `;
const stringify = (key, obj, depth = 0) => {
  if (!_.isPlainObject(obj)) {
    return `${key}: ${obj}`;
  }

  const result = Object.entries(obj).map(([key2, value]) => {
    const beginSpace = formatSpace(depth + 1, ' ');
    const endSpace = formatSpace(depth, ' ');
    return `${key}: {\n${beginSpace}${key2}: ${value}\n${endSpace}}`;
  });
  return result;
};

const makeTree = (AST, depth = 0) => {
  const statusMap = {
    nested: ({ key, children }) => {
      const child = makeTree(children, depth + 1);
      return `${formatSpace(depth, ' ')}${key}: {\n${child}\n${formatSpace(depth, ' ')}}`;
    },
    unChanged: ({ key, value }) => {
      const space = formatSpace(depth, ' ');
      return `${space}${stringify(key, value, depth)}`;
    },
    added: ({ key, value }) => `${formatSpace(depth, '+')}${stringify(key, value, depth)}`,
    removed: ({ key, value }) => `${formatSpace(depth, '-')}${stringify(key, value, depth)}`,
    changed: ({ key, addedValue, removedValue }) => {
      const added = `${formatSpace(depth, '+')}${stringify(key, addedValue, depth)}`;
      const removed = `${formatSpace(depth, '-')}${stringify(key, removedValue, depth)}`;
      return `${added}\n${removed}`;
    },
  };
  const result = AST.map((node) => {
    const { status } = node;
    return statusMap[status](node, depth);
  });
  return result.join('\n');
};

const renderTree = (AST) => `{\n${makeTree(AST)}\n}`;
export default renderTree;
