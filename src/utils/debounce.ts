type UnknownFunction = (...args: never[]) => unknown;

/**
 * Creates a debounced function that delays execution until after the delay window.
 */
export function debounce<F extends UnknownFunction>(fn: F, delay: number): F {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<F>): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debounced as unknown as F;
}
