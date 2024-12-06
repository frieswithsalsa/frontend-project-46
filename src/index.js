import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const result = keys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (_.isEqual(data1[key], data2[key])) {
      return `    ${key}: ${data1[key]}`;
    }
    return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
