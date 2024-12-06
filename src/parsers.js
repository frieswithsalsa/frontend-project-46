import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const resolvedPath = path.resolve(filePath);
  const fileContent = fs.readFileSync(resolvedPath, 'utf-8');

  const fileExtension = path.extname(filePath);
  if (fileExtension === '.json') {
    return JSON.parse(fileContent);
  }
  if (fileExtension === '.yaml' || fileExtension === '.yml') {
    return yaml.load(fileContent);
  }

  throw new Error(`Unsupported file format: ${fileExtension}`);
};

export default parseFile;
