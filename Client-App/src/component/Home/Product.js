import { useRouteLoaderData } from "react-router";
import React, { memo } from "react";
import classes from "./Product.module.css";
import { uiAction } from "../../store.js/ui-slice";
import { useDispatch } from "react-redux";

function Products() {
  const dispatch = useDispatch();
  const data = useRouteLoaderData("root");
  console.log(data);
  let priceArr = [];
  //lặp qua mảng data để lấy dữ liệu price và chuyển vào mảng priceArr
  data.forEach(function (obj) {
    priceArr.push(obj.price);
  });
  //hàm hiển thị popup
  const showPopup = (product) => {
    dispatch(uiAction.selectedProduct(product));
    dispatch(uiAction.showPopup());
  };

  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };

  // hạn chế số lượng sản phẩm hiển thị tối đa 8 sản phẩm
  const maxProduct = 8;
  const limitedData = data.slice(0, maxProduct);
  console.table(limitedData);

  return (
    <div className={classes.products}>
      <div className={classes["product-title"]}>
        <p>Made the hard way</p>
        <h2>Top trending products</h2>
      </div>
      <ul className={classes["product-list"]}>
        {/* hiển thị danh sách các sản phẩm */}
        {limitedData.map((product) => (
          <li key={product._id} onClick={() => showPopup(product)}>
            <img src={product.img1} alt={product.name} loading="lazy" />
            <h3>{product.name}</h3>
            <p>{formatPrice(product.price)}đ</p>
          </li>
        ))}
      </ul>

      <div className={classes["other-info"]}>
        <div className={classes.infoBox}>
          <h2>Free shipping</h2>
          <p> Free shipping worlwire</p>
        </div>
        <div className={classes.infoBox}>
          <h2>24 X 7 services</h2>
          <p> Free shipping worlwire</p>
        </div>
        <div className={classes.infoBox}>
          <h2>Festival offer</h2>
          <p> Free shipping worlwire</p>
        </div>
      </div>
      <div className={classes.boxInput}>
        <div className={classes.letBox}>
          <h2>let's be friends!</h2>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <div className={classes.groupInput}>
          <input
            type="email"
            className={classes.address}
            placeholder="Enter your email address"
          />
          <button>Subcribe</button>
        </div>
      </div>
    </div>
  );
}

export default memo(Products);
