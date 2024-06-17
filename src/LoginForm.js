import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupForm.css";

function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", data, { withCredentials: true })
      .then((response) => {
        console.log('login successfully', response);
        const user = response.data.user;
        if (user.role === "admin") {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  };

  return (
    <div className="signup-form">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginForm;
