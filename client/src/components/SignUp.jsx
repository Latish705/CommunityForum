/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   avatar: null,
  // });

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === "file" ? files[0] : value,
  //   }));
  // };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);

      const response = await axios.post(
        "http://localhost:8080/api/v1/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300"
            type="text"
            placeholder="User Name"
          />

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

          <label htmlFor="avatar">Avatar</label>
          <input
            id="avatar"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300"
            type="file"
          />

          <button
            className="block w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-400"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
