// import { useState } from "react";
import { useState } from "react";
import styles from "./Profile.module.css";

function Profile() {
  const [active, setActive] = useState("profile");

  function handleClick(e) {
    const option = e.target.closest(`.${styles.leftPanelOption}`);
    if (option) {
      const spanContent = option
        .querySelector("span")
        ?.textContent.toLowerCase();
      console.log(spanContent);
      setActive(spanContent);
    }
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
            active === "logout"
              ? styles.leftPanelOptionActive
              : styles.leftPanelOption
          }
          onClick={(e) => handleClick(e)}
        >
          <ion-icon name="exit-outline"></ion-icon>
          <span>Logout</span>
        </div>
      </div>
      <div className={styles.rightContent}>CONTENT</div>
    </div>
  );
}

export default Profile;
