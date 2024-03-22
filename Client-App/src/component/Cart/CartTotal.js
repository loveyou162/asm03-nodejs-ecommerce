import { useSelector } from "react-redux";
import classes from "./CartTotal.module.css";

const CartTotal = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  localStorage.setItem("totalAmount", totalAmount);
  // hàm thêm dấu chấm vào giá tiền
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes["cart-total"]}>
      <h2>Cart Total</h2>
      <div className={classes["cart-total__subtotal"]}>
        <h3>Subtotal</h3>
        <p>{formatPrice(totalAmount)} VND</p>
      </div>
      <div className={classes["cart-total__all"]}>
        <h3>Total</h3>
        <p>{formatPrice(totalAmount)} VND</p>
      </div>
      <div className={classes["cart-total__box-voucher"]}>
        <input type="text" placeholder="Enter your coupon" />
        <button>
          <ion-icon name="gift-outline"></ion-icon>
          <p>Apply coupon</p>
        </button>
      </div>
    </div>
  );
};
export default CartTotal;
