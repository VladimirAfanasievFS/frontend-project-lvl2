
import _ from 'lodash';

const makeFormatSpace = (count, simbol) => `${'    '.repeat(count)}  ${simbol} `;
const stringify = (key, obj, levelDepth = 0) => {
  if (!_.isPlainObject(obj)) {
    return `${key}: ${obj}`;
  }

  const result = Object.entries(obj).map(([key2, value]) => {
    const beginSpace = makeFormatSpace(levelDepth + 1, ' ');
    const endSpace = makeFormatSpace(levelDepth, ' ');
    return `${key}: {\n${beginSpace}${key2}: ${value}\n${endSpace}}`;
  });
  return result;
};

const makeTree = (AST, levelDepth = 0) => {
  // console.table(AST);
  const statusMap = {
    nested: ({ key, children }, depth) => {
      const child = makeTree(children, depth + 1);
      return `${makeFormatSpace(depth, ' ')}${key}: {\n${child}\n${makeFormatSpace(depth, ' ')}}`;
    },
    unChanged: ({ key, value }, depth) => {
      const space = makeFormatSpace(depth, ' ');
      return `${space}${stringify(key, value, depth)}`;
    },
    added: ({ key, value }, depth) => {
      const addView = `${makeFormatSpace(depth, '+')}${stringify(key, value, depth)}`;
      return addView;
    },
    removed: ({ key, value }, depth) => {
      const removeView = `${makeFormatSpace(depth, '-')}${stringify(key, value, depth)}`;
      return removeView;
    },
    changed: ({ key, addedValue, removedValue }, depth) => {
      const addView = `${makeFormatSpace(depth, '+')}${stringify(key, addedValue, depth)}`;
      const removeView = `${makeFormatSpace(depth, '-')}${stringify(key, removedValue, depth)}`;
      return `${addView}\n${removeView}`;
    },
  };
  const result = AST.reduce((acc, node) => {
    const { status } = node;
    return [...acc, statusMap[status](node, levelDepth)];
  }, []);
  return result.join('\n');
};

const renderTypeTree = (AST) => `{\n${makeTree(AST)}\n}`;
export default renderTypeTree;
