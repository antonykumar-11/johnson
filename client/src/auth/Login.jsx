import React, { useState, useContext } from "react";
import { useLoginMutation } from "../store/api/userapi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../auth/AuthContext";
import Image from "../auth/logo3.png"; // Import your background image

export default function Login() {
  const { login: setAuthTrue } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const response = await login({ email, password }).unwrap();
      if (response.success) {
        setAuthTrue({ ...response.user, token: response.token });
        toast.success("Login successful!");
        navigate("/vouchers");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Invalid email or password.";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="max-w-md w-full mx-auto p-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Login
        </h1>
        <div className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full mt-1 p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white bg-opacity-20 text-white"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full mt-1 p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white bg-opacity-20 text-white"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <button
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-200">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-400 hover:underline transition duration-300"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
