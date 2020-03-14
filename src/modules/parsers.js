import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  '.json': (dataFile) => JSON.parse(dataFile),
  '.yaml': (dataFile) => yaml.safeLoad(dataFile),
  '.ini': (dataFile) => ini.parse(dataFile),
};

const parsers = (dataFile, typeFile) => {
  const result = parser[typeFile](dataFile);
  return result;
};

export default parsers;
