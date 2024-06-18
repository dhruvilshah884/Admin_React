import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_name: '',
    product_price: '',
    product_image: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/${id}`)
      .then((res) => {
        const { product_name, product_price, product_image } = res.data;
        setFormData({ product_name, product_price, product_image });
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'product_image' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { product_name, product_price, product_image } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('product_name', product_name);
    formDataToSend.append('product_price', product_price);
    formDataToSend.append('product_image', product_image);

    axios.put(`http://localhost:5000/admin/${id}`, formDataToSend)
      .then((res) => {
        console.log('Product updated successfully:', res.data);
        navigate('/table'); // Redirect to the table page after successful update
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className="edit-form-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="number"
            name="product_price"
            value={formData.product_price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Image:</label>
          <input
            type="file"
            name="product_image"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditForm;
