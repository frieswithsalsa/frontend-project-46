import _ from 'lodash';

const indent = (depth) => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const lines = Object.entries(value).map(([key, val]) => 
    `${indent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  );

  return [
    '{',
    ...lines,
    `${indent(depth)}}`
  ].join('\n');
};

const stylish = (diffTree) => {
  const formatNode = (node, depth) => {
    const { key, type, value, oldValue, newValue, children } = node;

    switch (type) {
      case 'nested':
        return `${indent(depth)}    ${key}: ${iter(children, depth + 1)}`;
      case 'unchanged':
        return `${indent(depth)}    ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [
          `${indent(depth)}  - ${key}: ${stringify(oldValue, depth)}`,
          `${indent(depth)}  + ${key}: ${stringify(newValue, depth)}`
        ].join('\n');
      case 'added':
        return `${indent(depth)}  + ${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${indent(depth)}  - ${key}: ${stringify(value, depth)}`;
      default:
        throw new Error(`Неизвестный тип узла: ${type}`);
    }
  };

  const iter = (tree, depth = 0) => {
    const lines = tree.map(node => formatNode(node, depth));
    return [
      '{',
      ...lines,
      `${indent(depth)}}`
    ].join('\n');
  };

  return iter(diffTree);
};

export default stylish;