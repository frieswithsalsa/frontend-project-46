import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Вспомогательная функция для построения пути к файлам фикстур
const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

// Вспомогательная функция для чтения данных из файла
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  it('should correctly compare two JSON files', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');
    const expectedDiff = readFile('expected_flat.txt');

    const diff = genDiff(filePath1, filePath2);
    expect(diff).toBe(expectedDiff);
  });

  it('should correctly compare two YAML files', () => {
    const filePath1 = getFixturePath('file1.yml');
    const filePath2 = getFixturePath('file2.yml');
    const expectedDiff = readFile('expected_flat.txt');

    const diff = genDiff(filePath1, filePath2);
    expect(diff).toBe(expectedDiff);
  });

  it('should correctly compare JSON and YAML files', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.yml');
    const expectedDiff = readFile('expected_flat.txt');

    const diff = genDiff(filePath1, filePath2);
    expect(diff).toBe(expectedDiff);
  });
});
