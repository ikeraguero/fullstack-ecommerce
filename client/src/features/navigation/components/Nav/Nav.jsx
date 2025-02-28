import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import TopNav from "../TopNav/TopNav";
import SearchBar from "../../../search/components/SearchBar/SearchBar";
import styles from "./Nav.module.css";
import useAuth from "@hooks/auth/useAuth";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";

function Nav({ categories, onSearch, onCategoryChange, activeCategory }) {
  const [loadedCategories, setLoadedCategories] = useState(null);
  const { isLoggedIn, username, role } = useAuth();
  const [isBottomOpen, setIsBottomOpen] = useState(false);
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

  function handleSelectCategory(e, category) {
    if (!isBottomOpen) {
      e.preventDefault();
      return;
    }
    onCategoryChange(category);
  }

  if (!loadedCategories) {
    return <LoadingState />;
  }

  return (
    <nav className={styles.nav}>
      <TopNav />
      <div className={styles.navTop}>
        <div className={styles.leftSide}>
          <ion-icon
            name="reorder-three-outline"
            onClick={handleOpenBottom}
          ></ion-icon>
          <Link to={"/"} className={styles.navLink}>
            E-commerce
          </Link>
        </div>
        <div className={styles.rightSide}>
          <SearchBar setSearchProducts={onSearch} />
          <div className={styles.authAndCart}>
            <div className={styles.auth}>
              <ion-icon name="person-outline"></ion-icon>
              <span>
                <Link
                  to={isLoggedIn ? "/profile" : "/login"}
                  className={styles.loginLink}
                >
                  {isLoggedIn ? `Hello, ` : "Sign In/Sign Up"}
                  {isLoggedIn && (
                    <strong>{formattedUser?.split(" ")[0]}</strong>
                  )}
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
      <div
        className={`${styles.navBottom} ${
          isBottomOpen ? styles.open : styles.none
        }`}
      >
        <div className={styles.navBottomLeft}>
          {loadedCategories.map((category) => (
            <Link
              to={`categories/${category.name}`}
              key={category.id}
              onClick={(e) => handleSelectCategory(e, category.name)}
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
