
import path from 'path';
import generateDiffAST from './modules/genDiff';
import readFileData from './modules/readFileData';
import parsers from './modules/parsers';
import renderTypeTree from './modules/formatters/renderTypeTree.js';
import renderTypePlain from './modules/formatters/renderTypePlain.js';
import renderTypeJson from './modules/formatters/renderTypeJson.js';

const renderType = {
  tree: (AST) => renderTypeTree(AST),
  plain: (AST) => renderTypePlain(AST),
  JSON: (AST) => renderTypeJson(AST),
};

const startGenDiff = (pathToFile1, pathToFile2, render) => {
  const dataFromFile1 = readFileData(pathToFile1);
  const dataFromFile2 = readFileData(pathToFile2);
  const structuredDataFromFile1 = parsers(dataFromFile1, path.extname(pathToFile1));
  const structuredDataFromFile2 = parsers(dataFromFile2, path.extname(pathToFile2));
  const unionDiffAST = generateDiffAST(structuredDataFromFile1, structuredDataFromFile2);
  const renderedView = renderType[render](unionDiffAST);
  return renderedView;
};

export default startGenDiff;
