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

function isNumber(value: string): boolean {
  return String(Number(value)) === value;
}

export default TreeNode;
