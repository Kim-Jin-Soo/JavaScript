// 1. CSS 클래스 이름 생성 (Template Literal 조합)
type Size = "sm" | "md" | "lg";
type Color = "primary" | "secondary" | "danger";
type Variant = "solid" | "outline" | "ghost";

type ButtonClass = `btn-${Size}-${Color}-${Variant}`;

// 2. 이벤트 이름 파싱 (Template Literal & infer 활용)
type ParseEventName<T extends string> = T extends `on${infer Event}`
  ? Uncapitalize<Event>
  : never;

type A = ParseEventName<"onClick">; // "click"
type B = ParseEventName<"onMouseOver">; // "mouseOver"

// 3. 객체 경로 타입 (재귀적 조건부 타입 활용)
type PathOf<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends object
    ? PathOf<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];

interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
    name: string;
  };
}

type ConfigPath = PathOf<Config>;
// 결과: "server.host" | "server.port" | "database.url" | "database.name"
