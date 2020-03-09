
import path from 'path';
import genDiff from './modules/genDiff';
import readFileData from './modules/readFileData';
import parse from './modules/parse';


const startGenDiff = (firstFilePath, secondFilePath) => {
  const dataFile1 = readFileData(firstFilePath);
  const dataFile2 = readFileData(secondFilePath);
  const objFile1 = parse(dataFile1, path.extname(firstFilePath));
  const objFile2 = parse(dataFile2, path.extname(secondFilePath));
  return genDiff(objFile1, objFile2);
};

export default startGenDiff;
