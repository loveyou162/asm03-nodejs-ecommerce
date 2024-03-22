import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./root.module.css";
import Navbar from "../component/navbar";
const RootLayout = () => {
  return (
    <div className={classes.root}>
      <table className={classes.tableMain}>
        <thead>
          <tr className={`${classes.tr1} ${classes.tr}`}>
            <td className={classes.td}>
              <h3>Admin Page</h3>
            </td>
            <td className={`${classes.td}`}></td>
          </tr>
        </thead>
        <tbody>
          <tr className={`${classes.tr2} ${classes.tr}`}>
            <td className={`${classes.navbarCell} ${classes.td}`}>
              <Navbar />
            </td>
            <td className={`${classes.mainCell} ${classes.td}`}>
              <main>
                <Outlet />
              </main>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default RootLayout;
