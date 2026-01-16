function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="header">
      <h1 className="logo">Memo</h1>

      <input
        className="search-input"
        type="text"
        placeholder="메모 검색 (제목/내용)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </header>
  );
}

export default Header;
