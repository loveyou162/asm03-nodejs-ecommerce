import classes from "./Categories.module.css";
import product_1 from "../../assets/Resource Assignment 03/product_1.png";
import product_2 from "../../assets/Resource Assignment 03/product_2.png";
import product_3 from "../../assets/Resource Assignment 03/product_3.png";
import product_4 from "../../assets/Resource Assignment 03/product_4.png";
import product_5 from "../../assets/Resource Assignment 03/product_5.png";
import { Link } from "react-router-dom";
function Categories() {
  return (
    <div className={classes.categories}>
      <div className={classes["category-title"]}>
        <p>Carefully created collections</p>
        <h2>Browse our categories</h2>
      </div>
      <ul className={classes["product-categories"]}>
        <li className={classes["product-1"]}>
          <Link to="shop/iphone">
            <img src={product_1} alt="" />
          </Link>
        </li>
        <li className={classes["product-2"]}>
          <Link to="shop/mac">
            <img src={product_2} />
          </Link>
        </li>
        <li className={classes["product-3"]}>
          <Link to="shop/ipad">
            <img src={product_3} />
          </Link>
        </li>
        <li className={classes["product-4"]}>
          <Link to="shop/watch">
            <img src={product_4} />
          </Link>
        </li>
        <li className={classes["product-5"]}>
          <Link to="shop/airpod">
            <img src={product_5} />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Categories;
