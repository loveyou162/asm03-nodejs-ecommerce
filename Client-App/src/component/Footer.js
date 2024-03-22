import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={classes.footer}>
        <ul className={classes.customer}>
          <li className={classes.titleFooter}>customer services</li>

          <li>
            <Link to="#">Help & Contact Us</Link>
          </li>
          <li>
            <Link to="#">Return & Refunds</Link>
          </li>
          <li>
            <Link to="#">Online Stores</Link>
          </li>
          <li>
            <Link to="#">Term & Conditions</Link>
          </li>
        </ul>
        <ul className={classes.company}>
          <li className={classes.titleFooter}>company</li>
          <li>
            <Link to="#">What We Do</Link>
          </li>
          <li>
            <Link to="#">available services</Link>
          </li>
          <li>
            <Link to="#">Latest Posts</Link>
          </li>
          <li>
            <Link to="#">FAQs</Link>
          </li>
        </ul>
        <ul className={classes.social}>
          <li className={classes.titleFooter}>social media</li>
          <li>
            <Link to="#">twitter</Link>
          </li>
          <li>
            <Link to="#">Instagram</Link>
          </li>
          <li>
            <Link to="#">Facebook</Link>
          </li>
          <li>
            <Link to="#">pinterest</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
