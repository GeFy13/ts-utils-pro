import { isEqual } from '../../src/utils/isEqual';

describe('isEqual', () => {
  it('compares nested objects and arrays', () => {
    expect(
      isEqual(
        { user: { id: 1, tags: ['a', 'b'] } },
        { user: { id: 1, tags: ['a', 'b'] } }
      )
    ).toBe(true);
  });

  it('returns false for different values', () => {
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('supports circular references', () => {
    const a: { self?: unknown } = {};
    const b: { self?: unknown } = {};
    a.self = a;
    b.self = b;

    expect(isEqual(a, b)).toBe(true);
  });
});
