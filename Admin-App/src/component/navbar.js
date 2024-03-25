import React from "react";
import classes from "./navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    try {
      axios
        .post(
          "https://asm03-nodejs-server.onrender.com/admin/logout",
          {
            token: accessToken,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    } catch (err) {
      console.log(err);
    }
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    navigate("/admin/login");
  };
  return (
    <div className={classes["navbar"]}>
      <ul className={classes["list-menu"]}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <ion-icon name="grid-outline"></ion-icon>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/product"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <ion-icon name="storefront-outline"></ion-icon>
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/new-product?mode=new"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <ion-icon name="layers-outline"></ion-icon>
            New Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/chat"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <ion-icon name="chatbubbles-outline"></ion-icon>
            Chat
          </NavLink>
        </li>
        <li>
          <button onClick={logoutHandler}>
            <ion-icon name="log-in-outline"></ion-icon>
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
