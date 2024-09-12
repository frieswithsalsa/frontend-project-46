const buildDiff = (data1, data2) => {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])];
  const sortedKeys = [...keys].sort((a, b) => a.localeCompare(b));

  return sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (typeof data1[key] === 'object' && data1[key] !== null &&
        typeof data2[key] === 'object' && data2[key] !== null) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: data1[key],
        newValue: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

export default buildDiff;
