type IsObject<T> = T extends object
  ? T extends Function
    ? false
    : true
  : false;

type ExcludeObjectProps<T> = {
  [K in keyof T]: IsObject<T[K]> extends true ? never : K;
}[keyof T];

/**
 * This type is responsible for returning a type that doesn't contain properties with object types any more
 */
export type ExcludeRefs<T> = Pick<T, ExcludeObjectProps<T>>;
