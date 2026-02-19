const buildDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();

  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const in1 = Object.hasOwn(obj1, key);
    const in2 = Object.hasOwn(obj2, key);

    // Если оба значения – объекты (не null, не массивы) – рекурсия
    if (in1 && in2 && typeof value1 === 'object' && value1 !== null && !Array.isArray(value1)
        && typeof value2 === 'object' && value2 !== null && !Array.isArray(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      };
    }

    // Определяем тип изменения
    if (!in1 && in2) {
      return { key, type: 'added', value: value2 };
    }
    if (in1 && !in2) {
      return { key, type: 'removed', value: value1 };
    }
    if (in1 && in2 && value1 !== value2) {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        newValue: value2,
      };
    }
    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildDiff;