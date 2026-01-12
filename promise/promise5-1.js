const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function* createPaginator(fetchPage) {
  let page = 1;

  while (true) {
    const { data, hasMore } = await fetchPage(page);
    yield data;
    if (!hasMore) return;
    page++;
  }
}

// 테스트
const mockFetch = async (page) => {
  await delay(100);
  return {
    data: [`item-${page}-1`, `item-${page}-2`],
    hasMore: page < 3,
  };
};

const paginator = createPaginator(mockFetch);

async function start() {
  const paginator = createPaginator(mockFetch);

  // for await는 반드시 async 함수 안에 있어야 합니다.
  for await (const items of paginator) {
    console.log(items);
  }
}

start(); // 함수 실행
// ['item-1-1', 'item-1-2']
// ['item-2-1', 'item-2-2']
// ['item-3-1', 'item-3-2']
