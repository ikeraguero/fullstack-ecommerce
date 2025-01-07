// import { useState } from "react";
import { useState } from "react";
import styles from "./Profile.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import ProfileInformation from "../components/ProfileInformation/ProfileInformation";
import OrderInformation from "@features/orders/components/OrderInformation/OrderInformation";
import Wishlist from "@features/wishlist/components/Wishlist/Wishlist";
import useAuth from "@hooks/auth/useAuth";

function Profile() {
  const { isLoggedIn, logout } = useAuth();
  const [active, setActive] = useState("profile");
  const navigate = useNavigate();

  function handleClick(e) {
    const option = e.target.closest(`.${styles.leftPanelOption}`);
    if (option) {
      const spanContent = option
        .querySelector("span")
        ?.textContent.toLowerCase();

      setActive(spanContent);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return isLoggedIn ? (
    <div className={styles.mainContainer}>
      <div className={styles.leftPanel}>
        <div
          className={
            active === "profile"
              ? styles.leftPanelOptionActive
              : styles.leftPanelOption
          }
          onClick={(e) => handleClick(e)}
        >
          <ion-icon name="person-outline"></ion-icon>
          <span>Profile</span>
        </div>
        <div
          className={
            active === "orders"
              ? styles.leftPanelOptionActive
              : styles.leftPanelOption
          }
          onClick={(e) => handleClick(e)}
        >
          <ion-icon name="bag-handle-outline"></ion-icon>
          <span>Orders</span>
        </div>
        <div
          className={
            active === "wishlist"
              ? styles.leftPanelOptionActive
              : styles.leftPanelOption
          }
          onClick={handleClick}
        >
          <ion-icon name="heart-outline"></ion-icon>
          <span>Wishlist</span>
        </div>
        <div
          className={
            active === "logout"
              ? styles.leftPanelOptionActive
              : styles.leftPanelOption
          }
          onClick={handleLogout}
        >
          <ion-icon name="exit-outline"></ion-icon>
          <span>Logout</span>
        </div>
      </div>
      <div className={styles.rightContent}>
        {active === "profile" && <ProfileInformation />}
        {active === "orders" && <OrderInformation />}
        {active === "wishlist" && <Wishlist />}
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default Profile;
