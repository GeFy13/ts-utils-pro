/**
 * Assertion-хелпер, который сужает nullable-значение до NonNullable.
 */
export function assertIsDefined<T>(value: T, message = 'Expected value to be defined'): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
}
