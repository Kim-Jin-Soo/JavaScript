function MemoList({ memos, selectedMemo, onMemoSelect, onNewMemo }) {
  return (
    <div className="memo-list">
      <div className="memo-list-header">
        <h2>메모 ({memos.length})</h2>
        {/*TODO: onClick 이벤트에 onNewMemo 함수를 연결하세요. */}
        <button className="new-memo-btn" onClick={onNewMemo}>
          + 새 메모
        </button>
      </div>

      <div className="memo-items">
        {/* ✅ memos 배열을 map()으로 렌더링 */}
        {memos.map((memo) => (
          <div
            key={memo.id}
            className={`memo-item ${
              selectedMemo?.id === memo.id ? "active" : ""
            }`}
            onClick={() => onMemoSelect(memo)}
          >
            <div className="memo-item-title">{memo.title || "제목 없음"}</div>

            <div className="memo-item-preview">
              {memo.content || "내용 없음"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoList;
