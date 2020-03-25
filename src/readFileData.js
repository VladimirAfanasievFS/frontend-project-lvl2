import path from 'path';
import fs from 'fs';

const readFileData = (pathFile) => {
  const absolutePathFile = path.resolve(process.cwd(), pathFile);
  const dataFile = fs.readFileSync(absolutePathFile, 'utf-8');

  return dataFile;
};

export default readFileData;
