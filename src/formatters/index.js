import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const format = (tree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`format ${formatType} not supported. Choose 'stylish', 'plain' or 'json'`);
  }
};

export default format;
