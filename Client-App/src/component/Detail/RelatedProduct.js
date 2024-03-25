import { useRouteLoaderData } from "react-router";
import classes from "./RelatedProduct.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RelatedProduct(props) {
  const data = useRouteLoaderData("root");
  const [product, setProduct] = useState([]);
  const category = props.category;
  useEffect(() => {
    function loadProduct() {
      if (category) {
        setProduct(data.filter((product) => product.category === category));
      }
    }
    setProduct([]);
    loadProduct();
  }, [category, data]);
  // Di chuyển đến đầu trang khi cuộn
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Làm mềm dịch chuyển
    });
  }
  //hàm định dạng giá tiền
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes.relatedProduct}>
      <h2>Related Products</h2>
      <ul className={classes["product-list"]}>
        {/* hiển thị danh sách các sản phẩm */}
        {product.map((item) => (
          <li key={item._id}>
            <Link to={`/detail/${item._id}`} onClick={scrollToTop}>
              <img src={item.img1} alt={item.name} loading="lazy" />
              <h3>{item.name}</h3>
              <p>{formatPrice(item.price)}đ</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RelatedProduct;
