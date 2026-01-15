import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target; // input의 id(예: email)와 입력된 value를 가져옴

    setformData({
      ...formData,
      [id]: value, // 계산된 속성명(Computed property names) 문법 사용
    });
  };

  return (
    <form>
      <input
        value={formData.username}
        onChange={handleChange} // 함수를 직접 전달
        id="username"
        type="text"
        placeholder="이름"
      />
      <input
        value={formData.email}
        onChange={handleChange}
        id="email"
        type="text"
        placeholder="이메일"
      />
      {/* ... 나머지 input도 동일하게 onChange={handleChange} 적용 */}
    </form>
  );
}

export default App;
