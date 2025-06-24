import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskManager from './pages/TaskManager';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route
          path="/register"
          element={
            <Register
              onRegister={(userData) => {
                setUser(userData);
              }}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              onLogin={(username) => {
                setUser({ fullName: 'User', username }); 
              }}
            />
          }
        />

        <Route
          path="/taskmanager"
          element={
            user ? <TaskManager user={user} /> : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
