type UnknownFunction = (...args: never[]) => unknown;

const RESULT = Symbol('memoized-result');

type CacheNode = Map<unknown, CacheNode | unknown>;

/**
 * Меморизирует функцию, кешируя результат для каждого уникального набора аргументов.
 */
export function memoize<F extends UnknownFunction>(fn: F): F {
  const root: CacheNode = new Map();

  const memoized = (...args: Parameters<F>): ReturnType<F> => {
    let node: CacheNode = root;

    for (const arg of args) {
      const next = node.get(arg);
      if (!(next instanceof Map)) {
        const created: CacheNode = new Map();
        node.set(arg, created);
        node = created;
      } else {
        node = next;
      }
    }

    if (node.has(RESULT)) {
      return node.get(RESULT) as ReturnType<F>;
    }

    const result = fn(...args);
    node.set(RESULT, result);
    return result as ReturnType<F>;
  };

  return memoized as F;
}
