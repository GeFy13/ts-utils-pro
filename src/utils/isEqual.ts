const hasOwn = (obj: object, key: PropertyKey): boolean =>
  Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Performs deep equality check with support for circular references.
 */
export function isEqual(a: unknown, b: unknown): boolean {
  const visited = new WeakMap<object, object>();

  const compare = (left: unknown, right: unknown): boolean => {
    if (Object.is(left, right)) {
      return true;
    }

    if (typeof left !== 'object' || left === null || typeof right !== 'object' || right === null) {
      return false;
    }

    if (visited.get(left) === right) {
      return true;
    }
    visited.set(left, right);

    if (left.constructor !== right.constructor) {
      return false;
    }

    if (left instanceof Date && right instanceof Date) {
      return left.getTime() === right.getTime();
    }

    if (left instanceof RegExp && right instanceof RegExp) {
      return left.source === right.source && left.flags === right.flags;
    }

    if (left instanceof Map && right instanceof Map) {
      if (left.size !== right.size) {
        return false;
      }

      for (const [key, value] of left.entries()) {
        if (!right.has(key)) {
          return false;
        }
        if (!compare(value, right.get(key))) {
          return false;
        }
      }
      return true;
    }

    if (left instanceof Set && right instanceof Set) {
      if (left.size !== right.size) {
        return false;
      }

      for (const value of left.values()) {
        if (!right.has(value)) {
          return false;
        }
      }
      return true;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
      if (left.length !== right.length) {
        return false;
      }

      for (let i = 0; i < left.length; i += 1) {
        if (!compare(left[i], right[i])) {
          return false;
        }
      }
      return true;
    }

    const leftKeys = Reflect.ownKeys(left);
    const rightKeys = Reflect.ownKeys(right);

    if (leftKeys.length !== rightKeys.length) {
      return false;
    }

    for (const key of leftKeys) {
      if (!hasOwn(right, key)) {
        return false;
      }

      if (!compare((left as Record<PropertyKey, unknown>)[key], (right as Record<PropertyKey, unknown>)[key])) {
        return false;
      }
    }

    return true;
  };

  return compare(a, b);
}
