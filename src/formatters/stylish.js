const indent = (depth, spacesCount = 4) => ' '.repeat(Math.max(0, depth * spacesCount - 2));

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }
  const entries = Object.entries(value);
  const lines = entries.map(([k, v]) => `${indent(depth + 1)}  ${k}: ${stringify(v, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth)}  }`;
};

const stylish = (diffTree, depth = 0) => {
  const lines = diffTree.map((node) => {
    const { key, type, value, oldValue, newValue, children } = node;
    const currentIndent = indent(depth);

    switch (type) {
      case 'nested':
        // Убираем скобки вокруг children, они добавятся в рекурсии
        return `${currentIndent}  ${key}: {\n${stylish(children, depth + 1)}\n${currentIndent}  }`;
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${currentIndent}- ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return `${currentIndent}- ${key}: ${stringify(oldValue, depth)}\n${currentIndent}+ ${key}: ${stringify(newValue, depth)}`;
      case 'unchanged':
        return `${currentIndent}  ${key}: ${stringify(value, depth)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  const result = lines.join('\n');
  
  // Добавляем скобки ТОЛЬКО на самом верхнем уровне (depth === 0)
  return depth === 0 ? `{\n${result}\n}` : result;
};

export default stylish;