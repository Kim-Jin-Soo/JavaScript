const orders = [
  {
    id: 1,
    customer: "Kim",
    items: [
      { name: "Book", price: 15 },
      { name: "Pen", price: 3 },
    ],
    status: "completed",
  },
  {
    id: 2,
    customer: "Lee",
    items: [{ name: "Laptop", price: 1200 }],
    status: "pending",
  },
  {
    id: 3,
    customer: "Park",
    items: [
      { name: "Mouse", price: 25 },
      { name: "Keyboard", price: 75 },
    ],
    status: "completed",
  },
  {
    id: 4,
    customer: "Kim",
    items: [{ name: "Monitor", price: 300 }],
    status: "completed",
  },
  {
    id: 5,
    customer: "Choi",
    items: [{ name: "USB", price: 10 }],
    status: "cancelled",
  },
];

// 1. 완료된 주문만 필터링
const filterCompleted = (orders) =>
  orders.filter((order) => order.status === "completed");

// 2. 각 주문의 총액 계산 (order 객체에 total 속성 추가)
const calculateOrderTotals = (orders) =>
  orders.map((order) => ({
    ...order,
    total: order.items.reduce((sum, item) => sum + item.price, 0),
  }));

// 3. 고객별 총 구매액 계산 { 'Kim': 318, 'Park': 100, ... }
const aggregateByCustomer = (orders) =>
  orders.reduce((acc, order) => {
    acc[order.customer] = (acc[order.customer] || 0) + order.total;
    return acc;
  }, {});

// 4. 가장 많이 구매한 고객 찾기 (객체를 { customer, total } 형태로 변환)
const findTopCustomer = (totalsObj) => {
  return Object.entries(totalsObj).reduce(
    (top, [customer, total]) => {
      return total > top.total ? { customer, total } : top;
    },
    { customer: "", total: 0 }
  );
};

// 5. 전체 파이프라인
function getTopCustomer(orders) {
  const completed = filterCompleted(orders);
  const withTotals = calculateOrderTotals(completed);
  const customerSummary = aggregateByCustomer(withTotals);
  return findTopCustomer(customerSummary);
}

console.log(getTopCustomer(orders));
// 결과: { customer: 'Kim', total: 318 }
