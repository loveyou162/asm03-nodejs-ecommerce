import "./App.css";
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
  return <RouterProvider router={router} />;
}

export default App;
