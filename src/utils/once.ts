type UnknownFunction = (...args: never[]) => unknown;

/**
 * Оборачивает функцию так, чтобы она выполнилась только один раз.
 */
export function once<F extends UnknownFunction>(fn: F): F {
  let called = false;
  let result: ReturnType<F> | undefined;

  const wrapped = (...args: Parameters<F>): ReturnType<F> => {
    if (!called) {
      called = true;
      result = fn(...args) as ReturnType<F>;
    }

    return result as ReturnType<F>;
  };

  return wrapped as F;
}
