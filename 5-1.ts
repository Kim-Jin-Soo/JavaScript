// 1. DeepPartial 구현
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// 2. DeepReadonly 구현
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? DeepReadonly<U>[]
    : T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

// 3. DeepRequired 구현
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[]
    ? DeepRequired<U>[]
    : T[P] extends object
    ? DeepRequired<T[P]>
    : T[P];
};

// 4. DeepNonNullable 구현
type DeepNonNullable<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[]
    ? DeepRequired<U>[]
    : T[P] extends object
    ? DeepRequired<T[P]>
    : T[P];
};

// 테스트
interface NestedConfig {
  server?: {
    host?: string;
    port?: number;
    ssl?: {
      enabled?: boolean;
      cert?: string | null;
    };
  };
  database?: {
    url?: string | null;
    pool?: {
      min?: number;
      max?: number;
    };
  };
}

type FullConfig = DeepRequired<DeepNonNullable<NestedConfig>>;
// 모든 속성이 필수이고 null이 아님
