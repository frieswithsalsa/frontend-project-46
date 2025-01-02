import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// Чтение ожидаемых фикстур
const expectedTree = readFile('resultTree.txt');
const expectedPlain = readFile('resultPlain.txt');
const expectedJSON = readFile('resultJSON.txt');

test('JSON gendiff with stylish format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2)).toEqual(expectedTree);
});

test('JSON gendiff with plain format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
});

test('JSON gendiff with json format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});

// Добавьте аналогичные тесты для YML
test('YML gendiff with stylish format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

  expect(genDiff(file1, file2)).toEqual(expectedTree);
});

test('YML gendiff with plain format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
});

test('YML gendiff with json format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});

// Добавьте аналогичные тесты для YAML
test('YAML gendiff with stylish format', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');

  expect(genDiff(file1, file2)).toEqual(expectedTree);
});

test('YAML gendiff with plain format', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');

  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
});

test('YAML gendiff with json format', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');

  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});
