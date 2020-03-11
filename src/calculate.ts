import TreeNode from './TreeNode';
import tokenizer from './tokenizer';

function calculate(expression: string) {
  const tokens = tokenizer(expression);
  let currentNode = insertNode(null, TreeNode.getNode('('));
  tokens.forEach(value => {
    currentNode = insertNode(currentNode, TreeNode.getNode(value));
  });
  const openbracket = findOpenBracket(currentNode);
  const root = openbracket.right;
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
    case 'NEGATIVE':
      return -calculateNode(node.right);
    case 'TIMES':
      return calculateNode(node.left) * calculateNode(node.right);
    case 'DIVIDE':
      return calculateNode(node.left) / calculateNode(node.right);
    default:
      throw new SyntaxError(node.ID);
  }
}

const insertNode = (currentNode: TreeNode, newNode: TreeNode): TreeNode => {
  if (!currentNode) {
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
  while (comparePrecedence(currentNode, newNode) >= 0) {
    currentNode = currentNode.parent;
  }
  if (currentNode.right) {
    connectTwoNodes(newNode, currentNode.right, 'left');
  }
  connectTwoNodes(currentNode, newNode, 'right');
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

function comparePrecedence(currentNode: TreeNode, newNode: TreeNode) {
  return currentNode.precedence - newNode.precedence;
}

function isOpenBracket(node: TreeNode) {
  return node.ID === 'OPENBRACKET';
}

function isCloseBracket(node: TreeNode) {
  return node.ID === 'CLOSEBRACKET';
}

export default calculate;
