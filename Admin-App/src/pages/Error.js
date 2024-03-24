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
    title = "401  Unauthorized!";
    message = "Tài khoản của bạn không thể sử dụng tính năng này!";
  }
  const deleteToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <div className="Error-Page">
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="group-btn-err">
        <Link to="/admin/login" onClick={deleteToken}>
          Login
        </Link>
        <Link to="/admin/chat">Chat</Link>
      </div>
    </div>
  );
}

export default ErrorPage;
