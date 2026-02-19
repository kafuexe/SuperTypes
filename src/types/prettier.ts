// converts a type to promise and function's return type to a promise
export type Promisify<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promisify<R>
  : T extends Promise<unknown>
    ? T
    : Promise<T>;
// represents a function with up to 3 parameters and a return type
export type Func<P1, P2 = never, P3 = never, P4 = never> = [P2] extends [never]
  ? () => P1
  : [P3] extends [never]
    ? (arg1: P1) => P2
    : [P4] extends [never]
      ? (arg1: P1, arg2: P2) => P3
      : (arg1: P1, arg2: P2, arg3: P3) => P4;
// represents an async function with up to 3 parameters and a return type
export type AsyncFunc<P1, P2 = never, P3 = never, P4 = never> = Promisify<
  Func<P1, P2, P3, P4>
>;
// represents a void returning function with up to 3 parameters
export type Action<P1 = never, P2 = never, P3 = never> = [P1] extends [never]
  ? Func<void>
  : [P2] extends [never]
    ? Func<P1, void>
    : [P3] extends [never]
      ? Func<P1, void>
      : Func<P1, P2, void>;
// represents a void returning async function with up to 3 parameters
export type AsyncAction<P1 = never, P2 = never, P3 = never> = Promisify<
  Action<P1, P2, P3>
>;

// returns a Nullable type
export type Nullable<T> = T | null;
// returns an Undefinable type
export type Undefinable<T> = T | undefined;
// returns the type of the values of an object
export type ValueOf<T> = T[keyof T];
// returns a type that has all keys of T Showing
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
// enables autocomplete on a string type while still allowing non strict values
export type AutoComplete<T extends string> = T | (string & {});
