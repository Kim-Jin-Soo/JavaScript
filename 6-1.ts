// 점 표기법으로 중첩 객체 접근 타입 안전하게 구현

// 1. 가능한 모든 경로 추출
type Paths<T, D extends string = "."> = T extends object
  ? {
      [K in keyof T & (string | number)]: K extends string | number
        ? T[K] extends object
          ? `${K}` | `${K}${D}${Paths<T[K], D>}`
          : `${K}`
        : never;
    }[keyof T & (string | number)]
  : never;

// 2. 경로에 해당하는 값 타입 추출
type PathValue<T, P extends string> = P extends `${infer Key}${infer Rest}`
  ? Key extends keyof T
    ? Rest extends `.${infer Next}`
      ? PathValue<T[Key], Next>
      : T[Key]
    : never
  : never;

// 3. 타입 안전 getter 구현
function get<T, P extends Paths<T>>(obj: T, path: P): PathValue<T, P> {
  const keys = path.split(".");
  let result: any = obj;
  for (const key of keys) {
    result = result[key];
  }
  return result;
}

// 4. 타입 안전 setter 구현 (불변성 유지)
function set<T, P extends Paths<T>>(
  obj: T,
  path: P,
  value: PathValue<T, P>
): T {
  const keys = path.split(".");

  const update = (current: any, pathKeys: string[]): any => {
    const [head, ...tail] = pathKeys;

    // 마지막 키에 도달했을 때 값 교체
    if (tail.length === 0) {
      return { ...current, [head]: value };
    }

    // 재귀적으로 깊은 복사 수행
    return {
      ...current,
      [head]: update(current[head], tail),
    };
  };

  return update(obj, keys);
}

// 테스트
interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    connection: {
      url: string;
      pool: {
        min: number;
        max: number;
      };
    };
  };
}

const config: Config = {
  server: { host: "localhost", port: 3000 },
  database: {
    connection: {
      url: "mongodb://localhost",
      pool: { min: 5, max: 20 },
    },
  },
};

const host = get(config, "server.host"); // string
const poolMax = get(config, "database.connection.pool.max"); // number
