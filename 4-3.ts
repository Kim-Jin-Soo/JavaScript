interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

// 1. 필드별 유효성 규칙 타입
type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

// 2. 유효성 검사 결과 타입
type ValidationResult<T> = {
  [K in keyof T]?: string[]; // 에러 메시지 배열
};

// 3. 폼 상태 타입
type FormState<T> = {
  values: T;
  errors: ValidationResult<T>;
  touched: { [K in keyof T]?: boolean };
  isValid: boolean;
  isDirty: boolean;
};

// 4. 폼 관리자 구현
class FormManager<T extends Record<string, any>> {
  private state: FormState<T>;
  private rules: ValidationRules<T>;

  constructor(initialValues: T, rules: ValidationRules<T>) {
    // 구현하세요
    this.rules = rules;
    this.state = {
      values: { ...initialValues },
      errors: {},
      touched: {},
      isValid: true,
      isDirty: false,
    };

    // 초기 값에 대한 유효성 검사 수행
    this.validate();
  }

  setValue<K extends keyof T>(field: K, value: T[K]): void {
    // 구현하세요
    this.state.values[field] = value;
    this.state.touched[field] = true;
    this.state.isDirty = true;

    // 해당 필드 및 전체 폼 유효성 다시 검사
    this.validate();
  }

  validate(): boolean {
    // 구현하세요
    const newErrors: ValidationResult<T> = {};
    let isFormValid = true;

    // 모든 규칙을 순회하며 에러 메시지 추출
    for (const key in this.rules) {
      const fieldRules = this.rules[key];
      if (!fieldRules) continue;

      const fieldValue = this.state.values[key];
      const fieldErrors = fieldRules
        .filter((rule) => !rule.validate(fieldValue))
        .map((rule) => rule.message);

      if (fieldErrors.length > 0) {
        newErrors[key] = fieldErrors;
        isFormValid = false;
      }
    }

    this.state.errors = newErrors;
    this.state.isValid = isFormValid;

    return isFormValid;
  }

  getState(): Readonly<FormState<T>> {
    // 구현하세요
    return Object.freeze({ ...this.state });
  }
}
