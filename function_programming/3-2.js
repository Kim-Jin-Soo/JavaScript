// 1. 객체의 특정 키 값을 가져오기
const prop = (key) => (obj) => obj[key];

// 2. 객체의 깊은 경로의 값을 가져오기 (예: 'user.profile.name')
const path = (keys) => (obj) =>
  keys.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  );

// 3. 배열 매핑 (순수 함수)
const map = (fn) => (arr) => arr.map(fn);

// 4. 배열 필터링 (순수 함수)
const filter = (pred) => (arr) => arr.filter(pred);

// 5. 배열 리듀스 (순수 함수)
const reduce = (fn, init) => (arr) => arr.reduce(fn, init);

// 6. 배열 정렬 (원본 보존을 위해 복사본 사용)
const sort = (compareFn) => (arr) => [...arr].sort(compareFn);

// 7. 앞의 n개 요소만 가져오기
const take = (n) => (arr) => arr.slice(0, n);

// 8. 배열의 각 객체에서 특정 키만 뽑아내기
const pluck = (key) => (arr) => arr.map((obj) => obj[key]);

// 9. 중복 제거
const uniq = () => (arr) => [...new Set(arr)];

// 10. 기준 함수에 따른 그룹화
const groupBy = (fn) => (arr) =>
  arr.reduce((acc, val) => {
    const key = fn(val);
    acc[key] = acc[key] || [];
    acc[key].push(val);
    return acc;
  }, {});

// --- 테스트 ---
const users = [
  { id: 1, name: "Kim", age: 25, dept: "dev" },
  { id: 2, name: "Lee", age: 30, dept: "design" },
  { id: 3, name: "Park", age: 25, dept: "dev" },
  { id: 4, name: "Choi", age: 35, dept: "dev" },
];

// 이전 단계에서 구현한 pipe 함수 사용
const pipe =
  (...fns) =>
  (initialValue) =>
    fns.reduce((acc, fn) => fn(acc), initialValue);

// 개발팀 이름들
const devNames = pipe(
  filter((u) => u.dept === "dev"),
  pluck("name")
)(users);
console.log(devNames); // ['Kim', 'Park', 'Choi']

// 나이별 그룹
const byAge = groupBy(prop("age"))(users);
console.log(byAge);
// { 25: [{...}, {...}], 30: [{...}], 35: [{...}] }

// 고유 부서 목록
const depts = pipe(pluck("dept"), uniq())(users);
console.log(depts); // ['dev', 'design']
