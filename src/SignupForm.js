import React, { useState } from "react";
import "./SignupForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", data)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  };

  return (
    <div className="signup-form">
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">
            <input
              type="checkbox"
              id="role"
              name="role"
              checked={data.role}
              onChange={handleChange}
            />
            <span>Are you an admin?</span>
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
