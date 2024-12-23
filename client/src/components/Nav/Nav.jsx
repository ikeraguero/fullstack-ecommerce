import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import TopNav from "../TopNav/TopNav";
import SearchBar from "./SearchBar/SearchBar";

import styles from "./Nav.module.css";

function Nav({
  categories,
  setSearchProducts,
  setActiveCategory,
  activeCategory,
}) {
  console.log(activeCategory);
  const [loadedCategories, setLoadedCategories] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const formattedUser =
    username?.toUpperCase().slice(0, 1) + username?.toLowerCase().slice(1);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setLoadedCategories(categories);
    }
  }, [categories]);

  function handleOpenBottom() {
    setIsBottomOpen(!isBottomOpen);
  }

  if (!loadedCategories) {
    return <div>Loading...</div>;
  }

  return (
    <nav className={styles.nav}>
      <TopNav />
      <div className={styles.navTop}>
        <div className={styles.leftSide}>
          <ion-icon name="menu-outline" onClick={handleOpenBottom}></ion-icon>
          <Link
            to={"/"}
            className={styles.navLink}
            onClick={() => setActiveCategory(null)}
          >
            E-commerce
          </Link>
        </div>
        <div className={styles.rightSide}>
          <SearchBar setSearchProducts={setSearchProducts} />
          <div className={styles.authAndCart}>
            <div className={styles.auth}>
              <ion-icon name="person-outline"></ion-icon>
              <span>
                <Link
                  to={isLoggedIn ? "/profile" : "/login"}
                  className={styles.loginLink}
                >
                  {isLoggedIn ? `Hello, ` : "Sign In/Sign Up"}
                  {isLoggedIn && <strong>{formattedUser.split(" ")[0]}</strong>}
                </Link>
              </span>
            </div>
            <div className={styles.cart}>
              <ion-icon name="cart-outline"></ion-icon>
              <Link
                to={isLoggedIn ? "/cart" : "/login"}
                className={styles.cartLink}
              >
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.navBottom} ${isBottomOpen ? styles.open : ""}`}>
        <div className={styles.navBottomLeft}>
          {loadedCategories.map((category) => (
            <Link
              to={`categories/${category.name}`}
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={
                activeCategory === category.name
                  ? styles.activeCategoryItem
                  : styles.categoryItem
              }
            >
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
      </div>
    </nav>
  );
}

export default Nav;
