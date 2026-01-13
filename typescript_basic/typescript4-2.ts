//TODO: 다음 함수들을 타입 안전하게 구현하세요

// 1. 비동기 맵 함수
async function asyncMap<T, U>(
  items: T[],
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  //TODO
  return Promise.all(items.map((item, index) => callback(item, index)));
}

// 2. 이벤트 에미터 타입
interface EventMap {
  click: { x: number; y: number };
  keydown: { key: string; code: string };
  submit: { data: Record<string, string> };
}
type Listener<E> = (event: E) => void;

class TypedEventEmitter<T extends Record<string, any>> {
  //TODO: on, off, emit 메서드 구현
  private listeners: {
    [K in keyof T]?: Set<Listener<T[K]>>;
  } = {};

  on<K extends keyof T>(type: K, listener: Listener<T[K]>): void {
    (this.listeners[type] ??= new Set()).add(listener);
  }

  off<K extends keyof T>(type: K, listener: Listener<T[K]>): void {
    this.listeners[type]?.delete(listener);
    if (this.listeners[type]?.size === 0) {
      delete this.listeners[type];
    }
  }

  emit<K extends keyof T>(type: K, event: T[K]): void {
    this.listeners[type]?.forEach((listener) => listener(event));
  }
}

// 테스트
const emitter = new TypedEventEmitter<EventMap>();

emitter.on("click", (event) => {
  console.log(event.x, event.y); // 타입 추론됨
});

emitter.emit("keydown", { key: "Enter", code: "Enter" });
emitter.emit("click", { x: 100, y: 200 });
