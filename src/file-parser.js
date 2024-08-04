const { extname } = require('path');

const parse = (data, ext) => {
    switch (ext) {
        case '.json':
          return JSON.parse(data);
        default:
        throw new Error (`Unsupported file format ${ext}`);
    }
}

module.exports = parse;