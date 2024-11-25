import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../features/tasks/taskSlice";

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated && window.location.pathname !== "/login") {
      navigate("/home");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const actionResult = await dispatch(loginAsync(credentials));

      if (loginAsync.fulfilled.match(actionResult)) {
        localStorage.setItem("isAuthenticated", "true");
        onLogin();
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleInputChange}
        placeholder="Username"
        className="block w-full p-2 mb-2 border rounded"
      />
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="block w-full p-2 border rounded"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 text-gray-500"
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
