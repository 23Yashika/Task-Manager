// hooks/useRegister.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, username }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Registration failed');
      }

      // Optional: handle response data
      const data = await res.json();
      console.log('Registered user:', data);

      // Navigate to login on success
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    fullName,
    setFullName,
    username,
    setUsername,
    handleSubmit,
    error, // optional: use this to show error messages in UI
  };
};

export default useRegister;
