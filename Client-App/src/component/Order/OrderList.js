import { useRouteLoaderData } from "react-router";
import classes from "./OrderList.module.css";
import { Link } from "react-router-dom";
const OrderList = () => {
  //lấy dữ liệu order từ router /order
  const orderData = useRouteLoaderData("order");
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes.orderList}>
      <table className={classes.tableOrder}>
        <tr>
          <th>Id Order</th>
          <th>id User</th>
          <th>name</th>
          <th>phone</th>
          <th>address</th>
          <th>total</th>
          <th>delivery</th>
          <th>status</th>
          <th>detail</th>
        </tr>
        {orderData.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.user.userId}</td>
            <td>{order.user.fullname}</td>
            <td>{order.user.phone}</td>
            <td>{order.user.address}</td>
            <td>{formatPrice(order.user.totalPrice)} VNĐ</td>
            <td>Waiting for progressing</td>
            <td>Waiting for pay</td>
            <td>
              <Link to={`/order/${order._id}`}>
                <p>View</p>
                <i className="fa-solid fa-right-long"></i>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default OrderList;
