import BannerCheckout from "../component/Checkout/BannerCheckout";
import classes from "./Checkout.module.css";
import CheckoutInput from "../component/Checkout/CheckoutInput";
import CheckoutTotal from "../component/Checkout/CheckoutTotal";

function CheckoutPage() {
  return (
    <div className={classes.checkout}>
      <BannerCheckout />
      <h2>Billding Details</h2>
      <div className={classes.checkoutMain}>
        <CheckoutInput />
        <CheckoutTotal />
      </div>
    </div>
  );
}
export default CheckoutPage;
