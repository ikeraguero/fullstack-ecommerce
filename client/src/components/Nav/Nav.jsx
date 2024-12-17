import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { Menu, MenuItem } from "../../components/DropdownMenu/DropdownMenu";
import { logout } from "../../actions/AuthActions";
import SearchBar from "./SearchBar/SearchBar";

import styles from "./Nav.module.css";

function Nav({ categories, setSearchProducts }) {
  const [loadedCategories, setLoadedCategories] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

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
          <SearchBar setSearchProducts={setSearchProducts} />
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
            <Link to="/dashboard" className={styles.navLink}>
              Dashboard
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
            <Menu
              label={<ion-icon name="caret-down-outline"></ion-icon>}
              className={styles.profileMenu}
            >
              <MenuItem label="Undo" onClick={() => console.log("Undo")} />
              <MenuItem label="Redo" disabled />
              <MenuItem label="Cut" />
              <Menu label="Copy as">
                <MenuItem label="Text" />
                <MenuItem label="Video" />
                <Menu label="Image">
                  <MenuItem label=".png" />
                  <MenuItem label=".jpg" />
                  <MenuItem label=".svg" />
                  <MenuItem label=".gif" />
                </Menu>
                <MenuItem label="Audio" />
              </Menu>
              <Menu label="Share">
                <MenuItem label="Mail" />
                <MenuItem label="Instagram" />
              </Menu>
            </Menu>

            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
          <div className={styles.navBottomRightCart}>
            <Link to={isLoggedIn ? "/cart" : "/login"}>
              <ion-icon name="cart-outline"></ion-icon>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
