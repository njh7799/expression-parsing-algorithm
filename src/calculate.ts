import TreeNode from './TreeNode';

function calculate(tokens: string[]) {
  let currentNode = null;
  tokens.forEach(value => {
    currentNode = insertNode(currentNode, TreeNode.getNode(value));
  });
  const root = findRoot(currentNode);
  return calculateNode(root);
}

function calculateNode(node: TreeNode): number {
  switch (node.ID) {
    case 'NUMBER':
      return node.number;
    case 'PLUS':
      return calculateNode(node.left) + calculateNode(node.right);
    case 'MINUS':
      return calculateNode(node.left) - calculateNode(node.right);
    case 'TIMES':
      return calculateNode(node.left) * calculateNode(node.right);
    case 'DIVIDE':
      return calculateNode(node.left) / calculateNode(node.right);
  }
}

const insertNode = (currentNode: TreeNode, newNode: TreeNode): TreeNode => {
  if (!currentNode) {
    currentNode = newNode;
    return currentNode;
  }
  if (isPrecedenceOfCurrentNodeHigherThannewNode(currentNode, newNode)) {
    connectTwoNodes(currentNode, newNode, 'right');
    currentNode = newNode;
    return currentNode;
  }
  if (isOpenBracket(newNode)) {
    connectTwoNodes(currentNode, newNode, 'right');
    currentNode = newNode;
    return currentNode;
  }
  if (isCloseBracket(newNode)) {
    const openBracketNode = findOpenBracket(currentNode);
    connectTwoNodes(openBracketNode.parent, openBracketNode.right, 'right');
    currentNode = openBracketNode.parent;
    return currentNode;
  }
  while (
    isPrecedenceOfCurrentParentNodeHigherThanNewNode(currentNode, newNode)
  ) {
    currentNode = currentNode.parent;
  }
  if (!isRoot(currentNode)) {
    connectTwoNodes(currentNode.parent, newNode, 'right');
  }
  connectTwoNodes(newNode, currentNode, 'left');
  currentNode = newNode;
  return currentNode;
};

function connectTwoNodes(parent: TreeNode, child: TreeNode, direction: string) {
  child.parent = parent;
  if (direction === 'right') {
    parent.right = child;
  }
  if (direction === 'left') {
    parent.left = child;
  }
}

function findOpenBracket(node: TreeNode): TreeNode {
  while (node.ID !== 'OPENBRACKET') {
    node = node.parent;
  }
  return node;
}

function findRoot(node: TreeNode): TreeNode {
  while (node.parent) {
    node = node.parent;
  }
  return node;
}

function isPrecedenceOfCurrentNodeHigherThannewNode(
  currentNode: TreeNode,
  newNode: TreeNode,
) {
  return currentNode.precedence < newNode.precedence;
}

function isPrecedenceOfCurrentParentNodeHigherThanNewNode(
  currentNode: TreeNode,
  newNode: TreeNode,
) {
  return (
    !isRoot(currentNode) && currentNode.parent.precedence >= newNode.precedence
  );
}

function isOpenBracket(node: TreeNode) {
  return node.ID === 'OPENBRACKET';
}

function isCloseBracket(node: TreeNode) {
  return node.ID === 'CLOSEBRACKET';
}

function isRoot(node: TreeNode) {
  return !node.parent;
}

export default calculate;
