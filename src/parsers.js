import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';


const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getParser = (parser) => {
  if (!_.has(parsers, parser)) {
    throw new Error(`Unknown parser : ${parser}'.`);
  }
  return parsers[parser];
};
export default getParser;
