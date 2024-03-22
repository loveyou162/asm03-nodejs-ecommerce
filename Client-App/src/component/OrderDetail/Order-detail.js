import React from "react";
import { useRouteLoaderData } from "react-router";
import classes from "./Order-detail.module.css";

const OrderListDetail = () => {
  const orderListDetail = useRouteLoaderData("orderdetail");
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes["Order__List-Detail"]}>
      <table className={classes.tableOrder}>
        <tr>
          <th>Id Product</th>
          <th>Image</th>
          <th>name</th>
          <th>Price</th>
          <th>Count</th>
        </tr>
        {orderListDetail.products.map((order) => (
          <tr key={order._id}>
            <td>{order.product._id}</td>
            <td>
              <img
                src={order.product.img1}
                className={classes["img__order-detail"]}
                alt={order.product.name}
              />
            </td>
            <td>{order.product.name}</td>
            <td>{formatPrice(order.product.price)} VND</td>
            <td>{order.quantity}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default OrderListDetail;
