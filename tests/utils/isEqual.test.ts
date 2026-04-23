import { isEqual } from '../../src/utils/isEqual';

describe('isEqual', () => {
  it('сравнивает вложенные объекты и массивы', () => {
    expect(
      isEqual(
        { user: { id: 1, tags: ['a', 'b'] } },
        { user: { id: 1, tags: ['a', 'b'] } }
      )
    ).toBe(true);
  });

  it('возвращает false для разных значений', () => {
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('поддерживает циклические ссылки', () => {
    const a: { self?: unknown } = {};
    const b: { self?: unknown } = {};
    a.self = a;
    b.self = b;

    expect(isEqual(a, b)).toBe(true);
  });
});
