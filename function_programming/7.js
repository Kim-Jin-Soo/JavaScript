class Lazy {
  constructor(iterable) {
    this.iterable = iterable;
  }

  // 데이터 소스를 받아 Lazy 인스턴스 생성
  static from(array) {
    return new Lazy(array);
  }

  // Generator를 활용해 데이터를 하나씩 가공
  *process() {
    yield* this.iterable;
  }

  // map: 연산을 저장만 해두고, 호출될 때 수행
  map(fn) {
    const self = this;
    return new Lazy({
      *[Symbol.iterator]() {
        for (const item of self.process()) {
          yield fn(item);
        }
      },
    });
  }

  // filter: 조건에 맞는 요소가 요청될 때까지 다음으로 넘어감
  filter(pred) {
    const self = this;
    return new Lazy({
      *[Symbol.iterator]() {
        for (const item of self.process()) {
          if (pred(item)) yield item;
        }
      },
    });
  }

  // take: 필요한 개수만큼만 generator를 가동하고 중단
  take(n) {
    const self = this;
    return new Lazy({
      *[Symbol.iterator]() {
        let count = 0;
        if (n <= 0) return;
        for (const item of self.process()) {
          yield item;
          if (++count === n) break; // n개 도달 시 즉시 종료
        }
      },
    });
  }

  // Terminal Operation: 실제로 루프를 돌려 배열로 변환
  toArray() {
    return Array.from(this.process());
  }

  // shortcut을 위한 메서드 재정의 (this.process 가 매번 최신 generator를 가리키게 함)
  process() {
    return this.iterable[Symbol.iterator]();
  }
}

// --- 테스트 ---
const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .map((x) => {
    console.log("mapping", x);
    return x * 2;
  })
  .filter((x) => {
    console.log("filtering", x);
    return x > 10;
  })
  .take(2)
  .toArray();

console.log(result); // [12, 14]
