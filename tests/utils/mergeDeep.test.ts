import { mergeDeep } from '../../src/utils/mergeDeep';

describe('mergeDeep', () => {
  it('глубоко объединяет вложенные объекты', () => {
    const a = {
      user: {
        profile: {
          name: 'Alice',
          age: 20
        }
      }
    };

    const b = {
      user: {
        profile: {
          age: 21
        },
        active: true
      }
    };

    const merged = mergeDeep(a, b);

    expect(merged).toEqual({
      user: {
        profile: {
          name: 'Alice',
          age: 21
        },
        active: true
      }
    });
  });

  it('заменяет массивы значениями из второго объекта', () => {
    const merged = mergeDeep({ list: [1, 2] }, { list: [3] });

    expect(merged.list).toEqual([3]);
  });
});
