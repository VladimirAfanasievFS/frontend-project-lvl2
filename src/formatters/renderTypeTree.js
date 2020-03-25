
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
    unChangedNode: ({ key, children }, depth) => {
      const child = makeTree(children, depth + 1);
      return `${makeFormatSpace(depth, ' ')}${key}: {\n${child}\n${makeFormatSpace(depth, ' ')}}`;
    },
    //  addNode: (node, depth) => '2',
    //  removeNode: (node, depth) => '3',
    unChangedValue: ({ key, unChangedValue }, depth) => {
      const space = makeFormatSpace(depth, ' ');
      return `${space}${stringify(key, unChangedValue, depth)}`;
    },
    changedValue: ({ key, addedValue, deletedValue }, depth) => {
      const addView = `${makeFormatSpace(depth, '+')}${stringify(key, addedValue, depth)}`;
      const deleteView = `${makeFormatSpace(depth, '-')}${stringify(key, deletedValue, depth)}`;
      if (addedValue && deletedValue) {
        return `${addView}\n${deleteView}`;
      }
      return addedValue !== undefined ? addView : deleteView;
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
