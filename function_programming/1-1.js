// 비순수 함수 1
let total = 0;
function addToTotal(amount) {
  total += amount;
  return total;
}

// 비순수 함수 2
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 비순수 함수 3
const config = { debug: false };
function log(message) {
  if (config.debug) {
    console.log(message);
  }
}
//--------------------------------------------------

//TODO: 순수 함수 버전 구현

function add(total, amount) {
  return total + amount;
}

function shufflePure(arr, randomFn) {
  const result = [...arr]; // 복사본 생성

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function createLogMessage(message, debug) {
  return debug ? message : null;
}
