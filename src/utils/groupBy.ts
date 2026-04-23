/**
 * Groups array items by object key or by selector callback.
 */
export function groupBy<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  array: readonly T[],
  key: K
): Record<string, T[]>;
export function groupBy<T>(
  array: readonly T[],
  keySelector: (item: T) => PropertyKey
): Record<string, T[]>;
export function groupBy<T extends Record<PropertyKey, unknown>>(
  array: readonly T[],
  keyOrSelector: keyof T | ((item: T) => PropertyKey)
): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  for (const item of array) {
    const rawKey =
      typeof keyOrSelector === 'function' ? keyOrSelector(item) : item[keyOrSelector];
    const stringKey = String(rawKey);

    if (!result[stringKey]) {
      result[stringKey] = [];
    }

    result[stringKey].push(item);
  }

  return result;
}
