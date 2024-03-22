import classes from "./BannerCheckout.module.css";

function BannerCheckout() {
  return (
    <div className={classes.BannerCheckout}>
      <h1>checkout</h1>
      <div className={classes["banner-checkout-title"]}>
        <h3>Home / cart / </h3>
        <h3>checkout</h3>
      </div>
    </div>
  );
}
export default BannerCheckout;
