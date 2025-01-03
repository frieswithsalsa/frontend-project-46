import yaml from 'js-yaml';

const parseFile = (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error`Unkonwn format: ${format}`();
  }
};

export default parseFile;
