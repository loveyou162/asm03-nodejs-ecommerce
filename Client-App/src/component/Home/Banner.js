import { useNavigate } from "react-router";
import banner1 from "../../assets/Resource Assignment 03/banner1.jpg";
import classes from "./Banner.module.css";
function HomePage() {
  //sử dụng useNavigate() để tạo chức năng điều hướng cho nút
  const navigate = useNavigate();
  const collectionHandler = () => {
    navigate("shop/all");
  };
  return (
    <div className={classes.bannerHeader}>
      <img className={classes.imgHeader} src={banner1} alt="" />
      <div className={classes.ads}>
        <p>new inspiration 2020</p>
        <h1>
          20% off on new
          <br /> season
        </h1>
        <button onClick={collectionHandler}>Browse collections</button>
      </div>
    </div>
  );
}
export default HomePage;
