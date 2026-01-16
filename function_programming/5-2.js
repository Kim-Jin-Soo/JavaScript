class Either {
  constructor(tag, value) {
    this._tag = tag; // "left" | "right"
    this._value = value;
    Object.freeze(this);
  }

  // 생성자(팩토리)
  static left(value) {
    return new Either("left", value);
  }

  static right(value) {
    return new Either("right", value);
  }

  // 타입 가드 느낌
  get isLeft() {
    return this._tag === "left";
  }
  get isRight() {
    return this._tag === "right";
  }

  // Right에만 적용 (Left면 그대로 통과)
  map(fn) {
    if (this.isLeft) return this;
    try {
      return Either.right(fn(this._value));
    } catch (e) {
      return Either.left(e?.message ?? String(e));
    }
  }

  // flatMap / chain: fn이 Either를 반환한다고 가정
  flatMap(fn) {
    if (this.isLeft) return this;
    try {
      const next = fn(this._value);
      // 안전장치: Either가 아니면 right로 감싸기(선택)
      return next instanceof Either ? next : Either.right(next);
    } catch (e) {
      return Either.left(e?.message ?? String(e));
    }
  }

  // Left/Right 각각 처리해서 최종 값으로 "접기"
  fold(onLeft, onRight) {
    return this.isLeft ? onLeft(this._value) : onRight(this._value);
  }
}

// 테스트
const divide = (a, b) =>
  b === 0 ? Either.left("Division by zero") : Either.right(a / b);

const parseJSON = (str) => {
  try {
    return Either.right(JSON.parse(str));
  } catch (e) {
    return Either.left(e.message);
  }
};

// 체이닝
const result = parseJSON('{"value": 100}')
  .map((obj) => obj.value)
  .flatMap((val) => divide(val, 2))
  .map((x) => x * 3)
  .fold(
    (err) => `Error:${err}`,
    (val) => `Result:${val}`
  );

console.log(result); // "Result: 150"

// 에러 케이스
const errorResult = parseJSON("invalid json")
  .map((obj) => obj.value)
  .fold(
    (err) => `Error:${err}`,
    (val) => `Result:${val}`
  );

console.log(errorResult); // "Error: ..."
