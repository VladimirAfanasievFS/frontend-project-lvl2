
import path from 'path';
import generateDiff from './generateDiff';
import readFileData from './readFileData';
import getParser from './parsers';
import getRender from './formatters';

// правильно ли так выносить так функции? Чтобы основной цикл был читаем?
// или допустимо было оставить
// const structuredData1 = getParser(getExtension(path1))(data1)

const getExtension = (pathFile) => path.extname(pathFile).slice(1);
const parse = (pathFile, data) => getParser(getExtension(pathFile))(data);
const genDiff = (path1, path2, typeRender) => {
  const data1 = readFileData(path1);
  const data2 = readFileData(path2);
  const structuredData1 = parse(path1, data1);
  const structuredData2 = parse(path2, data2);
  const difference = generateDiff(structuredData1, structuredData2);
  // или лучше разбивать построчно прямо в коде?
  // const renderView = getRender(typeRender)(difference);
  const render = getRender(typeRender);
  const renderView = render(difference);
  return renderView;
};

export default genDiff;
