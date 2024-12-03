const fs = require('fs');
const path = require('path');

const parseFile = (filePath) => {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(fileContent)
}

module.exports = parseFile;