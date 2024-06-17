import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";

function User() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);
  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/add-to-cart",
        { productId },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  return (
    <div className="user-container">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Products</h1>
      <div className="product-grid">
        {data.map((product) => (
          <div key={product._id} className="product-box">
            <img
              className="product-image"
              src={`http://localhost:5000/uploads/${product.product_image}`}
              alt={product.product_name}
            />
            <div className="product-details">
              <h2 className="product-name">{product.product_name}</h2>
              <p className="product-price">Price: ${product.product_price}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => handleAddToCart(product._id)}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default User;
