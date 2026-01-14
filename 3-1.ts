type EventType = "click" | "mouseOver" | "keyDown" | "submit";

// 1. 이벤트 핸들러 이름 생성 (Template Literal & Capitalize 사용)
type EventHandlerName<T extends string> = `on${Capitalize<T>}`;

type ClickHandler = EventHandlerName<"click">; // "onClick"

// 2. 모든 이벤트에 대한 핸들러 맵 타입
type EventHandlers = {
  [K in EventType as EventHandlerName<K>]: (event: Event) => void;
};

// 3. API 경로를 상수로 변환 (Template Literal & Uppercase 활용)
type ApiPath = "/user/list" | "/user/detail" | "/post/create";

// 경로를 분리하고 대문자화하여 변환 (복잡한 변환은 조건부 타입이 필요하지만, 여기서는 기본적인 매핑 예시)
type PathToConstant<T extends string> = T extends `/${infer P1}/${infer P2}`
  ? Uppercase<`${P1}_${P2}`>
  : T extends `/${infer P1}`
  ? Uppercase<P1>
  : never;

// 4. 구현
const API_PATHS: { [K in ApiPath as PathToConstant<K>]: K } = {
  USER_LIST: "/user/list",
  USER_DETAIL: "/user/detail",
  POST_CREATE: "/post/create",
};
