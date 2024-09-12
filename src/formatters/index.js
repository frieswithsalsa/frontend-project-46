import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const format = (diff, formatName = 'stylish') => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Неподдерживаемый формат: ${formatName}`);
  }
  return formatter(diff);
};

export default format;
