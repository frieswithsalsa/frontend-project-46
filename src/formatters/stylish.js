const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const indentSize = depth + 1;
  const bracketIndent = indent(depth);
  const currentIndent = indent(indentSize);

  const lines = Object.entries(value).map(
    ([key, val]) => `${currentIndent}${key}: ${stringify(val, indentSize)}`,
  );

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff) => {
  const iter = (node, depth = 0) => {
    const indentSize = depth + 1;
    const bracketIndent = indent(depth);
    const currentIndent = indent(indentSize);
    const lines = node.map(({
      key,
      type, 
      value, 
      oldValue, 
      newValue, 
      children, 
    }) => {
      switch (type) {
        case 'nested':
          return `${currentIndent}${key}: ${iter(children, indentSize)}`;
        case 'unchanged':
          return `${currentIndent}${key}: ${stringify(value, indentSize)}`;
        case 'changed':
          return [
            `${currentIndent.slice(2)}- ${key}: ${stringify(oldValue, indentSize)}`,
            `${currentIndent.slice(2)}+ ${key}: ${stringify(newValue, indentSize)}`,
          ].join('\n');
        case 'added':
          return `${currentIndent.slice(2)}+ ${key}: ${stringify(value, indentSize)}`;
        case 'deleted':
          return `${currentIndent.slice(2)}- ${key}: ${stringify(value, indentSize)}`;
        default:
          throw new Error(`Неизвестный тип узла: ${type}`);
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff);
};

export default stylish;
