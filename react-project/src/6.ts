import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null): void {
  // 최신 callback을 저장 (클로저 문제 해결)
  const savedCallback = useRef<(() => void) | null>(null);

  // callback이 바뀔 때마다 ref 업데이트
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // delay 변경 시 interval 재설정
  useEffect(() => {
    if (delay === null) return;

    const id: number = window.setInterval(() => {
      savedCallback.current?.();
    }, delay);

    // cleanup
    return () => {
      window.clearInterval(id);
    };
  }, [delay]);
}
