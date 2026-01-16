class Maybe {
  constructor(value) {
    this.$value = value;
  }

  // 값을 받아서 Maybe 인스턴스로 감싸는 정적 메서드
  static of(value) {
    return new Maybe(value);
  }

  // 명시적으로 Nothing 상태를 만드는 메서드
  static nothing() {
    return new Maybe(null);
  }

  // 값이 null이나 undefined인지 확인
  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  // map: 값이 있을 때만 함수를 실행하고 다시 Maybe로 감싸서 반환
  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  // flatMap (chain): 함수가 이미 Maybe를 반환할 때, 중첩된 Maybe를 방지
  flatMap(fn) {
    return this.isNothing ? this : fn(this.$value);
  }

  // 최종적으로 값을 꺼낼 때, 값이 없으면 기본값을 반환
  getOrElse(defaultValue) {
    return this.isNothing ? defaultValue : this.$value;
  }
}

// --- 테스트 1: 안전한 중첩 접근 ---
const user = {
  name: "Kim",
  address: {
    city: "Seoul",
    zip: "12345",
  },
};

const userWithoutAddress = { name: "Lee" };

const getZip = (user) =>
  Maybe.of(user)
    .map((u) => u.address)
    .map((a) => a.zip)
    .getOrElse("N/A");

console.log(getZip(user)); // "12345"
console.log(getZip(userWithoutAddress)); // "N/A"
console.log(getZip(null)); // "N/A"

// --- 테스트 2: flatMap (chain) 테스트 ---
const half = (n) => (n % 2 === 0 ? Maybe.of(n / 2) : Maybe.nothing());

console.log(
  Maybe.of(8)
    .flatMap(half) // Just(4)
    .flatMap(half) // Just(2)
    .flatMap(half) // Just(1)
    .getOrElse("Not possible")
); // 1

console.log(
  Maybe.of(7)
    .flatMap(half) // Nothing
    .getOrElse("Not possible")
); // "Not possible"
