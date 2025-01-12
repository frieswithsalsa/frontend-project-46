import _ from 'lodash';

const replacer = '    ';

const stringify = (data, depth) => {
  if (data === null || !_.isObject(data)) {
    return `${data}`;
  }

  const indent = replacer.repeat(depth);
  const bracketIndent = replacer.repeat(Math.max(depth - 1, 0));
  const entries = Object.entries(data);
  const strings = entries.map(([key, value]) => `${indent}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${strings.join('\n')}\n${bracketIndent}}`;
};

const stylish = (data) => {
  const createIndent = (depth) => replacer.repeat(depth);

  const iter = (obj, depth) => {
    if (!obj || !Array.isArray(obj)) {
      return stringify(obj, depth);
    }

    const indent = createIndent(depth);
    const bracketIndent = createIndent(Math.max(depth - 1, 0));
    const result = obj.map((node) => {
      const {
        key,
        value,
        type,
        value1,
        value2,
      } = node;
      switch (type) {
        case 'added':
          return `${indent}  + ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${indent}  - ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${indent}    ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${currentReplacer}  - ${stringify(value1, depth + 1)}\n${currentReplacer}  + ${key}: ${stringify(value2, depth + 1)}`; // Исправлено
        case 'nested':
          return `${currentReplacer}    ${key}: ${iter(value, depth + 1)}`;
        default:
          throw new Error('Unknown diff type');
      }
    });

    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return iter(data, 0);
};


export default stylish;
