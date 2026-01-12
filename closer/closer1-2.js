function createBankAccount(initialBalance) {
  //TODO: 구현하세요
  const initMoney = initialBalance;
  let money = initMoney;
  const history = [];
  return {
  // - deposit(amount): 입금
    deposit: (amount) => {
    money += amount;
    history.push({type: 'deposit', amount});
    return money;
    },
  // - withdraw(amount): 출금 (잔액 부족시 false 반환)
  withdraw: (amount) => {
    if(amount > money) {
        return false;
    }
    money -= amount;
    history.push({type: 'withdraw', amount});
    return true;
    },
  // - getBalance(): 잔액 조회
  getBalance: () => {
    return money;
    },
  // - getHistory(): 거래 내역 조회
  getHistory: () => {
        return history;
    }
  }
}

// 테스트
const account = createBankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
console.log(account.withdraw(2000)); // false
console.log(account.withdraw(300)); // true
console.log(account.getBalance()); // 1200
console.log(account.getHistory());
// [{type: 'deposit', amount: 500}, {type: 'withdraw', amount: 300}]