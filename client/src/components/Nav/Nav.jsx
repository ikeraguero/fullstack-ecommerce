import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/AuthActions";

function Nav({ categories }) {
  const [loadedCategories, setLoadedCategories] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  console.log()

  useEffect(() => {
    if (categories && categories.length > 0) {
      setLoadedCategories(categories);
    }
  }, [categories]);

  function handleLogout() {
    dispatch(logout);
    window.location.reload();
  }

  if (!loadedCategories) {
    return <div>Loading...</div>;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navTop}>
        <div className={styles.rightSide}>
          <Link to={"/"} className={styles.navLink}>
            E-commerce
          </Link>
        </div>
        <div className={styles.rightSide}>
          <SearchBar />
        </div>
      </div>
      <div className={styles.navBottom}>
        <div className={styles.navBottomLeft}>
          <span>SHOP ALL</span>
          {loadedCategories.map((category) => (
            <Link to="/product" key={category.id} className={styles.navLink}>
              {category.name}
            </Link>
          ))}
          {role === "ADMIN" ? (
            <Link to="/addproduct" className={styles.navLink}>
              Manage Products
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className={styles.navBottomRight}>
          <span>
            {isLoggedIn ? (
              `Hello, ${username}!`
            ) : (
              <Link to={"/login"} className={styles.loginLink}>
                Log In
              </Link>
            )}
          </span>
          {isLoggedIn ? (
            <span onClick={handleLogout} className={styles.logoutLink}>
              Logout
            </span>
          ) : (
            ""
          )}
          <div className={styles.navBottomRightUser}>
            <ion-icon name="caret-down-outline"></ion-icon>
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
          <div className={styles.navBottomRightCart}>
            <Link to={"/cart"}>
              <ion-icon name="cart-outline"></ion-icon>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
