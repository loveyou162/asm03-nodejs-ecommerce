import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../store.js/ui-slice";

export const usePopup = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.ui.selectedProduct);
  const show = useSelector((state) => state.ui.showPopup);

  const hidePopup = () => {
    dispatch(uiAction.hidePopup());
  };

  const formatPrice = (price) => {
    let priceString = price.toString();
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };

  return { show, selectedProduct, hidePopup, formatPrice };
};
