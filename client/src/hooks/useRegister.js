// hooks/useRegister.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useRegister = (onRegister) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ fullName, username });
    navigate('/login'); 
  };

  return {
    fullName,
    setFullName,
    username,
    setUsername,
    handleSubmit
  };
};

export default useRegister;
