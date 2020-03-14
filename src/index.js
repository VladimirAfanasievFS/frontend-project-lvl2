
import path from 'path';
import genDiff from './modules/genDiff';
import readFileData from './modules/readFileData';
import parse from './modules/parse';
import renderTypeTree from './modules/formatters/renderTypeTree.js';
import renderTypePlain from './modules/formatters/renderTypePlain.js';

const renderType = {
  tree: (AST) => renderTypeTree(AST),
  plain: (AST) => renderTypePlain(AST),
}
const startGenDiff = (firstFilePath, secondFilePath, typeRender) => {
  const dataFile1 = readFileData(firstFilePath);
  const dataFile2 = readFileData(secondFilePath);
  const objFile1 = parse(dataFile1, path.extname(firstFilePath));
  const objFile2 = parse(dataFile2, path.extname(secondFilePath));
  const AST = genDiff(objFile1, objFile2);
  const result = renderType[typeRender](AST);
  return result;
};

export default startGenDiff;
