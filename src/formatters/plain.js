const stringify = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    if (value === null || typeof value !== 'object') {
      return String(value);
    }
    return '[complex value]';
  };
  
  const plain = (diff) => {
    const iter = (node, path) => {
      const lines = node.flatMap((item) => {
        const newPath = path ? `${path}.${item.key}` : item.key;
  
        switch (item.type) {
          case 'nested':
            return iter(item.children, newPath);
          case 'added':
            return `Property '${newPath}' was added with value: ${stringify(item.value)}`;
          case 'removed':
            return `Property '${newPath}' was removed`;
          case 'changed':
            return `Property '${newPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
          case 'unchanged':
            return [];
          default:
            throw new Error(`Unknown type: ${item.type}`);
        }
      });
  
      return lines.join('\n');
    };
  
    return iter(diff, '');
  };
  
  export default plain;