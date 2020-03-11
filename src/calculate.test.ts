import calculate from './calculate';

describe('', () => {
  it('should calculate single expression', () => {
    // given
    const input = '4';

    // when
    const output = calculate(input);

    // then
    const expectedOutput = 4;
    expect(output).toEqual(expectedOutput);
  });

  it('should calculate expression', () => {
    // given
    const input = '4*(3-2)+5';

    // when
    const output = calculate(input);

    // then
    const expectedOutput = 9;
    expect(output).toEqual(expectedOutput);
  });

  it('should calculate expression with double-bracket', () => {
    // given
    const input = '((1+5)/(6-3))*5';

    // when
    const output = calculate(input);

    // then
    const expectedOutput = 10;
    expect(output).toEqual(expectedOutput);
  });

  it('should calculate negative sign', () => {
    // given
    const input = '-1-((-1)-(-1))';

    // when
    const output = calculate(input);

    // then
    const expectedOutput = -1;
    expect(output).toEqual(expectedOutput);
  });

  it('should calculate uncompleted expression', () => {
    // given
    const input = '((1+2)*5)-';

    // when
    const output = calculate(input);

    // then
    const expectedOutput = 15;
    expect(output).toEqual(expectedOutput);
  });

  it('should throw Syntax Error because of invalid input', () => {
    // given
    const input = '123a';

    // when
    const t = () => calculate(input);

    // then
    expect(t).toThrow(SyntaxError);
  });

  it('should throw Syntax Error because of consecutive operator', () => {
    // given
    const input = '((1+-2)**5)/-*5';

    // when
    const t = () => calculate(input);
    // then
    expect(t).toThrow(SyntaxError);
  });

  it('should throw Syntax Error since bracket does not match', () => {
    // given
    const input = '12+(4+';

    // when
    const t = () => calculate(input);

    // then
    expect(t).toThrow(SyntaxError);
  });

  it('should throw Syntax Error since bracket does not match', () => {
    // given
    const input = '12+)4+';

    // when
    const t = () => calculate(input);

    // then
    expect(t).toThrow(SyntaxError);
  });

  it('should throw Syntax Error because of empty bracket', () => {
    // given
    const input = '12+()+4';

    // when
    const t = () => calculate(input);

    // then
    expect(t).toThrow(SyntaxError);
  });
});
