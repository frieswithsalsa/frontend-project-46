import path from "path";
import fs from "fs";
import parse from "./parse.js";
import _ from "lodash";

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), extractFormat(filepath));

const gendiff = (filepath1, filepath2) => {
  const fullFilePath1 = getFullPath(filepath1);
  const fullFilePath2 = getFullPath(filepath2);

  const data1 = getData(fullFilePath1);
  const data2 = getData(fullFilePath2);
  
  const buildDiff = (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

    return keys.flatMap((key) => {
      if (!_.has(obj2, key)) {
        return `  - ${key}: ${formatValue(obj1[key])}`;
      }
      if (!_.has(obj1, key)) {
        return `  + ${key}: ${formatValue(obj2[key])}`;
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        const nestedDiff = buildDiff(obj1[key], obj2[key]);
        return `    ${key}: {\n${nestedDiff.join('\n')}\n    }`;
      }
      if (obj1[key] !== obj2[key]) {
        return `  - ${key}: ${formatValue(obj1[key])}\n  + ${key}: ${formatValue(obj2[key])}`;
      }
      return `    ${key}: ${formatValue(obj1[key])}`;
    });
  };

  const formatValue = (value) => {
    if (_.isObject(value)) {
      const entries = Object.entries(value).map(([k, v]) => `    ${k}: ${formatValue(v)}`);
      return `{\n${entries.join('\n')}\n  }`;
    }
    return value;
  };

  const diff = buildDiff(data1, data2);
  const noChanges = diff.every(line => line.startsWith('    '));

  return noChanges ? '{}' : `{\n${diff.join('\n')}\n}`;
};

export default gendiff;