import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskDashboard from './pages/TaskDashboard'; // Assuming you meant TaskDashboard

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register onRegister={setUser} />} />
        <Route path="/" element={<Login onLogin={setUser} />} />
        <Route path="/taskdashboard/:userId" element={<TaskDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
