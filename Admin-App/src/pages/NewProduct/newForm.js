import {
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import classes from "./newForm.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const NewForm = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [formInput, setFormInput] = useState({
    name: "",
    price: "",
    category: "",
    count: "",
    shortDesc: "",
    longDesc: "",
    images: null,
  });
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isNew = searchParams.get("mode") === "new";
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const { productId } = useParams();
  useEffect(() => {
    !isNew &&
      axios
        .get(`http://localhost:5000/admin/update-product?prodId=${productId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setFormInput(response.data);
        });
  }, []);

  //hàm lấy dữ liệu từ input
  const inputChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const selectedImage = Array.from(files).slice(0, 5);
      setFormInput({
        ...formInput,
        [name]: selectedImage,
      });
    } else {
      setFormInput({
        ...formInput,
        [name]: value,
      });
    }
  };
  const updateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formInput).forEach((key) => {
      if (key === "images" && formInput.images) {
        formInput.images.forEach((image, index) => {
          formData.append(`images`, image);
        });
      } else {
        formData.append(key, formInput[key]);
      }
    });
    formData.append("productId", productId);

    axios
      .post("http://localhost:5000/admin/update-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        alert("Đã update sản phẩm thành công!");
      })
      .then(() => {
        navigate("/admin/product");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitHandler = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const formData = new FormData();
    Object.keys(formInput).forEach((key) => {
      if (key === "images" && formInput.images) {
        formInput.images.forEach((image, index) => {
          formData.append(`images`, image);
        });
      } else {
        formData.append(key, formInput[key]);
      }
    });

    axios
      .post("http://localhost:5000/admin/new-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        alert("Đã tạo sản phẩm thành công!");
      })
      .then(() => {
        navigate("/admin/product");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.NewForm}>
      <h2>{isNew ? "New Product" : "Update Product"}</h2>
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={isNew ? submitHandler : updateHandler}
      >
        <div className={classes["group-input"]}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Product Name"
            defaultValue={formInput.name}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["group-input"]}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Enter Price"
            defaultValue={formInput.price}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["group-input2"]}>
          <div className={classes["input-item"]}>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Enter Category"
              defaultValue={formInput.category}
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes["input-item"]}>
            <label htmlFor="count">Count</label>
            <input
              type="number"
              name="count"
              id="count"
              placeholder="Enter Count"
              defaultValue={formInput.count}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <div className={classes["group-input"]}>
          <label htmlFor="shortDes">Short Description</label>
          <textarea
            type="text"
            name="shortDesc"
            id="shortDes"
            placeholder="Enter Short Description"
            defaultValue={formInput.short_desc}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["group-input"]}>
          <label htmlFor="longDesc">Long Description</label>
          <textarea
            type="text"
            name="longDesc"
            id="longDesc"
            placeholder="Enter Long Description"
            defaultValue={formInput.long_desc}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["group-input"]}>
          <label htmlFor="images">Upload image (4 image)</label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={inputChangeHandler}
          />
        </div>
        <button type="submit">
          {isSubmitting ? <div className={classes.loader}></div> : "Submit"}
        </button>
      </form>
    </div>
  );
};
export default NewForm;
