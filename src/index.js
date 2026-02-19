import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diffTree = buildDiff(obj1, obj2);

  if (format === 'stylish') {
    // Передаём глубину 1, чтобы отступы для первого уровня стали 2 пробела
    return `{\n${stylish(diffTree, 1)}\n}`;
  }
  throw new Error(`Unknown format: ${format}`);
};

export default genDiff;
