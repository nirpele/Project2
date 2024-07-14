import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
  const dispatch = useDispatch();
  const accessToken = sessionStorage["accessToken"];

  const initialProductState = { quantity: 0, price: 0, name: "" };
  const [product, setProduct] = useState(initialProductState);

  const handleAddProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        product,
        {
          headers: {
            "x-access-token": accessToken,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Dispatch action to add the product
      dispatch({ type: "ADD PRODUCT", payload: data });
  
      // Show success alert
      alert(`Product ${data.name} added successfully!`);
      
      // Reset the product state
      setProduct(initialProductState);
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Failed to add product. Error: ${error.message}`);
    }
  };
  

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Add Product</h3>
      <div className="form-group mb-3">
        <label htmlFor="productName">Name:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="productQuantity">Quantity:</label>
        <input
          type="number"
          className="form-control"
          id="productQuantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: +e.target.value })}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="productPrice">Price:</label>
        <input
          type="number"
          className="form-control"
          id="productPrice"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddProduct}>Add</button>
    </div>
  );
};

export default AddProduct;
