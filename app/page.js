'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.180.2.181:3000', // 백엔드 서버 주소 
  withCredentials: true,
});

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // 사용할 변수 : 아이디, 비밀번호, 로그인 성공 후 서버에서 전송받은 사용자 정보 - 여기서는 아이디만 받음

  useEffect(() => {
    api.get('/user').then(response => {
      setUser(response.data);
    });
  }, []);

  const register = () => {
    console.log("1111111")
    api.post('/register', { username, password }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log("에러!!!!!!!!!")
      console.error(error.response.data);
    });
  };

  const login = () => {
    api.post('/login', { username, password }).then(response => {
      console.log(response.data);
      setUser({ username }); // 사용자 이름을 객체로 설정
    }).catch(error => {
      console.error(error.response.data);
    });
  };

  const logout = () => {
    api.post('/logout').then(response => {
      console.log(response.data);
      setUser(null);
    }).catch(error => {
      console.error(error.response.data);
    });
  };

  const checkAuth = () => {
    api.get('/user').then(response => {
      if (response.data) {
        alert(`Authenticated as ${response.data.username}`);
      } else {
        alert('Not authenticated');
      }
    }).catch(error => {
      console.error(error);
      alert('Error checking authentication');
    });
  };

  return (
    <div>
      <h1>Passport Authentication</h1>
      <div>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      <button onClick={checkAuth}>Check Auth</button>
      <div>
        {user ? <h2>Welcome, {user.username}</h2> : <h2>Please log in</h2>}
      </div>
    </div>
  );
}

export default App;