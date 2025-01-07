import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const sortedUniqKeys = _.sortBy(
    _.union(Object.keys(data1), Object.keys(data2)));

  return sortedUniqKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        value: data2[key] !== undefined ? data2[key] : null, // Обработка добавления
        type: 'added',
      };
    }

    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        value: data1[key] !== undefined ? data1[key] : null, // Обработка удаления
        type: 'deleted',
      };
    }

    if (data1[key] === data2[key]) {
      return { key, value: data1[key], type: 'unchanged' };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        value: buildDiff(data1[key], data2[key]), // Рекурсивный вызов для вложенных объектов
        type: 'hasChild',
      };
    }

    // Обработка изменения значений
    return {
      key,
      value1: data1[key] !== undefined ? data1[key] : null, // Убедитесь, что значение не undefined
      value2: data2[key] !== undefined ? data2[key] : null, // Убедитесь, что значение не undefined
      type: 'changed',
    };
  });
};

export default buildDiff;