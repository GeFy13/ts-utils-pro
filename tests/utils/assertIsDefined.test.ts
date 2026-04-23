import { assertIsDefined } from '../../src/utils/assertIsDefined';

describe('assertIsDefined', () => {
  it('does not throw for defined values', () => {
    const value: string | undefined = 'ok';

    expect(() => assertIsDefined(value)).not.toThrow();
  });

  it('throws for undefined', () => {
    const value: string | undefined = undefined;

    expect(() => assertIsDefined(value, 'missing')).toThrow('missing');
  });
});
