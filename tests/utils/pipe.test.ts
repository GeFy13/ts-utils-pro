import { pipe } from '../../src/utils/pipe';

describe('pipe', () => {
  it('applies functions left-to-right', () => {
    const transform = pipe(
      (value: number) => value + 2,
      (value: number) => value * 3,
      (value: number) => `v:${value}`
    );

    expect(transform(2)).toBe('v:12');
  });
});
