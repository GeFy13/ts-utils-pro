type UnknownFunction = (...args: never[]) => unknown;

/**
 * Создает debounce-обертку, откладывающую вызов функции до завершения тайм-окна.
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
