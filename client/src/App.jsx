// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskDashboard from './pages/TaskCard';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register onRegister={setUser} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/taskdashboard" element={<TaskDashboard userId={user?.userId} />} />
      </Routes>
    </Router>
  );
};

export default App;
