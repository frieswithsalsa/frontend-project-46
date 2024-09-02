import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expectedOutput = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

describe('gendiff JSON files', () => {
  test('Files with different content', () => {
    const file1 = path.resolve(__dirname, '../__fixtures__/file1.json');
    const file2 = path.resolve(__dirname, '../__fixtures__/file2.json');

    const result = gendiff(file1, file2);
    expect(result.trim()).toEqual(expectedOutput.trim());
  });

  test('Files with identical content', () => {
    const file1 = path.resolve(__dirname, '../__fixtures__/file1.json');
    const file2 = path.resolve(__dirname, '../__fixtures__/file1.json');
    
    const expected = '{}';
    const result = gendiff(file1, file2);
    expect(result.trim()).toEqual(expected.trim());
  });
});

describe('gendiff YML files', () => {
  test('Files with different content', () => {
    const file1 = path.resolve(__dirname, '../__fixtures__/file1.yml');
    const file2 = path.resolve(__dirname, '../__fixtures__/file2.yml');

    const result = gendiff(file1, file2);
    expect(result.trim()).toEqual(expectedOutput.trim());
  });

  test('Files with identical content', () => {
    const file1 = path.resolve(__dirname, '../__fixtures__/file1.yml');
    const file2 = path.resolve(__dirname, '../__fixtures__/file1.yml');
    
    const expected = '{}';
    const result = gendiff(file1, file2);
    expect(result.trim()).toEqual(expected.trim());
  });
});

describe('gendiff YAML files', () => {
  test('Files with different content', () => {
    const file1 = path.resolve(__dirname, '../__fixtures__/file1.yaml');
    const file2 = path.resolve(__dirname, '../__fixtures__/file2.yaml');

    const result = gendiff(file1, file2);
    expect(result.trim()).toEqual(expectedOutput.trim());
  });

  test('Files with identical content', () => {
    const file1 = path.resolve(__dirname, '../__fixtures__/file1.yaml');
    const file2 = path.resolve(__dirname, '../__fixtures__/file1.yaml');
    
    const expected = '{}';
    const result = gendiff(file1, file2);
    expect(result.trim()).toEqual(expected.trim());
  });
});
