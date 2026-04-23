import { once } from '../../src/utils/once';

describe('once', () => {
  it('executes only first time and returns cached result', () => {
    const fn = jest.fn((a: number, b: number) => a + b);
    const wrapped = once(fn);

    expect(wrapped(2, 3)).toBe(5);
    expect(wrapped(10, 20)).toBe(5);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
