import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/root";
import ShopPage from "./pages/Shop";
import DetailPage from "./pages/Detail";
import CartPage, { loader as CartLoader } from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";
import RegisterPage from "./pages/Register";
import HomeAllPage from "./pages/HomeAll";
import { loader as RootLoader } from "./pages/root";
import IphoneProduct from "./component/Shop/ProductList";
import OrderPage, { loader as OrderListLoader } from "./pages/Order";
import OrderDetail, { loader as OrderDetailLoader } from "./pages/OrderDetail";
import { useEffect, useState } from "react";
import axios from "axios";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <HomeAllPage />,
        id: "home",
      },
      {
        path: "shop",
        element: <ShopPage />,
        id: "shop",
        children: [{ path: ":shopId", element: <IphoneProduct /> }],
      },
      {
        path: "detail/:productId",
        element: <DetailPage />,
      },
      { path: "cart", element: <CartPage />, id: "cart", loader: CartLoader },
      { path: "checkout", element: <CheckoutPage /> },
      {
        path: "order",
        loader: OrderListLoader,
        id: "order",
        children: [
          {
            index: true,
            element: <OrderPage />,
          },
          {
            path: ":orderId",
            id: "orderdetail",
            element: <OrderDetail />,
            loader: OrderDetailLoader,
          },
        ],
      },
    ],
  },
  { path: "register", element: <RegisterPage /> },
  { path: "login", element: <LoginPage /> },
]);

function App() {
  // Hook trạng thái để lưu trữ access token và refresh token
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  // Hook hiệu ứng để quản lý vòng đời của token
  useEffect(() => {
    // Lấy token từ local storage
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    // Cập nhật trạng thái với token đã lưu nếu có
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }

    // Thiết lập một khoảng thời gian để làm mới access token trước khi nó hết hạn
    const interval = setInterval(() => {
      handleRefreshToken();
    }, 3580 * 1000); // Làm mới token mỗi 3580 giây để đảm bảo việc này được thực hiện trước khi access token hết hạn

    // Dọn dẹp khoảng thời gian khi component bị gỡ bỏ
    return () => clearInterval(interval);
  }, [accessToken]); // Mảng phụ thuộc bao gồm accessToken để chạy lại hiệu ứng khi nó thay đổi

  /**
   * Làm mới access token một cách bất đồng bộ sử dụng refresh token đã lưu.
   */
  const handleRefreshToken = async () => {
    try {
      // Yêu cầu làm mới access token
      const response = await axios.post(
        `http://localhost:5000/auth/refreshToken`,
        {
          token: refreshToken,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Cập nhật trạng thái và local storage với access token mới
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
    } catch (error) {
      // Ghi lỗi nếu việc làm mới token thất bại
      console.error("Lỗi khi làm mới token:", error);
    }
  };

  // Hiển thị các tuyến đường của ứng dụng
  return <RouterProvider router={router} />;
}
export default App;
