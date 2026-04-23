import { once } from '../../src/utils/once';

describe('once', () => {
  it('выполняется только при первом вызове и возвращает кешированный результат', () => {
    const fn = jest.fn((a: number, b: number) => a + b);
    const wrapped = once(fn);

    expect(wrapped(2, 3)).toBe(5);
    expect(wrapped(10, 20)).toBe(5);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
