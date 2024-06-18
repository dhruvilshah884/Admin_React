import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

function UserData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/userData")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/userData/${id}`)
      .then(() => {
        console.log("User deleted successfully");
        setData(data.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleBlock = (id) => {
    axios
      .post(`http://localhost:5000/Userblock/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setData(data.map((user) => 
          user._id === id ? { ...user, isBlock: true } : user
        ));
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
      });
  };

  const handleUnblock = (id) => {
    axios
      .post(`http://localhost:5000/unblock/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setData(data.map((user) => 
          user._id === id ? { ...user, isBlock: false } : user
        ));
      })
      .catch((error) => {
        console.error("Error unblocking user:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Data Table</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Is Payment</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Image</th>
            <th>Quantity</th>
            <th>Delete</th>
            <th>Block/Unblock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <React.Fragment key={user._id}>
              {user.cart.length > 0 ? (
                user.cart.map((item, index) => (
                  <tr key={index} className={user.isBlock ? "blocked-user" : ""}>
                    {index === 0 && (
                      <>
                        <td rowSpan={user.cart.length} className="align-middle">
                          {user.name}
                        </td>
                        <td rowSpan={user.cart.length} className="align-middle">
                          {user.email}
                        </td>
                        <td rowSpan={user.cart.length} className="align-middle">
                          {user.isPayment.toString()}
                        </td>
                      </>
                    )}
                    <td className="align-middle">
                      {item.product.product_name}
                    </td>
                    <td className="align-middle">
                      {item.product.product_price}
                    </td>
                    <td className="align-middle">
                      <img
                        src={`http://localhost:5000/uploads/${item.product.product_image}`}
                        alt={item.product.product_name}
                        className="img-thumbnail"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td className="align-middle">{item.quantity}</td>
                    {index === 0 && (
                      <>
                        <td rowSpan={user.cart.length} className="align-middle">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td rowSpan={user.cart.length} className="align-middle">
                          {user.isBlock ? (
                            <button
                              className="btn btn-success"
                              onClick={() => handleUnblock(user._id)}
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleBlock(user._id)}
                            >
                              Block
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr className={user.isBlock ? "blocked-user" : ""}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isPayment.toString()}</td>
                  <td colSpan="4">No Products</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {user.isBlock ? (
                      <button
                        className="btn btn-success"
                        onClick={() => handleUnblock(user._id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleBlock(user._id)}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserData;
