import _ from 'lodash';

const getAST = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2)).sort();
  const difference = unionKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, status: 'nested', children: getAST(value1, value2) };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, status: 'removed', value: value1 };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, status: 'added', value: value2 };
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


const generateDiff = (Data1, Data2) => {
  const AST = getAST(Data1, Data2);
  // console.log(JSON.stringify(AST));
  //  console.table(AST);
  //  console.table(AST[0].children);
  // console.table(AST[1].value[3].value);
  // console.table(AST[1].value);
  // console.table(AST[5].value[2].value);
  // console.table(AST[6].value[3].value);
  // console.table(AST[5].user);
  // console.table(AST[7].vasa);
  // console.table(AST[4].user[1]);

  // console.log(result);
  return AST;
};

export default generateDiff;
