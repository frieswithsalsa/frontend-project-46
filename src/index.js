import _ from 'lodash';

const genDiff = (data1, data2) => {
    const allKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

    const lines = allKeys.map((key) => {
        if (!_.has(data2, key)) {
            return ` - ${key}: ${data1[key]}`
        }
        if (!_.has(data1, key)) {
            return ` + ${key}: ${data2[key]}`
        }
        if (data1[key] !== data2[key]) {
            return ` - ${key}: ${data1[key]}\n + ${key}: ${data2[key]}`
        }
        return `   ${key}: ${data1[key]};`
    })

    return `{\n${lines.join('\n')}\n}`
};

export default genDiff;
