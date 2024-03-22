import CartProduct from "./CartProduct";
import CartTotal from "./CartTotal";
import classes from "./ShoppingMain.module.css";

const ShoppingMain = () => {
  return (
    <div className={classes.shoppingMain}>
      <h2>Shopping Cart</h2>
      <div className={classes.containerCart}>
        <CartProduct />
        <CartTotal />
      </div>
    </div>
  );
};
export default ShoppingMain;
