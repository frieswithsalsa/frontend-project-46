import _ from 'lodash';

const ident = (depth, type = 'open', spacesCount = 4, replacer = ' ') => {
  if (type === 'open') {
    return replacer.repeat((depth * spacesCount) - 2);
  }
  return replacer.repeat((depth * spacesCount) - spacesCount);
};

const stringify = (data, depth = 1) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const collection = Object
    .entries(data)
    .map(([key, value]) => `${ident(depth)}  ${key}: ${stringify(value, depth + 1)}`)
    .join('\n');
  return `{\n${collection}\n${ident(depth, 'close')}}`;
};

const stylish = (tree, depth = 1) => {
  const buildOutput = tree.flatMap((node) => {
    switch (node.type) {
      case 'deleted':
        return `${ident(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;

      case 'added':
        return `${ident(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;

      case 'nested':
        return `${ident(depth)}  ${node.key}: ${stylish(node.children, depth + 1)}`;

      case 'unchanged':
        return `${ident(depth)}  ${node.key}: ${stringify(node.value, depth + 1)}`;

      case 'changed':
        return [
          `${ident(depth)}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
          `${ident(depth)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
        ];

      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  })
    .join('\n');

  return `{\n${buildOutput}\n${ident(depth, 'close')}}`;
};

export default stylish;
