import { useParams, useRouteLoaderData } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { counterAction } from "../../store.js/counter-slice";

import Navleft from "./Navleft";
import classes from "./ProductList.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ProductList() {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.counter.value);

  const [product, setProduct] = useState([]);
  const params = useParams();
  const data = useRouteLoaderData("root");
  //   console.log(data);
  const increment = () => {
    dispatch(counterAction.increment());
  };
  const decrement = () => {
    dispatch(counterAction.decrement());
  };

  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  useEffect(() => {
    function loadProduct() {
      if (params.shopId === "all") {
        setProduct(data);
      } else {
        setProduct(
          data.filter((product) => product.category === params.shopId)
        );
      }
    }
    setProduct([]);
    loadProduct();
  }, [params.shopId, data]);

  // console.log(product);
  const quantityResult = product.length;
  return (
    <div className={classes.productItem}>
      <Navleft />
      <div className={classes["container-group"]}>
        <div className={classes["group-search"]}>
          <input type="search" placeholder="Enter search here!" />
          <select>
            <option>default sorting</option>
            <option>ipad</option>
            <option>iphone</option>
            <option>macbook</option>
            <option>airpod</option>
            <option>watch</option>
            <option>mouse</option>
            <option>keyboard</option>
            <option>other</option>
          </select>
        </div>
        <ul className={classes["product-list"]}>
          {/* hiển thị danh sách các sản phẩm */}
          {product.map((product) => (
            <li key={product.id}>
              <Link to={`/detail/${product._id}`}>
                <img src={product.img1} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{formatPrice(product.price)}đ</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className={classes["box-page-number"]}>
          <div className={classes["page-number"]}>
            <button onClick={() => decrement()}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <p>{quantity}</p>
            <button onClick={() => increment()}>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <p>showing {quantityResult} - 8 result</p>
        </div>
      </div>
    </div>
  );
}
export default ProductList;
