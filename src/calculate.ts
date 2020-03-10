enum NodeID {
  NUMBER = 'NUMBER',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  TIMES = 'TIMES',
  DIVIDE = 'DIVIDE',
  OPENBRACKET = 'OPENBRACKET',
  CLOSEBRACKET = 'CLOSEBRACKET',
}

class TreeNode {
  ID: NodeID;
  precedence: number;
  number: number | null;
  parent: TreeNode | null;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(ID, precedence, number) {
    this.ID = ID;
    this.precedence = precedence;
    this.number = number;
  }

  static getNode(value: string) {
    if (isNumber(value)) {
      return new TreeNode(NodeID.NUMBER, 10, Number(value));
    }
    switch (value) {
      case '+':
        return new TreeNode(NodeID.PLUS, 2, Number(value));
      case '-':
        return new TreeNode(NodeID.MINUS, 2, Number(value));
      case '*':
        return new TreeNode(NodeID.TIMES, 4, Number(value));
      case '/':
        return new TreeNode(NodeID.DIVIDE, 4, Number(value));
      case '(':
        return new TreeNode(NodeID.OPENBRACKET, 1, Number(value));
      case ')':
        return new TreeNode(NodeID.CLOSEBRACKET, 1, Number(value));
    }
  }
}

function calculate(input: string[]) {
  let currentNode = null;
  input.forEach(value => {
    currentNode = insertNodeItem(currentNode, TreeNode.getNode(value));
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

const insertNodeItem = (currentNode: TreeNode, newItem: TreeNode): TreeNode => {
  if (!currentNode) {
    currentNode = newItem;
    return currentNode;
  }
  if (currentNode.precedence < newItem.precedence) {
    connectTwoNodes(currentNode, newItem, 'right');
    currentNode = newItem;
    return currentNode;
  }
  if (newItem.ID === 'OPENBRACKET') {
    connectTwoNodes(currentNode, newItem, 'right');
    currentNode = newItem;
    return currentNode;
  }
  if (newItem.ID === 'CLOSEBRACKET') {
    const openBracketNode = findOpenBracket(currentNode);
    connectTwoNodes(openBracketNode.parent, openBracketNode.right, 'right');
    currentNode = openBracketNode.parent;
    return currentNode;
  }
  while (
    !isRoot(currentNode) &&
    currentNode.parent.precedence >= newItem.precedence
  ) {
    currentNode = currentNode.parent;
  }
  if (!isRoot(currentNode)) {
    connectTwoNodes(currentNode.parent, newItem, 'right');
  }
  connectTwoNodes(newItem, currentNode, 'left');
  currentNode = newItem;
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

function isRoot(node: TreeNode) {
  return !node.parent;
}

function isNumber(value: string): boolean {
  return String(Number(value)) === value;
}

export default calculate;
