import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const sortedUniqKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return sortedUniqKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        value: data2[key],
        type: 'added',
      };
    }

    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        value: data1[key],
        type: 'deleted',
      };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        children: buildDiff(data1[key], data2[key]),
        type: 'nested',
      };
    }

    return {
      key,
      value1: data1[key],
      value2: data2[key],
      type: 'changed',
    };
  });
};

export default buildDiff;
