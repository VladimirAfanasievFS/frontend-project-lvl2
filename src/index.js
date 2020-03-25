
import path from 'path';
import generateDiff from './generateDiff';
import readFileData from './readFileData';
import parse from './parsers';
import choiceRender from './formatters';

const genDiff = (path1, path2, typeRender) => {
  const data1 = readFileData(path1);
  const data2 = readFileData(path2);
  const structuredData1 = parse(data1, path.extname(path1));
  const structuredData2 = parse(data2, path.extname(path2));
  const unionDiff = generateDiff(structuredData1, structuredData2);
  const renderView = choiceRender[typeRender](unionDiff);
  //  console.log(renderedView);
  return renderView;
};

export default genDiff;
