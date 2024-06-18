import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Table() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/admin/${id}`)
      .then(() => {
        console.log("Item deleted successfully");
        setData(data.filter(item => item._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleEdit = (item) => {
    localStorage.setItem("edit", JSON.stringify(item));
    navigate(`/edit/${item._id}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Table</h1>
      <Link to="/admin" className="btn btn-primary mb-3">Add Product</Link>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.product_name}</td>
              <td>{item.product_price}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${item.product_image}`}
                  alt={item.product_name}
                  className="img-thumbnail"
                  style={{ width: '100px', height: '100px' }}
                />
              </td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
