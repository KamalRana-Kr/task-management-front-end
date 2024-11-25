import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  return (
    <Router >
      <div className="max-w-4xl mx-auto p-4">
      {isLoggedIn ? <HomePage /> : <LoginPage onLogin={handleLogin} />}
      </div>
    </Router>
  );
};

export default App;
