// import { useState } from "react";
import { useState } from "react";
import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../actions/AuthActions";
import { useNavigate } from "react-router-dom";
import ProfileInformation from "../../components/ProfileInformation/ProfileInformation";
import OrderInformation from "../../components/OrderInformation/OrderInformation";
import Wishlist from "../../components/Wishlist/Wishlist";

function Profile() {
  const [active, setActive] = useState("profile");
  const { logout } = useAuth();
  const dispatch = useDispatch();
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
    dispatch(logoutSuccess());
    navigate("/");
  }

  return (
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
  );
}

export default Profile;
