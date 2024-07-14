import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForCustomer from './ProductForCustomer';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateCustomer = () => {
  const dispatch = useDispatch();
  const { customerId } = useParams();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);
  const accessToken = sessionStorage['accessToken'];
  const [customerState, setCustomerState] = useState({
    firstName: "",
    lastName: "",
    city: "",
  });

  const proListOfPurchCus = () => {
    const listOfProductsIds = purchases?.filter((purchase) => purchase.customerId === customerState._id)
      ?.map((purchase) => purchase.productId);
    const productList = products?.filter((product) =>
      listOfProductsIds?.includes(product._id)
    );
    return productList;
  };

  useEffect(() => {
    if (customerId && customers.length > 0) {
      const customerParam = customers.find(
        (customer) => customer._id === customerId
      );
      setCustomerState(customerParam);
    }
  }, [customers, customerId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/customers/${customerId}`, {
        headers: {
          'x-access-token': accessToken,
          'Content-Type': 'application/json'
        }
      });
      dispatch({ type: "DELETE CUSTOMER", payload: customerId });
      alert('DELETE PRODUCT successfully !')
      navigate(-1);
    } catch (error) {
      alert('Some problem to delete customer, please try again.')
      console.error("Error deleting customer:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/customers/${customerId}`, customerState, {
        headers: {
          'x-access-token': accessToken,
          'Content-Type': 'application/json'
        }
      });
      dispatch({
        type: "UPDATE CUSTOMER",
        payload: { ...customerState, _id: customerState._id },
      });
      alert('UPDATE PRODUCT successfully !')
    } catch (error) {
      alert('Some problem to update product, please try again.')
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="card-title mb-4">Update Customer</h3>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={customerState?.firstName}
                onChange={(e) =>
                  setCustomerState({ ...customerState, firstName: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={customerState?.lastName}
                onChange={(e) =>
                  setCustomerState({ ...customerState, lastName: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City:</label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={customerState?.city}
                onChange={(e) =>
                  setCustomerState({ ...customerState, city: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="card-title mb-4">Purchased Products</h3>
            <div className="list-group">
              {proListOfPurchCus()?.map((product) => (
                <div key={product._id} className="list-group-item list-group-item-action">
                  <ProductForCustomer product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
