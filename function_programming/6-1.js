// 개별 검증 규칙을 만드는 고차 함수들 (커링 적용)
const required = (msg) => (val) => !val && val !== 0 ? msg : null;
const minLength = (min, msg) => (val) => val.length < min ? msg : null;
const maxLength = (max, msg) => (val) => val.length > max ? msg : null;
const pattern = (regex, msg) => (val) => !regex.test(val) ? msg : null;

// 이미 정의된 규칙을 조합한 유틸리티
const email = (msg) => pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg);
const numeric = (msg) => (val) => isNaN(val) ? msg : null;

/**
 * validate: 스키마를 받아 데이터를 검증하는 함수를 반환함
 * @param {Object} schema - 필드별 검증 규칙 배열
 * @returns {Function} - (data) => { valid, errors }
 */
const validate = (schema) => (data) => {
  const errors = Object.keys(schema).reduce((acc, field) => {
    const rules = schema[field];
    const value = data[field];

    // 각 필드의 규칙들을 순회하며 에러 메시지(null이 아닌 것)만 추출
    const fieldErrors = rules
      .map((rule) => rule(value))
      .filter((error) => error !== null);

    if (fieldErrors.length > 0) {
      acc[field] = fieldErrors;
    }
    return acc;
  }, {});

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors,
  };
};

// --- 사용 예시 ---

const validateUser = validate({
  username: [
    required("Username is required"),
    minLength(3, "Username must be at least 3 characters"),
    maxLength(20, "Username must be at most 20 characters"),
    pattern(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  ],
  email: [required("Email is required"), email("Invalid email format")],
  age: [required("Age is required"), numeric("Age must be a number")],
});

// 1. 에러 케이스 테스트
const result1 = validateUser({
  username: "ab",
  email: "invalid",
  age: "twenty",
});

console.log(result1);
/*
{
  valid: false,
  errors: {
    username: ['Username must be at least 3 characters'],
    email: ['Invalid email format'],
    age: ['Age must be a number']
  }
}
*/

// 2. 성공 케이스 테스트
const result2 = validateUser({
  username: "kim123",
  email: "kim@test.com",
  age: "25",
});

console.log(result2);
// { valid: true, errors: {} }
