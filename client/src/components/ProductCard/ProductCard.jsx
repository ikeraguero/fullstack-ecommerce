import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { checkProductInUserCart } from "../../api/cart.api";
import { useEffect, useState } from "react";

function ProductCard({
  id,
  name,
  price,
  category_name,
  image_data,
  image_type,
  userId,
}) {
  const [isOnCart, setIsOnCart] = useState(false);

  useEffect(() => {
    async function checkIsOnCart() {
      const res = await checkProductInUserCart(id, userId);
      setIsOnCart(res);
    }
    checkIsOnCart();
  }, [id, userId]);


  return (
    <div className={styles.productCard}>
      <div className={styles.productCardImage}>
        <img src={`data:${image_type};base64,${image_data}`} alt={name} />
      </div>
      <div className={styles.productCardBody}>
        <div className={styles.productCardTop}>
          <div className={styles.productCardSubtitle}>
            <h3>{category_name}</h3>
          </div>
          <div className={styles.productCardTitle}>
            <h1>{name}</h1>
            <h2>R${price},00</h2>
          </div>
        </div>
        <div className={styles.productCardBottom}>
          <Link to={`/products/${id}`}>
            <Button>See details</Button>
          </Link>
          <Button>{!isOnCart ? "Add to cart" : "Remove from cart"}</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
