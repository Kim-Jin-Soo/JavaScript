function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  // 1. 현재 상태 반환
  const getState = () => state;

  // 2. 리스너 등록 및 해제 함수 반환
  const subscribe = (listener) => {
    listeners.push(listener);
    // 구독 해제(unsubscribe) 기능을 위해 함수 반환
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // 3. 액션 발생 시 리듀서를 실행하고 리스너들에게 알림
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener(state));
    return action;
  };

  // 미들웨어 적용을 위한 내부 함수 (간략화된 applyMiddleware)
  const applyMiddleware = (...middlewares) => {
    let dispatchWithMiddleware = dispatch;

    // 미들웨어 체인 형성: middleware(store)(next)(action)
    const middlewareAPI = {
      getState,
      dispatch: (action) => dispatchWithMiddleware(action),
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));

    // 오른쪽에서 왼쪽으로 합성하여 최종 dispatch 함수 생성 (pipe/compose 원리)
    dispatchWithMiddleware = chain.reduceRight(
      (next, middleware) => middleware(next),
      dispatch
    );

    return { ...store, dispatch: dispatchWithMiddleware };
  };

  const store = { getState, subscribe, dispatch, applyMiddleware };
  return store;
}

// --- 테스트 및 사용 ---

// 리듀서
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "SET":
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

// 미들웨어 정의
const logger = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};

// 스토어 생성 및 미들웨어 적용
let store = createStore(counterReducer, { count: 0 });
store = store.applyMiddleware(logger);

// 구독
store.subscribe((state) => {
  // logger 미들웨어와 별개로 상태 변경 시 실행됨
});

store.dispatch({ type: "INCREMENT" }); // Dispatching: {type: 'INCREMENT'} -> Next state: {count: 1}
store.dispatch({ type: "INCREMENT" }); // Dispatching: {type: 'INCREMENT'} -> Next state: {count: 2}
store.dispatch({ type: "SET", payload: 10 }); // Dispatching: {type: 'SET', payload: 10} -> Next state: {count: 10}

console.log("Final State:", store.getState()); // { count: 10 }
