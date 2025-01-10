import plain from './plain.js';
import stylish from './stylish.js';

const format = (tree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree, null, 2);
    default:
      throw new Error(`format ${formatType} not supported. Choose 'stylish', 'plain' or 'json'`);
  }
};

export default format;
