const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (diff) => {
  const iter = (node, path = []) => {
    const lines = node.flatMap((item) => {
      const newPath = [...path, item.key];
      const fullPath = newPath.join('.');

      switch (item.type) {
        case 'nested':
          return iter(item.children, newPath);
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringify(
            item.value
          )}`;
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${stringify(
            item.oldValue
          )} to ${stringify(item.newValue)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type: ${item.type}`);
      }
    });

    return lines.join('\n');
  };

  return iter(diff);
};

export default plain;
