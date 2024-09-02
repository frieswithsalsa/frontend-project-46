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
  
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const result = keys.flatMap((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  const noChanges = result.every(line => line.startsWith('    '));

  return noChanges ? '{}' : `{\n${result.join('\n')}\n}`;
};

export default gendiff;
