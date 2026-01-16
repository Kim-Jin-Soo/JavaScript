import { useState, useEffect } from "react";

function MemoEditor({ memo, onSave, onDelete }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (memo) {
      setTitle(memo.title ?? "");
      setContent(memo.content ?? "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [memo]);

  // 저장
  const handleSave = () => {
    if (!memo) return;

    onSave({
      ...memo,
      title: title.trim(),
      content: content.trim(),
      updatedAt: new Date().toISOString(),
    });
  };

  // 삭제
  const handleDelete = () => {
    if (!memo) return;

    if (window.confirm("이 메모를 삭제하시겠습니까?")) {
      onDelete(memo.id);
    }
  };

  // ✅ 선택된 메모가 없을 때 UI
  if (!memo) {
    return (
      <div className="memo-editor">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p>메모를 선택하거나 새 메모를 만드세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="memo-editor">
      <div className="editor-header">
        <input
          type="text"
          className="editor-title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor-actions">
          <button className="save-btn" onClick={handleSave}>
            저장
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>

      <div className="editor-content">
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MemoEditor;
