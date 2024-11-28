import styles from "./Product.module.css";
import Button from "../Button/Button";

function Product() {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardImage}>
        <img
          src="https://th.bing.com/th/id/OIP.fThkbmtVk_eomkTj1wAexAHaEo?rs=1&pid=ImgDetMain"
          alt="Nike Sneaker"
        />
      </div>
      <div className={styles.productCardBody}>
        <div className={styles.productCardTop}>
          <div className={styles.productCardSubtitle}>
            <h3>clothing</h3>
          </div>
          <div className={styles.productCardTitle}>
            <h1>Nike Shoes</h1>
            <h2>R$ 10,00</h2>
          </div>
        </div>
        <div className={styles.productCardBottom}>
          <Button>See details</Button>
          <Button>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
