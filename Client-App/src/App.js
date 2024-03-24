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
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }

    // Lặp lại gửi refreshToken mỗi khi accessToken hết hạn
    const interval = setInterval(() => {
      handleRefreshToken();
    }, 3580 * 1000); // 29 seconds, để đảm bảo refreshToken được gửi trước khi accessToken hết hạn

    return () => clearInterval(interval);
  }, []);
  const handleRefreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/shop/refreshToken",
        {
          token: refreshToken,
        }
      );
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };
  return <RouterProvider router={router} />;
}

export default App;
