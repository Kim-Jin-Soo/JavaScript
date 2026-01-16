import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
//import Sidebar from "./components/Sidebar";
import MemoList from "./components/MemoList";
import MemoEditor from "./components/MemoEditor";
import "./App.css";

function App() {
  //TODO: 메모 목록 상태를 만드세요.
  // 초기값은 id, title, content 등을 포함하는 객체 배열입니다.
  // ✅ localStorage에서 초기 메모 불러오기
  const defaultMemos = [
    {
      id: Date.now(),
      title: "메모장에 오신 것을 환영합니다!",
      content: "이것은 첫 번째 메모입니다.",
      category: "개인",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const [memos, setMemos] = useState(() => {
    try {
      const saved = localStorage.getItem("memos");
      if (!saved) return defaultMemos;

      const parsed = JSON.parse(saved);

      // ✅ 저장된 값이 배열이고, 길이가 1 이상일 때만 사용
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }

      return defaultMemos;
    } catch (e) {
      return defaultMemos;
    }
  });

  // ✅ memos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  //TODO: 현재 선택된 메모의 상태를 만드세요.
  // 초기값은 null 입니다.

  const [selectedMemo, setSelectedMemo] = useState(null);

  // ✅ 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ 제목+내용 필터링 (대소문자 무시)
  const filteredMemos = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return memos;

    return memos.filter((memo) => {
      const title = (memo.title ?? "").toLowerCase();
      const content = (memo.content ?? "").toLowerCase();
      return title.includes(q) || content.includes(q);
    });
  }, [memos, searchTerm]);

  //TODO: 새 메모를 추가하는 함수를 작성하세요.
  const handleNewMemo = () => {
    const newMemo = {
      id: Date.now(),
      title: "",
      content: "",
      category: "개인",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 힌트: setMemos([새 메모, ...기존 메모]);
    setMemos((prevMemos) => [newMemo, ...prevMemos]);
    // 새로 만든 메모를 바로 선택합니다.
    setSelectedMemo(newMemo);
  };

  const handleSaveMemo = (updatedMemo) => {
    setMemos((prev) =>
      prev.map((memo) => (memo.id === updatedMemo.id ? updatedMemo : memo))
    );
    setSelectedMemo(updatedMemo);
  };

  // ✅ 삭제
  const handleDeleteMemo = (memoId) => {
    setMemos(memos.filter((memo) => memo.id !== memoId));
    setSelectedMemo(null);
  };

  return (
    <div className="app">
      {/* ✅ Header에 검색어/변경함수 전달 */}
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="main-container">
        {/* MemoList에 필요한 props 전달 */}
        <MemoList
          memos={filteredMemos}
          selectedMemo={selectedMemo}
          onMemoSelect={setSelectedMemo}
          onNewMemo={handleNewMemo}
        />

        <MemoEditor
          memo={selectedMemo}
          onSave={handleSaveMemo}
          onDelete={handleDeleteMemo}
        />
      </div>
    </div>
  );
}

export default App;
