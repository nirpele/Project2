import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomerForProduct from "./CustomerForProduct";
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = ({ product }) => {
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);

  const cusListOfPurchPro = () => {
    const listOfCustomerIds = purchases
      ?.filter((purchase) => purchase.productId === product._id)
      ?.map((purchase) => purchase.customerId);
    const customerList = customers?.filter((customer) =>
      listOfCustomerIds?.includes(customer._id)
    );
    return customerList;
  };

  return (
    <div className="card mb-3" style={{ maxWidth: "24rem" }}>
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

        <h6>All customers that bought the product:</h6>
        <div className="list-group">
          {cusListOfPurchPro()?.map((customer) => (
            <a
              key={customer._id}
              href="#"
              className="list-group-item list-group-item-action"
            >
              <CustomerForProduct customer={customer} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
