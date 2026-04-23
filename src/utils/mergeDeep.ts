type Builtin =
  | Date
  | RegExp
  | Function
  | Map<unknown, unknown>
  | Set<unknown>
  | readonly unknown[];

type IsPlainObject<T> = T extends object ? (T extends Builtin ? false : true) : false;

/**
 * Рекурсивно объединяет поля обычных объектов из B в A и возвращает объединенный тип.
 */
export type DeepMerge<A, B> = IsPlainObject<A> extends true
  ? IsPlainObject<B> extends true
    ? {
        [K in keyof A | keyof B]: K extends keyof B
          ? K extends keyof A
            ? DeepMerge<A[K], B[K]>
            : B[K]
          : K extends keyof A
            ? A[K]
            : never;
      }
    : B
  : B;

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp) &&
    !(value instanceof Map) &&
    !(value instanceof Set)
  );
};

export function mergeDeep<A, B>(a: A, b: B): DeepMerge<A, B> {
  if (!isPlainObject(a) || !isPlainObject(b)) {
    return b as DeepMerge<A, B>;
  }

  const result: Record<string, unknown> = { ...a };

  for (const [key, value] of Object.entries(b)) {
    const sourceValue = result[key];

    if (isPlainObject(sourceValue) && isPlainObject(value)) {
      result[key] = mergeDeep(sourceValue, value);
      continue;
    }

    if (Array.isArray(value)) {
      result[key] = value.slice();
      continue;
    }

    result[key] = value;
  }

  return result as DeepMerge<A, B>;
}
