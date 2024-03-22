import classes from "./Navleft.module.css";
import { NavLink } from "react-router-dom";

function Navleft() {
  //   const data = useRouteLoaderData("shop");
  return (
    <div className={classes.navleft}>
      <h2>Category</h2>
      <p className={classes.nameApple}>Apple</p>
      <div className={classes.groupLink}>
        <p>
          <NavLink
            to="/shop/all"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            All
          </NavLink>
        </p>
        <h3>Iphone & Mac</h3>
        <p>
          <NavLink
            to="/shop/iphone"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Iphone
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/shop/ipad"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Ipad
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/shop/macbook"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            macbook
          </NavLink>
        </p>
        <h3>Wireless</h3>
        <p>
          <NavLink
            to="/shop/airpod"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            airpod
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/shop/watch"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            watch
          </NavLink>
        </p>
        <h3>Other</h3>
        <p>
          <NavLink
            to="/shop/mouse"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            mouse
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/shop/keyboard"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            keyboards
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/shop/other"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Other
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Navleft;
