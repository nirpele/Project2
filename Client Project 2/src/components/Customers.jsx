import React from "react";
import { useSelector } from "react-redux";
import AddCustomer from "./AddCustomer";
import Customer from "./Customer";
import 'bootstrap/dist/css/bootstrap.min.css';

const Customers = () => {
  const customers = useSelector((state) => state.customers);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 order-md-2">
          <AddCustomer />
        </div>
        <div className="col-md-6 order-md-1">
          {customers?.map((customer) => (
            <Customer key={customer._id} customer={customer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;

