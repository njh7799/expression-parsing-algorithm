import tokenizer from './tokenizer';

describe('tokenizer', () => {
  it('should tokenize expression', () => {
    // given
    const input = '40*(3.5-22)+5';

    // when
    const output = tokenizer(input);

    // then
    const expectedOutput = ['40', '*', '(', '3.5', '-', '22', ')', '+', '5'];
    expect(output).toEqual(expectedOutput);
  });

  it('should tokenize expression', () => {
    // given
    const input = '((1+5)/(6-3))*5';

    // when
    const output = tokenizer(input);

    // then
    const expectedOutput = [
      '(',
      '(',
      '1',
      '+',
      '5',
      ')',
      '/',
      '(',
      '6',
      '-',
      '3',
      ')',
      ')',
      '*',
      '5',
    ];
    expect(output).toEqual(expectedOutput);
  });
});
