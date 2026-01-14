type ApiEvent =
  | { type: "request"; url: string; method: string }
  | { type: "response"; status: number; data: unknown }
  | { type: "error"; message: string; code: number }
  | { type: "timeout"; duration: number }
  | { type: "retry"; attempt: number; maxAttempts: number };

// 1. 성공 이벤트만 추출 (request, response)
type SuccessEvent = /* 구현하세요 */;

// 2. 실패 이벤트만 추출 (error, timeout)
type FailureEvent = /* 구현하세요 */;

// 3. 특정 타입의 이벤트 추출 함수
function filterEvents<T extends ApiEvent["type"]>(
  events: ApiEvent[],
  type: T
): Extract<ApiEvent, { type: T }>[] {
  // 구현하세요
  return events.filter((e): e is Extract<ApiEvent, { type: T }> => e.type === type);
}

// 4. 이벤트 핸들러 타입
type EventHandler<T extends ApiEvent["type"]> = (
  event: Extract<ApiEvent, { type: T }>
) => void;

// 이벤트 디스패처 구현
class EventDispatcher {
  private handlers = new Map<string, Function[]>();

  on<T extends ApiEvent["type"]>(type: T, handler: EventHandler<T>): void {
    // 구현하세요
    const currentHandlers = this.handlers.get(type) || [];
    this.handlers.set(type, [...currentHandlers, handler]);
  }

  dispatch(event: ApiEvent): void {
    // 구현하세요
    const eventHandlers = this.handlers.get(event.type);
    if (eventHandlers) {
      eventHandlers.forEach((handler) => handler(event));
    }
  }
}