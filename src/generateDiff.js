import _ from 'lodash';

const getAST = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2)).sort();
  const difference = unionKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return [...acc, { key, status: 'unChangedNode', children: getAST(value1, value2) }];
    }
    if (value1 !== value2) {
      return [...acc, {
        key, status: 'changedValue', deletedValue: value1, addedValue: value2,
      }];
    }
    return [...acc, { key, status: 'unChangedValue', unChangedValue: value1 }];
  }, []);
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
