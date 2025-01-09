import styles from "./TopNav.module.css";

function TopNav() {
  return (
    <div className={styles.TopNav}>
      <div className="leftSide">Welcome to worldwide e-commerce!</div>
      <div className={styles.rightSide}>
        <div className={styles.rightSideOption}>
          <div className={styles.optionIcon}>
            <ion-icon name="location-outline"></ion-icon>
          </div>
          <div className="optionText">Deliver to your zip-code </div>
        </div>
        <span>|</span>
        <div className={styles.rightSideOption}>
          <div className={styles.optionIcon}>
            <ion-icon name="cube-outline"></ion-icon>
          </div>
          <div className="optionText">Track your order</div>
        </div>
        <span>|</span>
        <div className={styles.rightSideOption}>
          <div className={styles.optionIcon}>
            <ion-icon name="diamond-outline"></ion-icon>
          </div>
          <div className="optionText">All Offers</div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
