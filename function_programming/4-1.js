function curry(fn) {
  // 인자를 계속 수집하는 재귀 함수를 반환합니다.
  return function curried(...args) {
    // 1. 지금까지 모인 인자(args)의 개수가
    //    원래 함수(fn)가 기대하는 인자의 개수(fn.length)보다 크거나 같으면 실행합니다.
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    // 2. 인자가 부족하다면, 다음에 들어올 인자(nextArgs)를 모아서
    //    다시 curried 함수를 호출(재귀)하는 새로운 함수를 반환합니다.
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// --- 테스트 ---
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

// --- 실용적인 예 ---
const formatDate = curry((locale, format, date) => {
  return new Intl.DateTimeFormat(locale, format).format(date);
});

const formatKorean = formatDate("ko-KR");
const formatKoreanFull = formatKorean({ dateStyle: "full" });

// 실행 시점의 날짜가 'ko-KR'과 'full' 스타일이 적용된 상태로 출력됩니다.
console.log(formatKoreanFull(new Date()));
// 예: 2026년 1월 16일 금요일
