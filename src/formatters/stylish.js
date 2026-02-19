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
  // Если depth не передан, начинаем с 0, но тогда indent будет отрицательным
  // Поэтому добавим защиту
  const currentDepth = depth === undefined ? 0 : depth;
  
  const lines = diffTree.map((node) => {
    const { key, type, value, oldValue, newValue, children } = node;
    const currentIndent = indent(currentDepth);

    switch (type) {
      case 'nested':
        return `${currentIndent}  ${key}: {\n${stylish(children, currentDepth + 1)}\n${currentIndent}  }`;
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(value, currentDepth)}`;
      case 'removed':
        return `${currentIndent}- ${key}: ${stringify(value, currentDepth)}`;
      case 'changed':
        return `${currentIndent}- ${key}: ${stringify(oldValue, currentDepth)}\n${currentIndent}+ ${key}: ${stringify(newValue, currentDepth)}`;
      case 'unchanged':
        return `${currentIndent}  ${key}: ${stringify(value, currentDepth)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default stylish;