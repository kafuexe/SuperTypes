type Success<T> = readonly [null, T];
type Failure<E> = readonly [E, null];
type Result<E, T> = Success<T> | Failure<E>;
type ResultAsync<E, T> = Promise<Result<E, T>>;

export function tryCatch<E = Error, T = Promise<any>>(
  operation: T,
): ResultAsync<E, T>;
export function tryCatch<E = Error, T = any>(operation: () => T): Result<E, T>;
export function tryCatch<E = Error, T = any>(
  operation: Promise<T> | (() => T),
): Result<E, T> | ResultAsync<E, T> {
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
