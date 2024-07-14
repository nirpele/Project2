import { useSelector } from 'react-redux';
import AddProduct from './AddProduct';
import Product from './Product';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-12">
          <div className="alert alert-info" role="alert">
            Total amount of purchased products: {purchases?.length}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 order-md-2">
          <AddProduct />
        </div>
        <div className="col-md-6 order-md-1">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

