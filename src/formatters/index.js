
import renderTypeTree from './renderTypeTree';
import renderTypePlain from './renderTypePlain';
import renderTypeJson from './renderTypeJson';

const choiceRender = {
  tree: (AST) => renderTypeTree(AST),
  plain: (AST) => renderTypePlain(AST),
  JSON: (AST) => renderTypeJson(AST),
};

export default choiceRender;
