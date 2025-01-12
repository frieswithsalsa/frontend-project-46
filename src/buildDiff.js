import _ from 'lodash';

const getSortedKeys = (data1, data2) => {
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);

  const arrayOfKeys = [...new Set([...dataKeys1, ...dataKeys2])];

  return arrayOfKeys.toSorted();
};

const buildDiff = (data1, data2) => getSortedKeys(data1, data2).map((key) => {
  if (!Object.hasOwn(data1, key)) {
    return { key, value: data2[key], type: 'added' };
  }

  if (!Object.hasOwn(data2, key)) {
    return { key, value: data1[key], type: 'deleted' };
  }

  if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
    return { key, children: buildDiff(data1[key], data2[key]), type: 'nested' };
  }

  if (_.isEqual(data1[key], data2[key])) {
    return { key, value: data1[key], type: 'unchanged' };
  }

  return {
    key, value1: data1[key], value2: data2[key], type: 'changed',
  };
});

export default buildDiff;
