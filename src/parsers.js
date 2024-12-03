import fs from 'fs';
import path from 'path';
import process from 'process';

const parseFile = (filePath) => {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(fileContent)
}

export default parseFile;