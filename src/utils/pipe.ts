type Unary<I, O> = (input: I) => O;

/**
 * Composes unary functions left-to-right.
 */
export function pipe<A, B>(ab: Unary<A, B>): Unary<A, B>;
export function pipe<A, B, C>(ab: Unary<A, B>, bc: Unary<B, C>): Unary<A, C>;
export function pipe<A, B, C, D>(ab: Unary<A, B>, bc: Unary<B, C>, cd: Unary<C, D>): Unary<A, D>;
export function pipe<A, B, C, D, E>(
  ab: Unary<A, B>,
  bc: Unary<B, C>,
  cd: Unary<C, D>,
  de: Unary<D, E>
): Unary<A, E>;
export function pipe(
  ...fns: ReadonlyArray<Unary<unknown, unknown>>
): Unary<unknown, unknown> {
  return (input: unknown): unknown => {
    return fns.reduce((acc, fn) => fn(acc), input);
  };
}
