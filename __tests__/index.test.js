import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('genDiff', () => {
  it('should correctly compare two JSON files', () => {
    const filePath1 = path.join(__dirname, '../__fixtures__/file1.json');
    const filePath2 = path.join(__dirname, '../__fixtures__/file2.json');

    const data1 = JSON.parse(fs.readFileSync(filePath1, 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(filePath2, 'utf-8'));

    const diff = genDiff(data1, data2);

    const expectedDiff = `{
 - follow: false
   host: hexlet.io;
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

    // Проверяем, что результат соответствует ожидаемому
    expect(diff).toBe(expectedDiff);
  });
});
