import { Link, useRouteError } from "react-router-dom";
import "./Error.css";
function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }
  if (error.status === 401) {
    title = "Unauthorized!";
    message = "Tài khoản của bạn không thể sử dụng tính năng này";
  }

  return (
    <div className="Error-Page">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default ErrorPage;
