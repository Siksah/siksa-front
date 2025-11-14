import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://fallback.api'; 

function App() {
  const [count, setCount] = useState(0)

  const handleCreateSession = async () => {
    try {
      // CORS 문제 방지를 위해 `credentials: 'include'`를 설정하여 쿠키가 전송되도록 해야 합니다.
      const response = await fetch(`${API_BASE_URL}/session/create-anonymous`, {
        method: 'GET',
        credentials: 'include', // 세션 쿠키를 포함하여 요청
      });

      if (response.ok) {
        const data = await response.json();
        console.log('세션 응답:', data);
        alert(`익명 세션 요청 성공. 세션 ID: ${data.sessionId}`);
      } else {
        console.error('세션 생성 실패');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={handleCreateSession} style={{ padding: '10px', fontSize: '16px' }}>
        세션 만들기
      </button>
    </>
  )
}

export default App
