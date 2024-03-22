import classes from "./Login.module.css";
import LoginForm from "../component/LoginForm";

function LoginPage() {
  return (
    <div className={classes.loginPage}>
      <LoginForm />
    </div>
  );
}
export default LoginPage;
