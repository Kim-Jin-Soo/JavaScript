interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  timestamp: Date;
}

// 1. 응답에서 데이터 안전하게 추출
function extractData<T>(response: ApiResponse<T>): NonNullable<T> {
  if (response.data === null) {
    throw new Error(response.error || "데이터가 존재하지 않습니다.");
  }
  return response.data as NonNullable<T>;
}

// 2. 여러 Promise 결과를 안전하게 처리
type PromiseResults<T extends Promise<any>[]> = {
  [K in keyof T]: Awaited<T[K]>;
};

async function safeAll<T extends Promise<any>[]>(
  ...promises: T
): Promise<PromiseResults<T>> {
  // Promise.all을 사용하여 병렬로 처리하고 결과를 배열로 반환
  return (await Promise.all(promises)) as PromiseResults<T>;
}

// 3. 옵셔널 체이닝 결과 타입 처리
interface DeepObject {
  level1?: {
    level2?: {
      level3?: {
        value: string;
      };
    };
  };
}

// 안전하게 값 추출 (Optional Chaining 활용)
function getDeepValue(obj: DeepObject): string | undefined {
  // ?. 연산자를 사용하여 중간 단계가 undefined여도 에러 없이 접근
  return obj.level1?.level2?.level3?.value;
}
