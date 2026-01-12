function createCounter(initialValue = 0) {
  const _initVal = initialValue;
  let count = _initVal;

  return {
    increment: () => {
        return ++count;
    },   // 증가 후 값 반환
    decrement: () => {
      return --count;                
    },     // 감소 후 값 반환
    getValue: () => {
      return count;
    },
    reset: () => {
        count = _initVal;
        return _initVal;
    } // 실제로 초기화
  };
}

// 테스트
const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.getValue());  // 11
counter.reset();
console.log(counter.getValue());  // 10