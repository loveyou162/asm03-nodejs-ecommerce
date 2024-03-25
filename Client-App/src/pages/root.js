import { Outlet } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import axios from "axios";

function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default RootLayout;
export async function loader() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `https://asm03-nodejs-server.onrender.com/shop/all-product`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
