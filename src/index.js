import parseFile from './parsers.js';

const genDiff = (path1, path2) => {
  const obj1 = parseFile(path1);
  const obj2 = parseFile(path2);

  // Получаем все уникальные ключи из обоих объектов и сортируем их
  const allKeys = Object.keys({ ...obj1, ...obj2 }).sort();

  // Вместо создания пустого массива и цикла for...of,
  // мы сразу создаем итоговый массив строк через flatMap
  const lines = allKeys.flatMap((key) => {
    const in1 = Object.hasOwn(obj1, key);
    const in2 = Object.hasOwn(obj2, key);

    // СЛУЧАЙ 1: Ключ есть только в первом объекте (удален)
    if (in1 && !in2) {
      return `- ${key}: ${obj1[key]}`;
    }

    // СЛУЧАЙ 2: Ключа нет в первом, но есть во втором (добавлен)
    if (!in1 && in2) {
      return `+ ${key}: ${obj2[key]}`;
    }

    // СЛУЧАЙ 3: Ключ есть в обоих, но значения разные (изменен)
    if (in1 && in2 && obj1[key] !== obj2[key]) {
      // ВОТ ТУТ МАГИЯ flatMap:
      // Мы возвращаем массив из ДВУХ строк.
      return [
        `- ${key}: ${obj1[key]}`,
        `+ ${key}: ${obj2[key]}`,
      ];
    }

    // СЛУЧАЙ 4: Значения одинаковые (не изменился)
    return `  ${key}: ${obj1[key]}`;
  });

  // Собираем массив строк в одну финальную строку с фигурными скобками
  // Перед каждой строкой добавляем еще 2 пробела для красоты отступа
  return `{\n${lines.map((l) => `  ${l}`).join('\n')}\n}`;
};

export default genDiff;
