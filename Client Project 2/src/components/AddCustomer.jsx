import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCustomer = () => {
  const dispatch = useDispatch();
  const initialCustomerState = { firstName: "", lastName: "", city: "" };
  const [customer, setCustomer] = useState(initialCustomerState);
  const accessToken = sessionStorage["accessToken"];

  const handleAddCustomer = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/customers",
      customer,
      {
        headers: {
          "x-access-token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    data ? dispatch({ type: "ADD CUSTOMER", payload: data }) : null;
    setCustomer(initialCustomerState);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Add Customer</h3>
      <div className="form-group mb-3">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={customer.firstName}
          onChange={(e) =>
            setCustomer({ ...customer, firstName: e.target.value })
          }
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={customer.lastName}
          onChange={(e) =>
            setCustomer({ ...customer, lastName: e.target.value })
          }
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          className="form-control"
          id="city"
          value={customer.city}
          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddCustomer}>
        Add
      </button>
    </div>
  );
};

export default AddCustomer;
