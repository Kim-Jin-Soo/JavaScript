interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

//TODO: 다음 타입들을 정의하세요

// 1. User extends BaseEntity: name, email, role("admin" | "user")
interface User extends BaseEntity {
  name: string;
  email: string;
  role: "admin" | "user";
}
// 2. Product extends BaseEntity: name, price, stock, category
interface Product extends BaseEntity {
  name: string;
  price: number;
  stock: number;
  category: string;
}
// 3. Order extends BaseEntity: user(User), products(Product[]), total, status
interface Order extends BaseEntity {
  user: User;
  products: Product[];
  total: number;
  status: string;
}
// 4. 타입 유틸리티 사용
// - CreateUserDto: User에서 id, createdAt, updatedAt 제외
type CreateUserDto = Omit<User, "id" | "createdAt" | "updatedAt">;

// - UpdateUserDto: User의 모든 필드 선택적, id는 필수
type UpdateUserDto = Partial<User> & Pick<User, "id">;

// - UserSummary: User에서 id, name만 선택
type UserSummary = Pick<User, "id" | "name">;

// 테스트
const newUser: CreateUserDto = {
  name: "Kim",
  email: "kim@test.com",
  role: "user",
};

const updateData: UpdateUserDto = {
  id: 1,
  name: "Lee",
};

const summary: UserSummary = {
  id: 1,
  name: "Kim",
};
