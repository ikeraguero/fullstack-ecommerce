import { Link } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import QuantityControl from "../../components/QuantityControl/QuantityControl";
function ProductDetails({
  name,
  price,
  category,
  product_description,
  quantity,
  onAddToCart,
  isLoggedIn,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onAddToWishlist,
}) {

  return (
    <div className={styles.productDetails}>
      <div className={styles.productDetailsTop}>
        <h3 className={styles.productCategory}>{category}</h3>
        <h1>{name}</h1>
        <span>Rating | In stock</span>
        <h2>${price}</h2>
        <div className={styles.productDescription}>{product_description}</div>
      </div>
      <div className={styles.productQuantityAndWishlist}>
        <QuantityControl
          quantity={quantity}
          onIncrease={onIncreaseQuantity}
          onDecrease={onDecreaseQuantity}
        />
        <button className={styles.wishlistButton} onClick={onAddToWishlist}>
          <ion-icon name="heart-outline"></ion-icon>
        </button>
      </div>
      <div className={styles.interactive}>
        <div className={styles.interactiveQuantity}></div>
        <div className={styles.interactiveButtons}>
          {isLoggedIn ? (
            <button className={styles.buttonAddToCart} onClick={onAddToCart}>
              Add to cart
            </button>
          ) : (
            <Link to={"/login"}>
              <button className={styles.buttonAddToCart}>Add to cart</button>
            </Link>
          )}
          {isLoggedIn ? (
            <button className={styles.buttonBuy}>Buy Now</button>
          ) : (
            <Link to="/login">
              <button className={styles.buttonBuy}>Buy Now</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
