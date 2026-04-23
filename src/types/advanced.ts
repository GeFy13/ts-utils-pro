/**
 * Extracts domain and action from event names like "user:created".
 */
export type ParseEventName<T extends string> =
  T extends `${infer Domain}:${infer Action}`
    ? { domain: Domain; action: Action }
    : never;

/**
 * Converts a readonly tuple to a union of parsed event descriptors.
 */
export type EventTupleToDescriptors<T extends readonly string[]> = ParseEventName<T[number]>;
