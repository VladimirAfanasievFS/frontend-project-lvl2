import _ from 'lodash';


const util = (element, obj) => {
  const [key, value] = element;
  if (_.has(obj, key) && value === obj[key]) {
    return true;
  }
  return false;
};
const genDiff = (objFile1, objFile2) => {
  const keyValue1 = Object.entries(objFile1);
  const keyValue2 = Object.entries(objFile2);


  const keyValueUnion = _.unionWith(keyValue1, keyValue2, _.isEqual).sort();

  // console.log(keyValueUnion);
  const result = keyValueUnion.map((el) => {
    const [key, value] = el;
    if (util(el, objFile1) && util(el, objFile2)) {
      return `  ${key}: ${value}`;
    }
    if (util(el, objFile1)) {
      return `- ${key}: ${value}`;
    }
    if (util(el, objFile2)) {
      return `+ ${key}: ${value}`;
    }
    return `${key}: ${value}`;
  }).join('\n');
  return `${result}`;
};

// {
//   host: hexlet.io
// + timeout: 20
// - timeout: 50
// - proxy: 123.234.53.22
// + verbose: true
// - follow: false
// }
export default genDiff;
