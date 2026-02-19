import type { Func } from "../types";

type Success<T> = readonly [null, T];
type Failure<E> = readonly [E, null];
type Result<E, T> = Success<T> | Failure<E>;

export function tryCatch<E = Error, T = unknown>(
  operation: Func<T>,
): Result<E, T>;
export function tryCatch<E = Error, T = Promise<unknown>>(
  operation: T,
): Promise<Result<E, T>>;
export function tryCatch<E = Error, T = unknown>(
  operation: Promise<T> | Func<T>,
): Result<E, T> | Promise<Result<E, T>> {
  if (operation instanceof Promise) {
    return operation
      .then((value: T) => [null, value] as const)
      .catch((error: E) => [error, null] as const);
  }
  try {
    const data = operation();
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}
