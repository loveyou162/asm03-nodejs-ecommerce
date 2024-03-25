import classes from "./Popup-product.module.css";
import { Link } from "react-router-dom";
import { usePopup } from "../hook/usePopup";

const Popup = (props) => {
  const { show, selectedProduct, hidePopup, formatPrice } = usePopup();
  if (!selectedProduct) {
    return null;
  }

  return (
    <div className={`${classes.popup} ${show ? classes.show : ""}`}>
      {show && (
        <>
          <div className={classes.backdrop} onClick={hidePopup}></div>
          <div className={classes["popup-content"]}>
            <img src={`${selectedProduct.img1}`} alt="" />
            <button onClick={hidePopup} className={classes["close-btn"]}>
              <i className="fa-solid fa-x"></i>
            </button>
            <div className={classes["group-info"]} key={props.id}>
              <h3>{selectedProduct.name}</h3>
              <p>{formatPrice(selectedProduct.price)}đ</p>
              <p className={classes.description}>{selectedProduct.long_desc}</p>
              <Link
                to={`/detail/${selectedProduct._id}`}
                className={classes.btnView}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                View Details
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Popup;
