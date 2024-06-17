import React, { useEffect } from 'react';
import './Success.css'; // Import the CSS file for styling
import { Link, useNavigate } from "react-router-dom";

function Success() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/user');
        }, 10000);

        return () => clearTimeout(timer); 
    }, [navigate]); 

    return (
        <div className="success-container">
            <i className="checkmark">✓</i>
            <h1>Payment Successful!</h1>
            <p>Your order has been confirmed.</p>
            <p>Thank you for shopping with us!</p>
            <Link to="/user">Go to Product Page</Link>
            otherwise It Can Be Redirect to the Product Page Automatically in 10 Seconds 
        </div>
    );
}

export default Success;
