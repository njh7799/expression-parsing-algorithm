import calculate from './calculate';

describe('', () => {
  it('should', () => {
    // given
    const input = '4*(3-2)+5';

    // when
    const output = calculate(input);

    // then
    const expectedOutput = 9;
    expect(output).toEqual(expectedOutput);
  });

  it('should', () => {
    // given
    const input = '((1+5)/(6-3))*5';

    // when
    const output = calculate(input);

    // then
    const expectedOutput = 10;
    expect(output).toEqual(expectedOutput);
  });

  it('should tokenize expression', () => {
    // given
    const input = '-1-((-1)-(-1))';

    // when
    const output = calculate(input);

    // then
    const expectedOutput = -1;
    expect(output).toEqual(expectedOutput);
  });
});
