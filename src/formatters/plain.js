import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  if (typeof data === 'string') {
    return `'${data}'`;
  }

  return data;
};

const plain = (data) => {
  const iter = (obj, path) => {
    if (!obj) {
      return '';
    }
    const values = Object.values(obj);
    const strings = values.map((node) => {
      const {
        key, value, type, value1, value2, children,
      } = node;
      const newPath = path === '' ? `${key}` : `${path}.${key}`;

      switch (type) {
        case 'added':
          return `Property '${newPath}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${newPath}' was removed`;
        case 'changed':
          return `Property '${newPath}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'nested':
          return iter(children, newPath);
        case 'unchanged':
          return null;
        default:
          throw new Error('Unknown diff type');
      }
    }).filter(Boolean);

    return strings.join('\n');
  };

  return iter(data, '');
};

export default plain;
