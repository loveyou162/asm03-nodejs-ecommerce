import "./App.css";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/root";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Dashboard, { loader as loaderDash } from "./pages/Dashboard/dashboard";
import ProductsPage, {
  loader as PageLoader,
  action as ProductAction,
} from "./pages/Product/product";
import NewForm from "./pages/NewProduct/newForm";
import ChatPage, { loader as ChatLoader } from "./pages/Chat/chat";
import ErrorPage from "./pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard />, loader: loaderDash },
      {
        path: "admin/product",
        id: "product",
        element: <ProductsPage />,
        loader: PageLoader,
        action: ProductAction,
      },
      { path: "admin/new-product", element: <NewForm /> },
      {
        path: "admin/new-product/:productId",
        element: <NewForm />,
      },
      {
        path: "admin/chat",
        element: <ChatPage />,
        loader: ChatLoader,
        children: [{ path: ":roomId", element: <ChatPage /> }],
      },
    ],
  },
  { path: "admin/register", element: <RegisterPage /> },
  { path: "admin/login", element: <LoginPage /> },
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
  }, [accessToken]);
  const handleRefreshToken = async () => {
    try {
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
