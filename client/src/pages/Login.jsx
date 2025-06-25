// pages/Login.jsx
import React from 'react';
import useLogin from '../hooks/useLogin';
import LoginForm from '../components/LoginForm';

const Login = ({ onLogin }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    error,
    loading
  } = useLogin(onLogin);

  return (
    <LoginForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      error={error}
      loading={loading}
    />
  );
};

export default Login;
