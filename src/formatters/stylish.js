const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
  );

  return ['{', ...lines, `${indent(depth)}  }`].join('\n');
};

const stylish = (diff) => {
  const iter = (node, depth = 1) => {
    const currentIndent = indent(depth);

    const lines = node.map(
      ({ key, type, value, oldValue, newValue, children }) => {
        switch (type) {
          case 'nested':
            return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
          case 'unchanged':
            return `${currentIndent}  ${key}: ${stringify(value, depth)}`;
          case 'changed':
            return [
              `${currentIndent}- ${key}: ${stringify(oldValue, depth)}`,
              `${currentIndent}+ ${key}: ${stringify(newValue, depth)}`,
            ].join('\n');
          case 'added':
            return `${currentIndent}+ ${key}: ${stringify(value, depth)}`;
          case 'deleted':
            return `${currentIndent}- ${key}: ${stringify(value, depth)}`;
          default:
            throw new Error(`Неизвестный тип узла: ${type}`);
        }
      }
    );

    return ['{', ...lines, `${indent(depth - 1)}  }`].join('\n');
  };

  return iter(diff);
};

export default stylish;
