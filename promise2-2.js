const p1 = fetch('https://jsonplaceholder.typicode.com/todos/1').then((e) => e.json());
const p2 = fetch('https://jsonplaceholder.typicode.com/todos/2').then((e) => e.json());
const p3 = fetch('https://jsonplaceholder.typicode.com/todos/3').then((e) => e.json());

console.time('sync');
[p1, p2, p3].map((p) => p.then(console.log)); 
console.timeEnd('sync');

console.time('async');
// todo: Promise.all 활용 구현 
Promise.allSettled([p1,p2,p3]).then(console.log);
console.timeEnd('async');