//TODO: 다음 클래스들을 구현하세요

// 1. Stack<T>: push, pop, peek, isEmpty, size
class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  get size(): number {
    return this.items.length;
  }
}

// 2. Queue<T>: enqueue, dequeue, front, isEmpty, size
class Queue<T> {
  private items: T[] = [];
  enqueue(item: T): void {
    this.items.push(item);
  }
  dequeue(): T | undefined {
    return this.items.shift();
  }
  front(): T | undefined {
    return this.items[0];
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  get size(): number {
    return this.items.length;
  }
}

// 3. LinkedList<T>: append, prepend, delete, find, toArray
class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  append(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      return;
    }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }
  prepend(value: T): void {
    this.head = new ListNode(value, this.head);
  }
  delete(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      return true;
    }
    let curr = this.head;
    while (curr.next) {
      if (curr.next.value === value) {
        curr.next = curr.next.next;
        return true;
      }
      curr = curr.next;
    }
    return false;
  }
  find(predicate: (value: T) => boolean): T | undefined {
    let curr = this.head;
    while (curr) {
      if (predicate(curr.value)) return curr.value;
      curr = curr.next;
    }
    return undefined;
  }
  toArray(): T[] {
    const result: T[] = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.value);
      curr = curr.next;
    }
    return result;
  }
}

// 테스트
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1
console.log(stack.size); // 1

const queue = new Queue<string>();
queue.enqueue("a");
queue.enqueue("b");
console.log(queue.dequeue()); // "a"
console.log(queue.front()); // "b"

const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.prepend(0);
console.log(list.toArray()); // [0, 1, 2]
list.delete(1);
console.log(list.toArray()); // [0, 2]
