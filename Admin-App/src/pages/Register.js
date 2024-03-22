import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useState } from "react";
// import RegisterForm from "../component/RegisterForm";

function LoginPage() {
  const navigate = useNavigate();
  //khởi tạo state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });
  const [error, setError] = useState("");

  //hàm nhận giá trị khi input được nhập
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //hàm gửi hành động của form
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const csrfReq = await fetch("http://localhost:5000/admin/some-route");
      if (!csrfReq.ok) {
        throw new Error("Failed to fetch CSRF token");
      }
      const csrf = await csrfReq.json();
      const csrfToken = csrf.csrfToken;

      const response = await fetch("http://localhost:5000/admin/signup", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
      const resData = await response.json();

      // chuyển hướng sang login page
      if (resData.isSignup) {
        navigate("/admin/login");
      } else {
        setError(resData.errMessage ? resData.errMessage[0].msg : null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={classes.loginPage}>
      <form onSubmit={submitHandler} className={classes.form} noValidate>
        <h1>Sign up Admin</h1>
        <div className={classes["group-input"]}>
          <p>
            <input
              id="full-name"
              type="text"
              name="fullname"
              onChange={handleInputChange}
              value={formData.fullname}
              placeholder="Full Name"
            />
          </p>
          <p>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Email"
            />
          </p>
          <p>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </p>

          <p>
            <input
              id="phone"
              type="number"
              name="phone"
              onChange={handleInputChange}
              placeholder="Phone"
              value={formData.phone}
            />
          </p>
          <p>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="counselors">Counselors</option>
            </select>
          </p>
        </div>
        {/* hiển thị lỗi */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className={classes.actions}>
          <button>Sign up</button>
          <p>
            Login? <Link to="/admin/login">Click</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
