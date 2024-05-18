import { useLoaderData } from "react-router-dom";
import classes from "./dashboard.module.css";
import axios from "axios";

const Dashboard = () => {
  const dataDash = useLoaderData();
  console.log(dataDash);
  const formatPrice = (price) => {
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes.dashboard}>
      <h3>Dashboard</h3>
      <ul className={classes["dashboard-review"]}>
        <li>
          <article>
            <h1>{dataDash.quantityUser}</h1>
            <p>Client</p>
          </article>
          <ion-icon name="person-add-outline"></ion-icon>
        </li>
        <li>
          <article>
            <div className={classes["dashboard__all-money"]}>
              <h1>{formatPrice(dataDash.averagePrice)}</h1>
              <p>VND</p>
            </div>
            <p>Earnings of Month</p>
          </article>
          <ion-icon name="cash-outline"></ion-icon>
        </li>
        <li>
          <article>
            <h1>{dataDash.quantityOrder}</h1>
            <p>New Order</p>
          </article>
          <ion-icon name="document-outline"></ion-icon>
        </li>
      </ul>
      <h3>History</h3>
      <table className={classes["product-table"]}>
        <thead>
          <tr>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {dataDash.listOrder.map((order) => (
            <tr key={order._id}>
              <td>{order.user.userId}</td>
              <td>{order.user.fullname}</td>
              <td>{order.user.phone}</td>
              <td>{order.user.address}</td>
              <td>{formatPrice(order.user.totalPrice)}</td>
              <td>Chưa vận chuyển</td>
              <td>Chưa thanh toán</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;
export async function loader() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get("http://localhost:5000/admin/dashboard", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Response(
      { message: "Tài khoản của bạn chỉ có thể sử dụng tính năng chat" },
      { status: 401 }
    );
  }
}
