/**
 * Создает глубокую копию массивов, обычных объектов, Map, Set, Date и RegExp.
 */
export function deepClone<T>(obj: T): T {
  const seen = new WeakMap<object, unknown>();

  const cloneValue = (value: unknown): unknown => {
    if (typeof value !== 'object' || value === null) {
      return value;
    }

    if (value instanceof Date) {
      return new Date(value.getTime());
    }

    if (value instanceof RegExp) {
      return new RegExp(value.source, value.flags);
    }

    if (seen.has(value)) {
      return seen.get(value);
    }

    if (Array.isArray(value)) {
      const arrClone: unknown[] = [];
      seen.set(value, arrClone);
      for (const item of value) {
        arrClone.push(cloneValue(item));
      }
      return arrClone;
    }

    if (value instanceof Map) {
      const mapClone = new Map<unknown, unknown>();
      seen.set(value, mapClone);
      for (const [key, nested] of value.entries()) {
        mapClone.set(cloneValue(key), cloneValue(nested));
      }
      return mapClone;
    }

    if (value instanceof Set) {
      const setClone = new Set<unknown>();
      seen.set(value, setClone);
      for (const nested of value.values()) {
        setClone.add(cloneValue(nested));
      }
      return setClone;
    }

    const result: Record<PropertyKey, unknown> = {};
    seen.set(value, result);
    for (const key of Reflect.ownKeys(value)) {
      result[key] = cloneValue((value as Record<PropertyKey, unknown>)[key]);
    }

    return result;
  };

  return cloneValue(obj) as T;
}
