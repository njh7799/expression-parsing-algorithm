import calculate from './calculate';

describe('', () => {
  it('should', () => {
    // given
    const input = ['5', '-', '6', '/', '2', '+', '3', '*', '4'];

    // when
    const output = calculate(input);

    // then
    const expectedOutput = 14;
    expect(output).toEqual(expectedOutput);
  });

  it('should', () => {
    // given
    const input = ['4', '*', '(', '3', '-', '2', ')', '+', '5'];

    // when
    const output = calculate(input);

    // then
    const expectedOutput = 9;
    expect(output).toEqual(expectedOutput);
  });
});
