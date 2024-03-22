import { useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [formLoginData, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:5000/admin/login",
          formLoginData, // Truyền formData trực tiếp, không cần JSON.stringify
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.isLogin) {
            localStorage.setItem(
              "currentName",
              JSON.stringify(response.data.user)
            );
            navigate("/");
          } else {
            console.log(response.data.errMessage[0].msg);
            setError(response.data.errMessage[0].msg);
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.loginPage}>
      <form className={classes.form} noValidate>
        <h1>Sign in Admin</h1>
        <div className={classes["group-input"]}>
          <p>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleInputChange}
              value={formLoginData.password}
              placeholder="Password"
            />
          </p>
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className={classes.actions}>
          <button onClick={submitHandler}>Log in</button>
          <p>
            Create an account? <Link to="/admin/register">Click</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
