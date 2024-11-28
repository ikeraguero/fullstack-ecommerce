import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.leftSide}>
        <span>E-commerce</span>
        <SearchBar />
      </div>
      <div className={styles.rightSide}>
        <span>User</span>
        <span>Orders</span>
        <span>Cart</span>
      </div>
    </nav>
  );
}

export default Nav;
