import _ from 'lodash';

const replacer = '    ';

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const currentReplacer = replacer.repeat(depth);
  const entries = Object.entries(data);
  const strings = entries.map(([key, value]) => `${currentReplacer}    ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${strings.join('\n')}\n${currentReplacer}}`;
};

const stylish = (data) => {
  const iter = (obj, depth) => {
    if (!obj || !Array.isArray(obj)) {
      return stringify(obj, depth);
    }
    const currentReplacer = replacer.repeat(depth);
    const result = obj.map((node) => {
      const {
        key,
        value,
        type,
        value1,
        value2,
        children,
      } = node;
      switch (type) {
        case 'added':
          return `${currentReplacer}  + ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${currentReplacer}  - ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${currentReplacer}    ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${currentReplacer}  - ${stringify(value1, depth + 1)}\n${currentReplacer}  + ${key}: ${stringify(value2, depth + 1)}`;
        case 'nested':
          return `${currentReplacer}    ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error('Unknown diff type');
      }
    });
    return `{\n${result.join('\n')}\n${currentReplacer}}`;
  };
  return iter(data, 0);
};

export default stylish;
