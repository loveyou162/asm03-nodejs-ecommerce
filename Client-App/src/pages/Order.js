import BannerOrder from "../component/Order/BannerOrder";
import OrderList from "../component/Order/OrderList";
import axios from "axios";

const OrderPage = () => {
  return (
    <>
      <BannerOrder />
      <OrderList />
    </>
  );
};
export default OrderPage;

//loader lấy dữ liệu từ bảng order
export async function loader() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `https://asm03-nodejs-server.onrender.com/shop/order`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
