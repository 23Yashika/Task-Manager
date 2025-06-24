// pages/Login.jsx
import React from 'react';
import useLogin from '../hooks/useLogin';
import LoginForm from '../components/LoginForm';

const Login = ({ onLogin }) => {
  const { username, setUsername, handleLogin } = useLogin(onLogin);

  return (
    <LoginForm
      username={username}
      setUsername={setUsername}
      handleLogin={handleLogin}
    />
  );
};

export default Login;
