import { useState } from "react";
import classes from "./CheckoutInput.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

const CheckoutInput = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [formCheckOut, setFormCheckOut] = useState({
    fullname: 0,
    email: "",
    phone: "",
    address: "",
  });
  const totalPrice = localStorage.getItem("totalAmount");
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormCheckOut((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const orderHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://asm03-nodejs-server.onrender.com/shop/order`,
        {
          ...formCheckOut,
          totalPrice: parseInt(totalPrice),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        alert(response.data.message);
        if (!response.data.isOrder) {
          navigate("/checkout");
        } else {
          navigate("/order");
        }
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        console.error("Error:", error.response.data);
        alert(error.response.data.errors[0].msg);
      });
  };

  const viewOrderHandler = (req, res, next) => {
    navigate("/order");
  };
  return (
    <div className={classes["CheckoutInput"]}>
      <form method="post" onSubmit={orderHandler}>
        <div className={classes["name-input"]}>
          <label>Full Name:</label>
          <input
            type="text"
            placeholder="Enter Your Full Name Here!"
            name="fullname"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["email-input"]}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email Here!"
            name="email"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["phone-input"]}>
          <label>phone number:</label>
          <input
            type="number"
            placeholder="Enter Your Phone Number Here!"
            name="phone"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["name-input"]}>
          <label>address:</label>
          <input
            type="address"
            placeholder="Enter Your Address Here!"
            name="address"
            onChange={inputChangeHandler}
          />
        </div>
        <button>Place order</button>
      </form>
      <button onClick={viewOrderHandler} className={classes["btn__view-order"]}>
        View Order
      </button>
    </div>
  );
};
export default CheckoutInput;
