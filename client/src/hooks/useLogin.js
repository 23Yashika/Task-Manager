import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = (onLogin) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // New: password field
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Optional: loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Include password
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Login failed');
      }

      const user = await res.json();
      onLogin(user);
      navigate(`/taskdashboard/${user._id}`); // Fixed: use _id
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    error,
    loading,
  };
};

export default useLogin;
