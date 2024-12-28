import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { useCreateUser } from "../../api/user.api";

function Register() {
  const { mutate: createUser } = useCreateUser();

  function handleRegister(e) {
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    const userData = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    createUser(userData);
  }

  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.loginBox}
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister(e);
        }}
      >
        <div className={styles.loginBoxContainer}>
          <h1>Sign Up</h1>
          <div className={styles.loginFieldNames}>
            <div className={styles.nameField}>
              <label>First Name</label>
              <input type="text" name="firstName" />
            </div>
            <div className={styles.nameField}>
              <label>Last Name</label>
              <input type="text" name="lastName" />
            </div>
          </div>
          <div className={styles.loginField}>
            <label>Email</label>
            <input type="email" name="email" />
          </div>
          <div className={styles.loginField}>
            <label>Password</label>
            <input type="password" name="password" id="" />
          </div>
          <div className={styles.buttons}>
            <Link to={"/login"} className={styles.btnLink}>
              <button className={styles.loginButton}>Sign In</button>
            </Link>
            <button className={styles.registerButton}>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
