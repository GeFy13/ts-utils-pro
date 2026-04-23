import { deepClone } from '../../src/utils/deepClone';

describe('deepClone', () => {
  it('clones nested object without shared refs', () => {
    const source = {
      user: { id: 1, tags: ['a', 'b'] },
      createdAt: new Date('2020-01-01')
    };

    const cloned = deepClone(source);

    expect(cloned).toEqual(source);
    expect(cloned).not.toBe(source);
    expect(cloned.user).not.toBe(source.user);
    expect(cloned.user.tags).not.toBe(source.user.tags);
    expect(cloned.createdAt).not.toBe(source.createdAt);
  });

  it('keeps circular links', () => {
    const source: { self?: unknown } = {};
    source.self = source;

    const cloned = deepClone(source) as { self: unknown };

    expect(cloned).not.toBe(source);
    expect(cloned.self).toBe(cloned);
  });
});
