import { useRenderCount } from "useRenderCount";

// 사용 예시
function MyComponent() {
  const renderCount = useRenderCount();

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h3>실시간 렌더링 카운트</h3>
      <p>
        이 컴포넌트는 현재 <b>{renderCount}</b>번 렌더링되었습니다.
      </p>
    </div>
  );
}

export default MyComponent;
