// 1. compose: 오른쪽에서 왼쪽으로 실행 (수학적 합성 g(f(x)))
function compose(...fns) {
  return (initialValue) => fns.reduceRight((acc, fn) => fn(acc), initialValue);
}

// 2. pipe: 왼쪽에서 오른쪽으로 실행 (데이터 흐름 중심)
function pipe(...fns) {
  return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

// 3. composeAsync: 비동기 함수 합성
function composeAsync(...fns) {
  return (initialValue) =>
    fns.reduceRight(async (accPromise, fn) => {
      const acc = await accPromise;
      return fn(acc);
    }, Promise.resolve(initialValue));
}

// 4. pipeAsync: 비동기 파이프
function pipeAsync(...fns) {
  return (initialValue) =>
    fns.reduce(async (accPromise, fn) => {
      const acc = await accPromise;
      return fn(acc);
    }, Promise.resolve(initialValue));
}

// --- 테스트 ---
const add1 = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x ** 2;

// (2 + 1) -> 3 * 2 -> 6 ^ 2 = 36
console.log(compose(square, double, add1)(2)); // 36
console.log(pipe(add1, double, square)(2)); // 36

// --- 비동기 테스트 ---
const delay = (ms) => (x) => new Promise((r) => setTimeout(() => r(x), ms));
const asyncAdd1 = async (x) => x + 1;
const asyncDouble = async (x) => x * 2;

// 5 + 1 -> 6 (100ms 대기) -> 6 * 2 = 12
pipeAsync(asyncAdd1, delay(100), asyncDouble)(5).then(console.log); // 12
