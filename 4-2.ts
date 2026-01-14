interface User {
  id: number;
  name: string;
  email: string;
}
interface CreateUserDto {
  name: string;
  email: string;
}
interface UpdateUserDto {
  name?: string;
  email?: string;
}

// API 정의
interface ApiDefinition {
  request?: unknown;
  response: unknown;
  params?: unknown;
  query?: unknown;
}

interface UserApi {
  "GET /users": {
    response: User[];
    query: { page?: number; limit?: number };
  };
  "GET /users/:id": {
    response: User;
    params: { id: number };
  };
  "POST /users": {
    request: CreateUserDto;
    response: User;
  };
  "PUT /users/:id": {
    request: UpdateUserDto;
    response: User;
    params: { id: number };
  };
  "DELETE /users/:id": {
    response: void;
    params: { id: number };
  };
}

// 1. API 경로 추출
type ApiPath<T> = keyof T;

// 2. 특정 경로의 요청 타입
type RequestOf<T, P extends keyof T> = T[P] extends { request: infer Req }
  ? Req
  : never;

// 3. 특정 경로의 응답 타입
type ResponseOf<T, P extends keyof T> = T[P] extends { response: infer Res }
  ? Res
  : never;

// 4. API 클라이언트 구현
class ApiClient<T extends Record<string, ApiDefinition>> {
  async request<P extends keyof T>(
    path: P,
    options?: {
      params?: T[P] extends { params: infer Params } ? Params : never;
      query?: T[P] extends { query: infer Query } ? Query : never;
      body?: T[P] extends { request: infer Req } ? Req : never;
    }
  ): Promise<T[P] extends { response: infer Res } ? Res : never> {
    // 구현하세요
    // 1. HTTP 메서드와 URL 템플릿 분리 ("GET /users/:id" -> ["GET", "/users/:id"])
    const [method, urlTemplate] = (path as string).split(" ");
    let finalUrl = urlTemplate;

    // 2. Path 파라미터 치환 (:id -> 123)
    if (options?.params) {
      Object.entries(options.params as Record<string, any>).forEach(
        ([key, value]) => {
          finalUrl = finalUrl.replace(
            `:${key}`,
            encodeURIComponent(String(value))
          );
        }
      );
    }

    // 3. 쿼리 스트링 생성 (?page=1&limit=10)
    const queryString = options?.query
      ? `?${new URLSearchParams(options.query as any).toString()}`
      : "";

    // 4. Fetch 실행
    const response = await fetch(`${finalUrl}${queryString}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // DELETE 등 응답 값이 없는 경우 처리
    if (response.status === 204 || method === "DELETE") {
      return undefined as any;
    }

    return response.json();
  }
}

// 사용
const api = new ApiClient<UserApi>();
// const users = await api.request("GET /users", { query: { page: 1 } });
