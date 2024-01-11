import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Cookie from "js-cookie";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://devi-community-forum-server.onrender.com/api/v1/login", {
        email,
        password,
      });
      console.log(response.data);
      const accessToken = Cookie.get("accessToken");
      const refreshToken = Cookie.get("refreshToken");

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (response.data.success) {
        const userData = {
          status: true,
          userData: response.data.data.user,
        };
        // console.log(userData);
        dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300"
            type="email"
            placeholder="Email"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300"
            type="password"
            placeholder="Password"
          />

          <button
            className="block w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-400"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
