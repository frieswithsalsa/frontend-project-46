import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expectedOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('gendiff', () => {
  test('Correct two plain files comparison', () => {
    const file1 = path.resolve(__dirname, '../__fixtures__/file1.json');
    const file2 = path.resolve(__dirname, '../__fixtures__/file2.json');

    const result = gendiff(file1, file2);
    expect(result.trim()).toEqual(expectedOutput.trim());
  });
});