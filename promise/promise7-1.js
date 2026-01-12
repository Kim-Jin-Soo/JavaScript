async function* infiniteRandomNumberGenerator() {
  let i = 0;
  while (true) {
    i++;
    if (i > 500) {
      return;
    }
    // Math.random()은 0 이상 1 미만의 난수를 반환합니다.
    yield Math.random();
  }
}

// todo: 다음 비동기 iterator를 순회하는 함수를 작성하세요.
async function iterateAsyncIterator(asyncIterator) {
  for await (const value of asyncIterator) {
    console.log(value);
  }
}

iterateAsyncIterator(infiniteRandomNumberGenerator());
