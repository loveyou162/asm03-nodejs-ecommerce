import { useSelector } from "react-redux";
import classes from "./CheckoutTotal.module.css";
import { useRouteLoaderData } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
const CheckoutTotal = () => {
  const [productItem, setProductItem] = useState([]);
  const optionAxios = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/shop/cart", optionAxios)
      .then((response) => {
        console.log(response.data);
        setProductItem(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //lấy dữ liệu từ localStorage
  const total = JSON.parse(localStorage.getItem("totalAmount"));
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };

  return (
    <div className={classes.CheckoutTotal}>
      <h2>Your order</h2>
      {productItem.map((item) => (
        <div
          className={classes["checkout-total__subtotal"]}
          key={item.productId._id}
        >
          <h4>{item.productId.name}</h4>
          <p>
            {formatPrice(item.productId.price)} VND x{item.quantity}
          </p>
        </div>
      ))}
      <div className={classes["checkout-total__all"]}>
        <h3>Total</h3>
        <p>{formatPrice(total)} VND</p>
      </div>
    </div>
  );
};
export default CheckoutTotal;
