import BannerOrder from "../component/OrderDetail/BannerInfo";
import OrderListDetail from "../component/OrderDetail/Order-detail";
import axios from "axios";
const accessToken = localStorage.getItem("accessToken");

const OrderDetail = () => {
  return (
    <div>
      <BannerOrder />
      <OrderListDetail />
    </div>
  );
};
export default OrderDetail;
export async function loader({ params }) {
  const id = params.orderId;
  console.log(id);
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.post(
    `https://asm03-nodejs-server.onrender.com/shop/order-detail`,
    {
      OrderId: id,
    },
    {
      headers: {
        "Content-Types": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );
  console.log(response.data);
  return response.data;
}
