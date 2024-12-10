import { Link } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.loginBox}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
        }}
      >
        <div className={styles.loginBoxContainer}>
          <h1>Sign Up</h1>
          <div className={styles.loginFieldNames}>
            <div className={styles.nameField}>
              <label>First Name</label>
              <input type="text" />
            </div>
            <div className={styles.nameField}>
              <label>Last Name</label>
              <input type="text" />
            </div>
          </div>
          <div className={styles.loginField}>
            <label>Email</label>
            <input type="email" />
          </div>
          <div className={styles.loginField}>
            <label>Password</label>
            <input type="password" name="" id="" />
          </div>
          <div className={styles.buttons}>
            <Link to={"/login"} className={styles.btnLink}>
              <button className={styles.loginButton}>Login</button>
            </Link>
            <button className={styles.registerButton}>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
