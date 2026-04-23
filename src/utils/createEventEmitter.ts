type EventMapBase = Record<string, unknown>;
type Handler<P> = (payload: P) => void;

export interface EventEmitter<Events extends EventMapBase> {
  on<K extends keyof Events>(event: K, handler: Handler<Events[K]>): () => void;
  off<K extends keyof Events>(event: K, handler: Handler<Events[K]>): void;
  emit<K extends keyof Events>(event: K, payload: Events[K]): void;
}

/**
 * Создает типизированный эмиттер событий.
 */
export function createEventEmitter<EventNames extends string>(): EventEmitter<Record<EventNames, unknown>>;
export function createEventEmitter<Events extends EventMapBase>(): EventEmitter<Events>;
export function createEventEmitter<Events extends EventMapBase>(): EventEmitter<Events> {
  const listeners = new Map<keyof Events, Set<Handler<Events[keyof Events]>>>();

  const on = <K extends keyof Events>(event: K, handler: Handler<Events[K]>): (() => void) => {
    const current = listeners.get(event) ?? new Set<Handler<Events[keyof Events]>>();
    current.add(handler as Handler<Events[keyof Events]>);
    listeners.set(event, current);

    return () => {
      off(event, handler);
    };
  };

  const off = <K extends keyof Events>(event: K, handler: Handler<Events[K]>): void => {
    const current = listeners.get(event);
    if (!current) {
      return;
    }

    current.delete(handler as Handler<Events[keyof Events]>);
    if (current.size === 0) {
      listeners.delete(event);
    }
  };

  const emit = <K extends keyof Events>(event: K, payload: Events[K]): void => {
    const current = listeners.get(event);
    if (!current) {
      return;
    }

    for (const handler of current) {
      (handler as Handler<Events[K]>)(payload);
    }
  };

  return { on, off, emit };
}
