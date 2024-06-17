import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ userEmail, userId }) { // Add userId prop
  const publisherKey = "pk_test_51ONZYOSAJLtohZuHHWhLPDWQs0YPf5y3jm0LCiiUKNEEDsndfStwcKP83HR9yfXRogRKsA5AyjH8fSmcZDyLtSEg00WB0fVQK5";
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart", {
        withCredentials: true,
      });
      setData(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const calculateTotal = (items) => {
    let totalPrice = items.reduce((acc, item) => {
      let price = item.product.product_price * item.quantity;
      return acc + price;
    }, 0);
    setTotal(totalPrice);
  };

  const handleIncrement = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/increment",
        { productId },
        { withCredentials: true }
      );
      updateCartData(productId, 1);
    } catch (error) {
      console.error("Error incrementing product:", error);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/decrement",
        { productId },
        { withCredentials: true }
      );
      if (response.data.message === "quantity decremented successfully") {
        updateCartData(productId, -1);
      }
    } catch (error) {
      console.error("Error decrementing product:", error);
    }
  };

  const updateCartData = (productId, changeAmount) => {
    const updatedData = data.map((item) => {
      if (item.product._id === productId) {
        return {
          ...item,
          quantity: item.quantity + changeAmount,
        };
      }
      return item;
    });
    setData(updatedData);
    calculateTotal(updatedData); // Recalculate total after updating quantity
  };

  const handleRemove = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/remove",
        { productId },
        { withCredentials: true }
      );
      // Update data state after successful removal
      const updatedData = data.filter((item) => item.product._id !== productId);
      setData(updatedData);
      calculateTotal(updatedData); // Recalculate total after removing item
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/payment-process', {
        totalPrice: total,
        userEmail,
        publisherKey,
        productName: "Cart Items",
        userId // Pass userId to the backend
      }, {
        withCredentials: true // If you are using credentials such as cookies
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="product-grid">
        {data.map((item) => (
          <div key={item._id} className="product-box">
            <img
              className="product-image"
              src={`http://localhost:5000/uploads/${item.product.product_image}`}
              alt={item.product.product_name}
            />
            <div className="product-details">
              <h2 className="product-name">{item.product.product_name}</h2>
              <p className="product-price">
                Price: ${item.product.product_price}
              </p>
              <p className="product-quantity">Quantity: {item.quantity}</p>
              <p>Total price: ₹{item.product.product_price * item.quantity}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => handleIncrement(item.product._id)}>+</button>
              <button onClick={() => handleDecrement(item.product._id)}>-</button>
              <button onClick={() => handleRemove(item.product._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <h1>Total: ₹{total}</h1>
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
}

export default Cart;
