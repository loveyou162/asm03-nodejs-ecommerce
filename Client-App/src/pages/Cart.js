import BannerCart from "../component/Cart/BannerCart";
import ShoppingMain from "../component/Cart/ShoppingMain";
import axios from "axios";

function CartPage() {
  return (
    <div>
      <BannerCart />
      <ShoppingMain />
    </div>
  );
}
export default CartPage;
export async function loader() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    // gửi request để lấy dữ liệu cart
    const response = await axios.get("http://localhost:5000/shop/cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
