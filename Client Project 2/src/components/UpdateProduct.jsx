import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerForProduct from "./CustomerForProduct";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const accessToken = sessionStorage['accessToken'];
  const [productState, setProductState] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (productId && products.length > 0) {
      const productParam = products.find(
        (product) => product._id === productId
      );
      setProductState(productParam);
    }
  }, [products, productId]);

  const cusListOfPurchPro = () => {
    const listOfCustomerIds = purchases
      ?.filter((purchase) => purchase.productId === productId)
      ?.map((purchase) => purchase.customerId);

    const customerList = customers?.filter((customer) =>
      listOfCustomerIds?.includes(customer._id)
    );
    return customerList;
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/products/${productId}`,
        productState, {
          headers: {
            'x-access-token': accessToken,
            'Content-Type': 'application/json'
          }
        }
      );
      dispatch({
        type: "UPDATE PRODUCT",
        payload: { ...productState, _id: productState._id },
      });
      alert('UPDATE PRODUCT successfully !')
    } catch (error) {
      alert('Some problem to update product, please try again.')
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: {
          'x-access-token': accessToken,
          'Content-Type': 'application/json'
        }
      });
      dispatch({ type: "DELETE PRODUCT", payload: productId });
      alert('DELETE PRODUCT successfully !')
      navigate(-1);
    } catch (error) {
      alert('Some problem to delete product, please try again.')
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="card-title mb-4">Update Product</h3>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productState?.name}
                onChange={(e) =>
                  setProductState({ ...productState, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={productState?.quantity}
                onChange={(e) =>
                  setProductState({ ...productState, quantity: +e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={productState?.price}
                onChange={(e) =>
                  setProductState({ ...productState, price: +e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="card-title mb-4">Customers Who Bought This Product</h3>
            <div className="list-group">
              {cusListOfPurchPro()?.map((customer) => (
                <div key={customer._id} className="list-group-item list-group-item-action">
                  <CustomerForProduct customer={customer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
