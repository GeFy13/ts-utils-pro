import { groupBy } from '../../src/utils/groupBy';

describe('groupBy', () => {
  it('groups by object key', () => {
    const users = [
      { id: 1, role: 'admin' },
      { id: 2, role: 'user' },
      { id: 3, role: 'admin' }
    ] as const;

    const grouped = groupBy(users, 'role');

    expect(grouped.admin).toHaveLength(2);
    expect(grouped.user).toHaveLength(1);
  });

  it('groups by selector callback', () => {
    const numbers = [1, 2, 3, 4, 5];

    const grouped = groupBy(numbers, (value) => (value % 2 === 0 ? 'even' : 'odd'));

    expect(grouped.even).toEqual([2, 4]);
    expect(grouped.odd).toEqual([1, 3, 5]);
  });
});
