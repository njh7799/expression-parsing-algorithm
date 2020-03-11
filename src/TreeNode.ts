enum NodeID {
  OPENBRACKET = 'OPENBRACKET',
  CLOSEBRACKET = 'CLOSEBRACKET',
  NUMBER = 'NUMBER',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  NEGATIVE = 'NEGATIVE',
  TIMES = 'TIMES',
  DIVIDE = 'DIVIDE',
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
      case '(':
        return new TreeNode(NodeID.OPENBRACKET, 1, null);
      case ')':
        return new TreeNode(NodeID.CLOSEBRACKET, 1, null);
      case '+':
        return new TreeNode(NodeID.PLUS, 2, null);
      case '-':
        return new TreeNode(NodeID.MINUS, 2, null);
      case 'negative':
        return new TreeNode(NodeID.NEGATIVE, 3, null);
      case '*':
        return new TreeNode(NodeID.TIMES, 4, null);
      case '/':
        return new TreeNode(NodeID.DIVIDE, 4, null);
    }
  }
}

function isNumber(value): boolean {
  return !isNaN(value);
}

export default TreeNode;
