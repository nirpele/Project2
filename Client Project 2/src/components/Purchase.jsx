import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Purchase = ({ purchase }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Purchase ID: {purchase._id}</h5>
        <p className="card-text">
          <strong>Product ID:</strong> {purchase.productId}
        </p>
        <p className="card-text">
          <strong>Customer ID:</strong> {purchase.customerId}
        </p>
        <p className="card-text">
          <strong>Date of Purchase:</strong> {purchase.date}
        </p>
      </div>
    </div>
  );
};

export default Purchase;
