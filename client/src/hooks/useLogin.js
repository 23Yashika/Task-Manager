// hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = (onLogin) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Login failed');
      }

      const user = await res.json(); // expects something like { userId, username }
      onLogin(user); // optionally store in context or localStorage
      navigate('/taskdashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    username,
    setUsername,
    handleLogin,
    error, // optional for showing error in UI
  };
};

export default useLogin;
