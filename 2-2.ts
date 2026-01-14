// API 함수들
async function fetchUser(id: number) {
  return { id, name: "User", email: "user@test.com" };
}

async function fetchPosts(userId: number, page: number = 1) {
  return [{ id: 1, title: "Post 1", userId }];
}

async function createPost(userId: number, title: string, content: string) {
  return { id: Date.now(), userId, title, content };
}

// 1. 각 함수의 반환 타입 추출
type User = Awaited<ReturnType<typeof fetchUser>>;
type Post = Awaited<ReturnType<typeof fetchPosts>>[number];
type NewPost = Awaited<ReturnType<typeof createPost>>;

// 2. 각 함수의 매개변수 타입 추출
type FetchUserParams = Parameters<typeof fetchUser>;
type FetchPostsParams = Parameters<typeof fetchPosts>;
type CreatePostParams = Parameters<typeof createPost>;

// 3. 로깅 래퍼 함수 구현
function withLogging<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  name: string
): (...args: Parameters<T>) => ReturnType<T> {
  // 구현하세요 - 함수 호출 전후로 로그 출력
  return (async (...args: Parameters<T>) => {
    console.log(`[${name}] 호출 시작:`, args);
    try {
      const result = await fn(...args);
      console.log(`[${name}] 호출 성공`);
      return result;
    } catch (error) {
      console.error(`[${name}] 호출 실패:`, error);
      throw error;
    }
  }) as any; // ReturnType<T> 호환을 위한 타입 단언
}

// 4. 재시도 래퍼 함수 구현
function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  maxRetries: number
): (...args: Parameters<T>) => ReturnType<T> {
  // 구현하세요 - 실패 시 재시도
  return (async (...args: Parameters<T>) => {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error;
        console.log(`재시도 중... (${attempt}/${maxRetries})`);
      }
    }
    throw lastError;
  }) as any;
}
