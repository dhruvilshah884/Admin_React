import React, { useState } from "react";
import "./SignupForm.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
function AdminForm() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    product_name: "",
    product_price: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("product_price", data.product_price);
    formData.append("image", data.image);

    axios.post("http://localhost:5000/add", formData)
      .then(() => {
        navigate('/table')
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  };

  return (
    <div className="signup-form">
      <h1>Admin Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product_name"
          placeholder="Enter Product Name"
          value={data.product_name}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="product_price"
          placeholder="Enter Product Price"
          value={data.product_price}
          onChange={handleChange}
        />
        <br />
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Add Product" />
      </form>
    </div>
  );
}

export default AdminForm;
