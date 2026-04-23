import { assertIsDefined } from '../../src/utils/assertIsDefined';

describe('assertIsDefined', () => {
  it('не выбрасывает ошибку для определенных значений', () => {
    const value: string | undefined = 'ок';

    expect(() => assertIsDefined(value)).not.toThrow();
  });

  it('выбрасывает ошибку для undefined', () => {
    const value: string | undefined = undefined;

    expect(() => assertIsDefined(value, 'значение отсутствует')).toThrow('значение отсутствует');
  });
});
