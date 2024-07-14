import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForCustomer = ({ product }) => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const dispatch = useDispatch();

  const handleAddCustomer = () => {
    setShowAddCustomer(!showAddCustomer);
  };

  const purchaseDate = () => {
    const purchaseProduct = purchases.find(
      (purchase) => purchase.productId === product._id
    );
    return purchaseProduct ? purchaseProduct.date : null;
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

 const handleSaveCustomer = async () => {
  if (selectedCustomer) {
    try {
      console.log(`Adding customer ${selectedCustomer} to product ${product._id}`);
      
      // Await the dispatch action
      const response = dispatch({
        type: "ADD PURCHASE",
        payload: { customerId: selectedCustomer, productId: product._id },
      });

      // Assuming response contains a success flag or message
      if (response ) {
        alert(`Customer ${selectedCustomer} added successfully to product ${product._id}`);
      } else {
        throw new Error("Failed to add customer");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      alert(`Failed to add customer ${selectedCustomer} to product ${product._id}. Error: ${error.message}`);
    } finally {
      // Reset the state and close the add customer modal
      setSelectedCustomer("");
      setShowAddCustomer(false);
    }
  } else {
    alert("No customer selected.");
  }
};


  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          <strong>
            <Link to={`/updateProduct/${product?._id}`}>{product.name}</Link>
          </strong>
        </h5>
        <p className="card-text">
          <strong>Quantity:</strong> {product?.quantity}
        </p>
        <p className="card-text">
          <strong>Price:</strong> {product?.price}$
        </p>
        <button className="btn btn-primary" onClick={handleAddCustomer}>
          Add Purchase
        </button>
        {showAddCustomer && (
          <div className="mt-3">
            <select
              className="form-select"
              onChange={handleCustomerChange}
              value={selectedCustomer}
            >
              <option value="">Select a Customer</option>
              {customers?.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.firstName}
                </option>
              ))}
            </select>
            <button className="btn btn-success mt-2" onClick={handleSaveCustomer}>
              Save Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductForCustomer;
