import { useDispatch } from "react-redux";
import classes from "./CartProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../store.js/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const CartProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const previousPage = () => {
    navigate(-1);
  };
  //state này chỉ có tác dụng cập để useEffect render lại
  const [reRender, setRender] = useState(0);
  const [cartItemData, setCartItemData] = useState([]);
  //hàm option của http
  const optionAxios = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const dispatch = useDispatch();
  //load dữ liệu cart khi có sự thay đổi về số lượng
  useEffect(() => {
    axios
      .get(`http://localhost:5000/shop/cart`, optionAxios)
      .then((response) => {
        setCartItemData(response.data);
        dispatch(cartActions.updateCart(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, reRender]);
  const increment = (itemId) => {
    axios
      .post(
        `http://localhost:5000/shop/add-cart`,
        { productId: itemId },
        optionAxios
      )
      .then((response) => {
        // Xử lý kết quả nếu cần
        setRender(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error sending cart data:", error);
      });
  };
  const decrement = (itemId) => {
    axios
      .post(
        `http://localhost:5000/shop/decrement-cart`,
        { productId: itemId },
        optionAxios
      )
      .then((response) => {
        if (response.data) {
          setRender(response.data);
        } else {
          const updatedCartItems = cartItemData.filter(
            (item) => item.productId._id !== itemId
          );
          setCartItemData(updatedCartItems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const remove = (itemId) => {
    axios
      .post(
        `http://localhost:5000/shop/delete-cart`,
        { productId: itemId },
        optionAxios
      )
      .then((response) => {
        const updatedCartItems = cartItemData.filter(
          (item) => item.productId._id !== itemId
        );
        setCartItemData(updatedCartItems);
        setRender(response.data.quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //hàm thêm dấu chấm vào giá tiền
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes.cartProduct}>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>product</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItemData.map((item) => (
            <tr className={classes["cart-component"]} key={item._id}>
              <td className={classes["cart__img-product"]}>
                <img src={item.productId.img1} alt="" />
              </td>
              <td className={classes["cart__price-product"]}>
                <p>{item.productId.name}</p>
              </td>
              <td>{formatPrice(item.productId.price)} VND</td>
              <td>
                <div className={classes["cart-page-number"]}>
                  <div className={classes["page-number"]}>
                    <button onClick={() => decrement(item.productId._id)}>
                      <ion-icon name="caret-back-outline"></ion-icon>
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increment(item.productId._id)}>
                      <ion-icon name="caret-forward-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <p>{formatPrice(item.quantity * item.productId.price)} VND</p>
              </td>
              <td className={classes["cart-btn-trash"]}>
                {/* nút xóa sản phẩm */}
                <button onClick={() => remove(item.productId._id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes["cart-control"]}>
        <button onClick={previousPage}>
          <i className="fa-solid fa-arrow-left"></i> Continue shopping
        </button>
        <Link to="/checkout">
          Proceed to checkout
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};
export default CartProduct;
