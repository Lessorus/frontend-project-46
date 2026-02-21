const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return String(value);
};

const plain = (diffTree, path = '') => {
  const lines = diffTree.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return plain(node.children, currentPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default plain;