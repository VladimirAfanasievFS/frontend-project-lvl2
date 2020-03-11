
import _ from 'lodash';



const myStringify = (obj) => {
  const arr = ['EEEEEEEEEEEEEEEE'];
  return arr.join('');
};
const render = (AST, level = 1) => {
  const statusKeySimple = {
    notChange: (el) => `  ${el.key}: ${el.value}`,
    remove: (el) => `- ${el.key}: ${el.value}`,
    add: (el) => `+ ${el.key}: ${el.value}`,
  };
  const statusKeyNode = {
    notChange: (el) => `  ${el.key}: {${render(el.value, level + 1).map((el1) => `${el1}`).join('')}`,
    remove: (el, space) => `- ${el.key}: {\n    ${space}${myStringify(el)}`,
    add: (el, space) => `+ ${el.key}: {\n    ${space}${myStringify(el)}`,
  };
  // console.log(AST);
  // console.table(AST);
  const result = AST.reduce((acc, child) => {
    const space = '  '.repeat(level);
    if (_.isArray(child.value)) {
      return [...acc, `\n${space}${statusKeyNode[child.statusKey](child, space)}\n${space}  }`];
    }
    if (_.isObject(child.value)) {
      return [...acc, `\n${space}${statusKeyNode[child.statusKey](child, space)}\n${space}  }`];
    }
    return [...acc, `\n${space}${statusKeySimple[child.statusKey](child)}`];
  }, []);
  return result;
};

export default render;
