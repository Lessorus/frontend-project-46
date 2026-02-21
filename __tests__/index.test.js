import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  // Плоские JSON (уже есть)
  test('genDiff should return correct diff for flat JSON', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    const expected = readFile('expected.txt').trim();
    const result = genDiff(path1, path2);
    expect(result).toBe(expected);
  });

  // Плоские YAML (уже есть)
  test('genDiff should return correct diff for flat YAML', () => {
    const path1 = getFixturePath('file1.yml');
    const path2 = getFixturePath('file2.yml');
    const expected = readFile('expected.txt').trim();
    const result = genDiff(path1, path2);
    expect(result).toBe(expected);
  });

  // Вложенные JSON
  test('genDiff should return correct diff for nested JSON (stylish format)', () => {
    const path1 = getFixturePath('file1_nested.json');
    const path2 = getFixturePath('file2_nested.json');
    const expected = readFile('expected_stylish.txt').trim();
    const result = genDiff(path1, path2);
    expect(result).toBe(expected);
  });

  // Вложенные YAML
  test('genDiff should return correct diff for nested YAML (stylish format)', () => {
    const path1 = getFixturePath('file1_nested.yml');
    const path2 = getFixturePath('file2_nested.yml');
    const expected = readFile('expected_stylish.txt').trim();
    const result = genDiff(path1, path2);
    expect(result).toBe(expected);
  });
});

test('genDiff should return correct diff for nested JSON (plain format)', () => {
  const path1 = getFixturePath('file1_nested.json');
  const path2 = getFixturePath('file2_nested.json');
  const expected = readFile('expected_plain.txt').trim();
  const result = genDiff(path1, path2, 'plain');
  expect(result).toBe(expected);
});

test('genDiff should return correct diff for nested YAML (plain format)', () => {
  const path1 = getFixturePath('file1_nested.yml');
  const path2 = getFixturePath('file2_nested.yml');
  const expected = readFile('expected_plain.txt').trim();
  const result = genDiff(path1, path2, 'plain');
  expect(result).toBe(expected);
});