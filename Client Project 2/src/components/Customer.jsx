import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductForCustomer from "./ProductForCustomer";
import 'bootstrap/dist/css/bootstrap.min.css';

const Customer = ({ customer }) => {
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);

  const proListOfPurchCus = () => {
    const listOfProductsIds = purchases
      ?.filter((purchase) => purchase.customerId === customer._id)
      ?.map((purchase) => purchase.productId);

    const productList = products?.filter((product) =>
      listOfProductsIds?.includes(product._id)
    );

    return productList;
  };

  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          <strong>
            <Link to={`/updateCustomer/${customer._id}`}>
              {customer.firstName} {customer.lastName}
            </Link>
          </strong>
        </h5>
        <p className="card-text">
          <strong>City:</strong> {customer.city}
        </p>
        <div className="mb-3">
          <strong>All Customer Purchased Products:</strong>
          <div className="list-group">
            {proListOfPurchCus()?.map((product) => (
              <a
                key={product._id}
                href="#"
                className="list-group-item list-group-item-action"
              >
                <ProductForCustomer product={product} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
