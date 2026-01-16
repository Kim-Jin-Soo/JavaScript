// 1. myMap: 각 요소에 함수를 적용한 새로운 배열 반환
function myMap(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }
  return result;
}

// 2. myFilter: 조건을 만족하는 요소만 모은 새로운 배열 반환
function myFilter(arr, predicate) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

// 3. myReduce: 배열을 순회하며 하나의 누적값(accumulator)으로 응축
function myReduce(arr, reducer, initialValue) {
  let acc = initialValue !== undefined ? initialValue : arr[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < arr.length; i++) {
    acc = reducer(acc, arr[i], i, arr);
  }
  return acc;
}

// 4. myFind: 조건을 만족하는 첫 번째 요소를 반환 (없으면 undefined)
function myFind(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
}

// 5. myEvery: 모든 요소가 조건을 만족하는지 확인
function myEvery(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) {
      return false; // 하나라도 실패하면 즉시 종료
    }
  }
  return true;
}

// 6. mySome: 하나라도 조건을 만족하는 요소가 있는지 확인
function mySome(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return true; // 하나라도 성공하면 즉시 종료
    }
  }
  return false;
}

// --- 테스트 ---
const nums = [1, 2, 3, 4, 5];

console.log(myMap(nums, (x) => x * 2)); // [2, 4, 6, 8, 10]
console.log(myFilter(nums, (x) => x % 2 === 0)); // [2, 4]
console.log(myReduce(nums, (a, b) => a + b, 0)); // 15
console.log(myFind(nums, (x) => x > 3)); // 4
console.log(myEvery(nums, (x) => x > 0)); // true
console.log(mySome(nums, (x) => x > 4)); // true
