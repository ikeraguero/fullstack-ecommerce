import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import SearchBar from "./SearchBar/SearchBar";

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.leftSide}>
        <Link to={"/"} className={styles.navLink}>
          E-commerce
        </Link>
        <SearchBar />
      </div>
      <div className={styles.rightSide}>
        <Link to={"/addproduct"} className={styles.navLink}>
          Add Product
        </Link>
        <span>User</span>
        <span>Orders</span>
        <span>Cart</span>
      </div>
    </nav>
  );
}

export default Nav;
