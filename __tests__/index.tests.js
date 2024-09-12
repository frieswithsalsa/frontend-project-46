import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import formatJson from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('JSON files stylish format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_stylish.txt').trim();
    const result = genDiff(filepath1, filepath2).trim();

    console.log('Expected:');
    console.log(expected);
    console.log('Result:');
    console.log(result);
    console.log('Difference:');
    console.log(expected === result ? 'No difference' : 'Strings are different');

    expect(result).toBe(expected);
  });

  test('JSON files plain format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_plain.txt').trim();
    const result = genDiff(filepath1, filepath2, 'plain').trim();

    expect(result).toBe(expected);
  });

  test('YML files stylish format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const expected = readFile('expected_stylish.txt').trim();
    const result = genDiff(filepath1, filepath2).trim();

    expect(result).toBe(expected);
  });

  test('YML files plain format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const expected = readFile('expected_plain.txt').trim();
    const result = genDiff(filepath1, filepath2, 'plain').trim();

    expect(result).toBe(expected);
  });
});

test('JSON files stylish format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile('expected_stylish.txt').trim();
  const result = genDiff(filepath1, filepath2).trim();

  console.log('Expected:');
  console.log(expected);
  console.log('Result:');
  console.log(result);

  expect(result).toBe(expected);
});

test('json format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile('result_json.txt');
  const result = genDiff(filepath1, filepath2, 'json');
  expect(JSON.parse(result)).toEqual(
    JSON.parse(expected)
  );
});
