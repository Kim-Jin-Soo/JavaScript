// 1. 모든 속성을 nullable로 (기존 타입에 null 허용 추가)
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// 2. 옵셔널 속성만 추출
// {} extends { [K]: T[K] } 성질을 이용해 해당 속성이 생략 가능한지 체크합니다.
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type PickOptional<T> = Pick<T, OptionalKeys<T>>;

// 3. 필수 속성만 추출
// 반대로 {} 가 Pick<T, K>에 포함되지 않으면 필수 속성입니다.
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type PickRequired<T> = Pick<T, RequiredKeys<T>>;

// 4. 두 타입 병합 (후자 우선)
// Omit을 사용해 T에서 U와 겹치는 키를 제거한 후 U와 합칩니다.
type Merge<T, U> = Omit<T, keyof U> & U;

// 5. 두 타입의 차이 (T에만 있는 속성)
// Exclude를 통해 T의 키 중 U에 존재하는 키를 제외한 나머지만 Pick합니다.
type Diff<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

// 테스트
interface A {
  id: number;
  name?: string;
  email: string;
}

interface B {
  name: string;
  age: number;
}

type OptionalOfA = PickOptional<A>; // { name?: string }
type RequiredOfA = PickRequired<A>; // { id: number; email: string }
type Merged = Merge<A, B>; // { id: number; name: string; email: string; age: number }
type OnlyInA = Diff<A, B>; // { id: number; email: string }
