const isOperator = value => {
  return ['+', '-', '*', '/', '%', '(', ')'].includes(value);
};

const isNumber = value => {
  if (value === '.') {
    return true;
  }
  return !isNaN(value);
};

function tokenizer(expression: string): string[] {
  const tokens = [];
  [].forEach.call(expression, value => {
    if (isOperator(value)) {
      tokens.push(value);
    } else if (isNewNumber(value, tokens)) {
      tokens.push(value);
    } else if (isContinuingNumber(value, tokens)) {
      tokens[tokens.length - 1] = topOfArray(tokens) + value;
    }
  });
  return tokens;
}

function isNewNumber(value, tokens) {
  if (!topOfArray(tokens)) return true;
  return isOperator(topOfArray(tokens)) && isNumber(value);
}

function isContinuingNumber(value, tokens) {
  return isNumber(topOfArray(tokens)) && isNumber(value);
}

function topOfArray(tokens: string[]) {
  return tokens[tokens.length - 1];
}

export default tokenizer;
