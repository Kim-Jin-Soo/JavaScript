type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

//TODO: 다음 함수들을 구현하세요

// 1. stringify: JsonValue를 문자열로 변환
function stringify(value: JsonValue): string {
  //TODO
  return JSON.stringify(value);
}

// 2. getType: JsonValue의 타입을 문자열로 반환
function getType(value: JsonValue): string {
  //TODO
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

// 3. deepClone: JsonValue를 깊은 복사
function deepClone(value: JsonValue): JsonValue {
  //TODO
  return JSON.parse(JSON.stringify(value));
}

// 테스트
console.log(stringify("hello")); // "hello"
console.log(stringify(42)); // "42"
console.log(stringify([1, 2, 3])); // "[1,2,3]"
console.log(stringify({ a: 1 })); // '{"a":1}'

console.log(getType("hello")); // "string"
console.log(getType([1, 2])); // "array"
console.log(getType({ a: 1 })); // "object"
console.log(getType(null)); // "null"
