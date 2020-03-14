
import _ from 'lodash';


const myStringify = (obj, levelDepthNode = 1) => {
  const spaceDepthNode = '  '.repeat(levelDepthNode);
  const result = obj.map((el) => `${spaceDepthNode}${el.key}: ${el.value}`);

  return result.join('\n');
  // return JSON.stringify(obj);
};

const iter = (AST, levelDepthNode = 1) => {
  const statusKeySimple = {
    notChange: (el) => `  ${el.key}: ${el.value}`,
    remove: (el) => `- ${el.key}: ${el.value}`,
    add: (el) => `+ ${el.key}: ${el.value}`,
  };
  const statusKeyNode = {
    notChange: (el) => `  ${el.key}: {${iter(el.value, levelDepthNode + 1).map((el1) => `${el1}`).join('')}`,
    remove: (el) => `- ${el.key}: {\n${myStringify(el.value, levelDepthNode + 2)}`,
    add: (el) => `+ ${el.key}: {\n${myStringify(el.value, levelDepthNode + 2)}`,
  };
  // console.log(AST);
  // console.table(AST);
  const result = AST.reduce((acc, child) => {
    const spaceDepthNode = '  '.repeat(levelDepthNode);
    if (_.isArray(child.value)) {
      return [...acc, `\n${spaceDepthNode}${statusKeyNode[child.statusKey](child)}\n${spaceDepthNode}  }`];
    }
    return [...acc, `\n${spaceDepthNode}${statusKeySimple[child.statusKey](child)}`];
  }, []);
  return result;
};

const renderTypeTree = (AST) => `{${_.flattenDeep(iter(AST, 1)).join('').trimRight()}\n}`;
export default renderTypeTree;
