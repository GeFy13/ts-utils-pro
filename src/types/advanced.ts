/**
 * Извлекает домен и действие из имени события вида "user:created".
 */
export type ParseEventName<T extends string> =
  T extends `${infer Domain}:${infer Action}`
    ? { domain: Domain; action: Action }
    : never;

/**
 * Преобразует readonly-кортеж в объединение разобранных дескрипторов событий.
 */
export type EventTupleToDescriptors<T extends readonly string[]> = ParseEventName<T[number]>;
