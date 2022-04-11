import path from 'path';
import generateDiff from './generateDiff.js';
import readFileData from './readFileData.js';
import getParser from './parsers.js';
import getRender from './formatters/index.js';

const getExtension = (filePath) => path.extname(filePath).slice(1);
const parse = (filePath, data) => getParser(getExtension(filePath))(data);
const genDiff = (path1, path2, typeRender) => {
  const data1 = readFileData(path1);
  const data2 = readFileData(path2);
  const structuredData1 = parse(path1, data1);
  const structuredData2 = parse(path2, data2);
  const difference = generateDiff(structuredData1, structuredData2);
  const render = getRender(typeRender);
  return render(difference);
};

export default genDiff;
