import _ from 'lodash';

const indent = (depth) => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const lines = Object.entries(value).map(([key, val]) => 
    `${indent(depth + 1)}    ${key}: ${stringify(val, depth + 1)}`
  );

  return [
    '{',
    ...lines,
    `${indent(depth + 1)}}`
  ].join('\n');
};

const stylish = (diffTree) => {
  const iter = (tree, depth = 0) => {
    const lines = tree.map((node) => {
      const { key, type, value, oldValue, newValue, children } = node;
      const currentIndent = indent(depth);

      switch (type) {
        case 'nested':
          return `${currentIndent}    ${key}: ${iter(children, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}    ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return [
            `${currentIndent}  - ${key}: ${stringify(oldValue, depth)}`,
            `${currentIndent}  + ${key}: ${stringify(newValue, depth)}`
          ].join('\n');
        case 'added':
          return `${currentIndent}  + ${key}: ${stringify(value, depth)}`;
        case 'removed':
          return `${currentIndent}  - ${key}: ${stringify(value, depth)}`;
        default:
          throw new Error(`Неизвестный тип узла: ${type}`);
      }
    });

    return [
      '{',
      ...lines,
      `${indent(depth)}}`
    ].join('\n');
  };

  return iter(diffTree);
};

export default stylish;