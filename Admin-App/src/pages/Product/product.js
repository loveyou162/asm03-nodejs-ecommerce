import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import classes from "./product.module.css";
import axios from "axios";
import { useState } from "react";

const ProductsPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const allProducts = useLoaderData();
  console.log(allProducts);

  // const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const formatPrice = (price) => {
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  //sử dụng debounce để gửi yêu cầu tìm kiếm sau một khoảng thời gian nhất định sau khi người dùng nhập xong
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleInputChange = debounce((event) => {
    const query = event.target.value;
    // setSearchQuery(query);
    performSearch(query);
  }, 500);
  console.log(searchResults);
  // Hàm thực hiện tìm kiếm
  const performSearch = (query) => {
    // Thực hiện tìm kiếm dựa trên query
    return axios
      .post(
        "https://asm03-nodejs-server.onrender.com/admin/search-product",
        { query: query },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        // return response.data;
        setSearchResults(response.data);
      })
      .catch((err) => {
        throw new Response({ status: 500 });
      });
    // Trả về danh sách kết quả tìm kiếm
  };

  return (
    <div className={classes["product-page"]}>
      <h3>Products</h3>
      <div className={classes["product-search"]}>
        <input
          type="search"
          name="search"
          placeholder="Enter search!"
          onChange={handleInputChange}
        />
      </div>
      <table className={classes["product-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0
            ? searchResults.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>
                    <img src={product.img1} alt="" />
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <Link to={`/admin/new-product/${product._id}?mode=update`}>
                      Update
                    </Link>
                    <Form method="post">
                      <input type="hidden" value={product._id} name="id" />
                      <button type="submit">Delete</button>
                    </Form>
                  </td>
                </tr>
              ))
            : allProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>
                    <img src={product.img1} alt="" />
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <Link to={`/admin/new-product/${product._id}?mode=update`}>
                      Update
                    </Link>
                    <Form method="post" action="/admin/product">
                      <input type="hidden" value={product._id} name="prodId" />
                      <button type="submit">Delete</button>
                    </Form>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductsPage;
export async function loader() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "https://asm03-nodejs-server.onrender.com/admin/all-product",
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
    throw new Response({ message: error.message }, { status: 401 });
  }
}
export async function action({ request }) {
  const data = await request.formData();
  const prodId = data.get("prodId");
  console.log(prodId);
  try {
    const accessToken = localStorage.getItem("accessToken");
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");
    if (isConfirmed) {
      const response = await axios.delete(
        `https://asm03-nodejs-server.onrender.com/admin/delete-product?prodId=${prodId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      alert(response.data.message);
      return redirect("/admin/product");
    }
  } catch (error) {
    throw new Response({ message: error.message }, { status: 400 });
  }
}
