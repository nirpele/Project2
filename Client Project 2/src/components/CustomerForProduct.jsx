import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';


const CustomerForProduct = ({ customer }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  const purchaseDate = () => {
    const purchaseCustomer = purchases.find((purchase) => purchase.customerId === customer._id);
    return purchaseCustomer ? purchaseCustomer.date : null;
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleSaveProduct = async () => {
    if (selectedProduct) {
      try {
        console.log(`Adding product ${selectedProduct} to customer ${customer._id}`);
        
        // Dispatch action with a try block to handle the promise
        const response =  dispatch({
          type: "ADD PURCHASE",
          payload: { customerId: customer._id, productId: selectedProduct },
        });
  
        // If dispatch is successful, you can show a success alert
        if (response) {
          alert(`Product ${selectedProduct} added successfully to customer ${customer._id}`);
        } else {
          throw new Error("Failed to add product");
        }
  
      } catch (error) {
        console.error("Error adding product:", error);
        alert(`Failed to add product ${selectedProduct} to customer ${customer._id}. Error: ${error.message}`);
      } finally {
        // Reset the state and close the add product modal
        setSelectedProduct("");
        setShowAddProduct(false);
      }
    } else {
      alert("No product selected.");
    }
  };
  

  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/updateCustomer/${customer._id}`} className="text-decoration-none">
            <strong>{customer.firstName} {customer.lastName}</strong>
          </Link>
        </h5>
        <p className="card-text">
          <strong>City:</strong> {customer.city}
        </p>
        <p className="card-text">
          <strong>Purchase Date:</strong> {purchaseDate()}
        </p>
        <button className="btn btn-primary" onClick={handleAddProduct}>
          {showAddProduct ? 'Cancel' : 'Add Purchase'}
        </button>
        {showAddProduct && (
          <div className="mt-3">
            <select className="form-select" onChange={handleProductChange} value={selectedProduct}>
              <option value="">Select a Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <button className="btn btn-success mt-2" onClick={handleSaveProduct}>
              Save Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerForProduct;
