const _ = Symbol("placeholder");

function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    // presetArgs를 복사하여 사용 (원본 유지)
    let laterIdx = 0;
    const combinedArgs = presetArgs.map((arg) => {
      // 값이 placeholder(_)인 경우 나중에 들어온 인자(laterArgs)로 교체
      if (arg === _ && laterIdx < laterArgs.length) {
        return laterArgs[laterIdx++];
      }
      return arg;
    });

    // placeholder를 채운 후에도 남은 laterArgs가 있다면 뒤에 추가로 붙여줌
    const finalArgs = combinedArgs.concat(laterArgs.slice(laterIdx));

    return fn.apply(this, finalArgs);
  };
}

// --- 테스트 ---
const greet = (greeting, title, name, punctuation) =>
  `${greeting}, ${title} ${name}${punctuation}`;

// 1. 특정 위치만 비워두기 (greeting과 name 자리를 비움)
const greetPolitely = partial(greet, _, "Mr.", _, "!");
console.log(greetPolitely("Hello", "Kim")); // "Hello, Mr. Kim!"
console.log(greetPolitely("Hi", "Lee")); // "Hi, Mr. Lee!"

// 2. 여러 자리를 비워두기
const askQuestion = partial(greet, _, _, _, "?");
console.log(askQuestion("Excuse me", "Ms.", "Park")); // "Excuse me, Ms. Park?"
