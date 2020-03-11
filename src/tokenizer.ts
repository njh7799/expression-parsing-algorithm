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
  [].forEach.call(expression, (value, key) => {
    const prevValue = expression[key - 1];
    if (isNegative(value, prevValue)) {
      tokens.push('negative');
    } else if (isOperator(value)) {
      tokens.push(value);
    } else if (isNewNumber(value, tokens)) {
      tokens.push(value);
    } else if (isContinuingNumber(value, tokens)) {
      tokens[tokens.length - 1] = topOfArray(tokens) + value;
    }
  });
  return tokens;
}

function isNegative(value, prevValue) {
  if (value !== '-') {
    return false;
  }
  if (!prevValue) {
    return true;
  }
  if (prevValue === '(') {
    return true;
  }
  return false;
}

function isNewNumber(value, tokens) {
  if (!topOfArray(tokens)) return true;
  return !isNumber(topOfArray(tokens)) && isNumber(value);
}

function isContinuingNumber(value, tokens) {
  return isNumber(topOfArray(tokens)) && isNumber(value);
}

function topOfArray(tokens: string[]) {
  return tokens[tokens.length - 1];
}

export default tokenizer;
