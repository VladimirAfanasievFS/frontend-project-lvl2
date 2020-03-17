
import _ from 'lodash';

const getFormatSpace = (count, simbol) => `${'    '.repeat(count)}  ${simbol} `;
const stringify = (obj, levelDepthNode = 0) => {
  const result = obj.map((el) => `${getFormatSpace(levelDepthNode, ' ')}${el.key}: ${el.value}`);
  return result.join('\n');
  // return JSON.stringify(obj);
};
const iter = (AST, levelDepthNode = 0) => {
  const statusKeyList = {
    notChange: (el, levelDepth) => `${getFormatSpace(levelDepth, ' ')}${el.key}: ${el.value}`,
    remove: (el, levelDepth) => `${getFormatSpace(levelDepth, '-')}${el.key}: ${el.value}`,
    add: (el, levelDepth) => `${getFormatSpace(levelDepth, '+')}${el.key}: ${el.value}`,
  };
  const statusKeyNode = {
    notChange: (el, levelDepth) => `${getFormatSpace(levelDepth, ' ')}${el.key}: {${iter(el.value, levelDepth + 1).map((el1) => `${el1}`).join('')}`,
    remove: (el, levelDepth) => `${getFormatSpace(levelDepth, '-')}${el.key}: {\n${stringify(el.value, levelDepth + 1)}`,
    add: (el, levelDepth) => `${getFormatSpace(levelDepth, '+')}${el.key}: {\n${stringify(el.value, levelDepth + 1)}`,
  };
  // console.log(AST);
  // console.table(AST);
  const result = AST.reduce((acc, child) => {
    // const spaceDepthList = '3333'.repeat(levelDepthNode);
    if (_.isArray(child.value)) {
      return [...acc, `\n${statusKeyNode[child.statusKey](child, levelDepthNode)}\n${getFormatSpace(levelDepthNode, ' ')}}`];
    }
    return [...acc, `\n${statusKeyList[child.statusKey](child, levelDepthNode)}`];
  }, []);
  return result;
};

const renderTypeTree = (AST) => `{${_.flattenDeep(iter(AST)).join('').trimRight()}\n}`;
export default renderTypeTree;
