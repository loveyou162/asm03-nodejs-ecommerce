import classes from "./InfoProduct.module.css";

import RelatedProduct from "./RelatedProduct";
import { useParams, useRouteLoaderData } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
function InfoProduct() {
  // Sử dụng hook useParams để lấy các tham số từ URL
  const params = useParams();
  // const data = useRouteLoaderData("root");
  // console.log(data);
  // State để lưu trữ thông tin sản phẩm được chọn
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/shop/detail-product?prodId=${params.productId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        if (response) {
          setProductData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Tìm sản phẩm dựa trên tham số từ URL
    fetchDataDetail();
  }, [params.productId]);
  // Hàm xử lý khi nhấn nút "Add to cart"
  // console.log(productData);
  const addToCartHandler = () => {
    if (productData.count > 0) {
      axios.post(
        "http://localhost:5000/shop/add-cart",
        { productId: params.productId },
        {
          headers: {
            "Content-Types": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
    } else {
      alert(
        "Số lượng sản phẩm trong giỏ hàng đang tạm hết, vui lòng lựa chọn sản phẩm khác!"
      );
    }
  };
  // Nếu sản phẩm chưa được tải, hiển thị thông báo "Loading..."
  if (!productData) {
    return <p>Loading...</p>;
  }

  // Hàm định dạng giá tiền để thêm dấu chấm ngăn cách
  const formatPrice = (price) => {
    let priceString = price.toString();
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  const increment = () => {
    // Gọi action để tăng số lượng sản phẩm
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Render các thông tin sản phẩm và giao diện
  return (
    <div className={classes.infoProduct}>
      {/* Hình ảnh chi tiết sản phẩm */}

      <ul className={classes["img-detail"]}>
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <img src={productData[`img${index + 1}`]} alt={productData.name} />
          </li>
        ))}
      </ul>
      {/* Hình ảnh chính của sản phẩm */}
      <img
        className={classes.imgMain}
        src={productData.img1}
        alt={productData.name}
      />
      {/* Thông tin chi tiết sản phẩm */}
      <div className={classes["box-infoDetail"]}>
        <h1>{productData.name}</h1>
        <p className={classes["price-detail"]}>
          {formatPrice(productData.price)}đ
        </p>
        <p className={classes["price__detail-des"]}>{productData.short_desc}</p>
        {/* Thể loại sản phẩm */}
        <div className={classes["directory"]}>
          <h4>Catagories:</h4>
          <p>{productData.category}</p>
        </div>
        <div className={classes["directory"]}>
          <h4>Count:</h4>
          <p>{productData.count}</p>
        </div>
        {/* Số lượng và nút thay đổi số lượng ấn nút add trước khi ấn tăng số lượng nếu ko sẽ bị lỗi*/}
        <div className={classes["quantity-addCart"]}>
          <div className={classes["custom-number-input"]}>
            <p>QUANTITY</p>
            <div className={classes["custom-quantity"]}>
              <button onClick={() => decrement(productData._id)}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <p>{quantity}</p>
              <button onClick={() => increment(productData._id)}>
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          {/* Nút thêm vào giỏ hàng */}
          <button
            className={classes["btn-add-cart"]}
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        </div>
      </div>
      {/* Mô tả sản phẩm */}
      <div className={classes["product-description"]}>
        <div className={classes["product-des"]}>
          <button>Description</button>
          <h3>product Description</h3>
          <p>{productData.long_desc}</p>
        </div>
        {/* Sản phẩm liên quan */}
        <RelatedProduct category={productData.category} />
      </div>
    </div>
  );
}

export default InfoProduct;
