
import path from 'path';
import fs from 'fs';
import genDiff from './modules/genDiff';


const startGenDiff = (firstFilePath, secondFilePath) => {
  const absolutePathFile1 = path.resolve(process.cwd(), firstFilePath);
  const absolutePathFile2 = path.resolve(process.cwd(), secondFilePath);

  const dataFile1 = fs.readFileSync(absolutePathFile1);
  const dataFile2 = fs.readFileSync(absolutePathFile2);

  const objFile1 = JSON.parse(dataFile1);
  const objFile2 = JSON.parse(dataFile2);
  return genDiff(objFile1, objFile2);
};

export default startGenDiff;
