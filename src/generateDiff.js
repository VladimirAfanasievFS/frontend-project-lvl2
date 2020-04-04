import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2)).sort();
  const difference = unionKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, status: 'removed', value: value1 };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, status: 'added', value: value2 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, status: 'nested', children: generateDiff(value1, value2) };
    }
    if (value1 !== value2) {
      return {
        key, status: 'changed', removedValue: value1, addedValue: value2,
      };
    }
    return { key, status: 'unChanged', value: value1 };
  });
  return difference;
};


export default generateDiff;
