import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  // Собираем уникальные ключи обоих объектов, сортируем их
  const sortedUniqKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return sortedUniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    // Если ключ есть только в obj2
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }

    // Если ключ есть только в obj1
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }

    // Если значения одинаковые
    if (value1 === value2) {
      return { key, value: value1, type: 'unchanged' };
    }

    // Если значения — объекты, рекурсивно вызываем buildDiff
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, value: buildDiff(value1, value2), type: 'hasChild' };
    }

    // Если значения различаются
    return {
      key,
      oldValue: value1,
      value: value2,
      type: 'changed',
    };
  });
};

export default buildDiff;
