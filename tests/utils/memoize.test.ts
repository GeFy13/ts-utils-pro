import { memoize } from '../../src/utils/memoize';

describe('memoize', () => {
  it('кеширует результат по набору аргументов', () => {
    const fn = jest.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(memoized(2, 3)).toBe(5);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('использует идентичность объекта для объектных аргументов', () => {
    const fn = jest.fn((obj: { x: number }) => obj.x);
    const memoized = memoize(fn);
    const arg = { x: 5 };

    expect(memoized(arg)).toBe(5);
    expect(memoized(arg)).toBe(5);
    expect(memoized({ x: 5 })).toBe(5);

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
