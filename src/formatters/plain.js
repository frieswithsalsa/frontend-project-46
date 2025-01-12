import _ from 'lodash';

const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return String(data);
};

const getProperty = (node, PropertyPath) => {
  if (PropertyPath === '') {
    return `${node.key}`;
  }
  return `${PropertyPath}.${node.key}`;
};

const plain = (tree, PropertyPath = '') => {
  const buildOutput = tree.flatMap((node) => {
    switch (node.type) {
      case 'deleted':
        return `Property '${getProperty(node, PropertyPath)}' was removed`;

      case 'added':
        return `Property '${getProperty(node, PropertyPath)}' was added with value: ${stringify(node.value)}`;

      case 'nested':
        return plain(node.children, getProperty(node, PropertyPath));

      case 'changed':
        return `Property '${getProperty(node, PropertyPath)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknown type: ${node.type}.`);
    }
  })
    .join('\n');
  return buildOutput;
};

export default plain;
