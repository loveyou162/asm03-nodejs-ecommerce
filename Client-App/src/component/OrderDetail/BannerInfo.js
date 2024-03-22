import { useRouteLoaderData } from "react-router";
import classes from "./BannerInfo.module.css";

function BannerInfo() {
  const userData = useRouteLoaderData("orderdetail");
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes.BannerInfo}>
      <h1>Infomation order</h1>
      <p>ID User: {userData.user.userId}</p>
      <p>Full Name: {userData.user.fullname}</p>
      <p>Phone: {userData.user.phone}</p>
      <p>Address: {userData.user.address}</p>
      <p>Total: {formatPrice(userData.user.totalPrice)} VNĐ</p>
    </div>
  );
}
export default BannerInfo;
