import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <FaExclamationTriangle size="5em" color="orange" />
      <h1 className="mt-4">404</h1>
      <h2>Page Not Found</h2>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
