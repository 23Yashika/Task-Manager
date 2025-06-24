// pages/Register.jsx
import React from 'react';
import useRegister from '../hooks/useRegister';
import RegisterForm from '../components/RegisterForm';

const Register = ({ onRegister }) => {
  const {
    fullName,
    setFullName,
    username,
    setUsername,
    handleSubmit
  } = useRegister(onRegister);

  return (
    <RegisterForm
      fullName={fullName}
      setFullName={setFullName}
      username={username}
      setUsername={setUsername}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;
