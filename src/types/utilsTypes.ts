// returns all possible paths into a nested Record where a path
// is a string of foo.bar where bar is a nested key of foo
export type PathInto<T extends Record<string, unknown>> = keyof {
  [K in Extract<keyof T, string> as T[K] extends string
    ? K
    : T[K] extends Record<string, unknown>
      ? `${K}.${PathInto<T[K]>}`
      : never]: unknown;
};
// makes all the items is an object not required recursively
export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;
// makes all the items is an object required recursively
export type DeepRequired<T> = T extends object
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : T;
//returns the return base of a type
export type Flatten<T> =
  T extends Promise<infer R>
    ? Flatten<R>
    : T extends readonly (infer R)[]
      ? Flatten<R>
      : T;
