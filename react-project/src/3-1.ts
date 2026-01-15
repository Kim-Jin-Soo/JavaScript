import { useRef, useEffect } from "react";

/**
 * 컴포넌트의 렌더링 횟수를 추적하는 커스텀 훅 (JSX 버전)
 */
function useRenderCount() {
  // 1. useRef를 사용하여 렌더링 사이에도 유지되는 변수를 만듭니다.
  // 첫 렌더링 시 1이 반환되도록 초기값을 1로 설정합니다.
  const count = useRef(1);
  
  // 2. 의존성 배열 없이 useEffect를 사용하여
  // 매 렌더링(마운트 + 업데이트)이 완료된 직후에 실행되도록 합니다.
  useEffect(() => {
    count.current += 1;
  });

  // 3. 현재 렌더링 시점의 숫자를 반환합니다.
  return count.current;
}
