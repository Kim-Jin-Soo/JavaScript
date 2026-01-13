interface Dog {
  type: "dog";
  name: string;
  breed: string;
  bark(): void;
}

interface Cat {
  type: "cat";
  name: string;
  color: string;
  meow(): void;
}

interface Bird {
  type: "bird";
  name: string;
  wingspan: number;
  fly(): void;
}

type Animal = Dog | Cat | Bird;

//TODO: 다음 타입 가드들을 구현하세요

function isDog(animal: Animal): animal is Dog {
  //TODO
  return animal.type === "dog";
}

function isCat(animal: Animal): animal is Cat {
  //TODO
  return animal.type === "cat";
}

function isBird(animal: Animal): animal is Bird {
  //TODO
  return animal.type === "bird";
}

// 범용 타입 가드
function isAnimalType<T extends Animal>(
  animal: Animal,
  type: T["type"]
): animal is T {
  //TODO
  return animal.type === type;
}

// 동물 소리 내기
function makeSound(animal: Animal): void {
  //TODO: 타입 가드 사용하여 구현
  if (isDog(animal)) animal.bark();
  if (isCat(animal)) animal.meow();
  if (isBird(animal)) animal.fly();
}

// 테스트
const dog: Dog = {
  type: "dog",
  name: "Max",
  breed: "Labrador",
  bark: () => console.log("Woof!"),
};
const cat: Cat = {
  type: "cat",
  name: "Whiskers",
  color: "orange",
  meow: () => console.log("Meow!"),
};

makeSound(dog); // Woof!
makeSound(cat); // Meow!
