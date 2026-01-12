const fn = ((resolve, reject) => {
    if (Math.random() < 0.5) {
        setTimeout(() => resolve("Success!"),3000);
    } else {
        reject(new Error('Failed'));
    }
}); 

const makePromise = () => {
    return new Promise(fn);
}; 

for (let index = 0; index < 10; index++) {
    // 테스트
    makePromise()
        .then(value => {
            console.log(value); // "Success!"
            return value + ' Chain1';
        })
        .then(value => {
            console.log(value); // "Success! Chain1"
        })
        .catch(e => console.log(e.message)); // "Failed"
}