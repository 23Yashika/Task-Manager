import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const useLogin = (onLogin) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(username); 
    navigate('/taskmanager'); 
  };

  return {
    username,
    setUsername,
    handleLogin
  };
};

export default useLogin;
