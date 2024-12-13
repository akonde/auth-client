import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [registerResponse, setRegisterResponse] = useState('');
  const [loginResponse, setLoginResponse] = useState('');

  const API_BASE_URL = 'http://localhost:3000';

  const register = async (e) => {
    e.preventDefault();
    // Write your register code here
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
      const result = await response.json();
      console.log("RESULT",result)
      
      if (response.ok) {
        setRegisterResponse(`Registration successful: ${result.username}`);
      } else {
        setRegisterResponse(`Registration failed: ${result.error}`);
      }
    } catch (error) {
      setRegisterResponse(`Registration error: ${error.message}`);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    // Write your login code here
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
      const result = await response.json();
      if (response.ok) {
        setLoginResponse(`Login successful: Token: ${result.token}`);
        localStorage.setItem('token', result.token);
      } else {
        setLoginResponse(`Login failed: ${result.error}`);
      }
    } catch (error) {
      setLoginResponse(`Login error: ${error.message}`);
    }
  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  }

  return (
    <div className="App">

      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />

      {registerResponse && <p>{registerResponse}</p>}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            handleChange={handleChange}
          />
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}

    </div>
  );
}
