interface Entity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends Entity {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

// 1. 생성 DTO (Omit을 사용하여 공통 Entity 필드인 id, createdAt, updatedAt 제외)
type CreateDto<T extends Entity> = Omit<T, keyof Entity>;

// 2. 업데이트 DTO (id, createdAt은 제외하고 나머지는 Partial을 사용하여 선택 사항으로 변경)
type UpdateDto<T extends Entity> = Partial<Omit<T, "id" | "createdAt">>;

// 3. 조회 응답 (Omit을 사용하여 특정 민감 필드 K를 제외)
type ViewDto<T, K extends keyof T> = Omit<T, K>;

// 4. 목록 응답 (Pick을 사용하여 필요한 필드 K만 추출)
type ListItemDto<T, K extends keyof T> = Pick<T, K>;

// User에 적용 예시
type CreateUserDto = CreateDto<User>;
type UpdateUserDto = UpdateDto<User>;
type UserView = ViewDto<User, "password">;
type UserListItem = ListItemDto<User, "id" | "name" | "email">;
