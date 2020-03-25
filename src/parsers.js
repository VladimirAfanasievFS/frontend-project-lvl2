import yaml from 'js-yaml';
import ini from 'ini';


const choiceParser = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (data, type) => {
  const result = choiceParser[type](data);
  return result;
};

export default parse;
