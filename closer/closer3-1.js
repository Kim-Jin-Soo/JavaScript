function curry(fn) {
  return function curried(...args) {
    // 인자가 충분하면 바로 실행
    if (args.length >= fn.length) {
      return fn(...args);
    }
    // 부족하면 다시 함수 반환
    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}

// 테스트
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6
console.log(curriedAdd(1, 2, 3));     // 6

// 활용
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(10)); // 13