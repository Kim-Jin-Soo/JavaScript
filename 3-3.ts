// 1. camelCase를 kebab-case로
type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${CamelToKebab<U>}`
    : `${Lowercase<T>}-${CamelToKebab<Uncapitalize<U>>}`
  : S;

// 2. kebab-case를 camelCase로
type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}${KebabToCamel<Capitalize<U>>}`
  : S;

// 3. 문자열 분할
type Split<
  S extends string,
  D extends string
> = S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : S extends ""
  ? []
  : [S];

// 4. 문자열 결합
type Join<T extends string[], D extends string> = T extends [
  infer F,
  ...infer R
]
  ? R extends string[]
    ? R["length"] extends 0
      ? F
      : `${F & string}${D}${Join<R, D>}`
    : never
  : "";
