import { Link } from "react-router-dom";

import styles from "./ProductDetails.module.css";
import QuantityControl from "@features/products/components/QuantityControl/QuantityControl";
function ProductDetails({
  name,
  price,
  id,
  category,
  productDescription,
  quantity,
  onRemoveFromWishlist,
  onAddToCart,
  isLoggedIn,
  onIncreaseQuantity,
  onDecreaseQuantity,
  wishlistItemId,
  onBuyNow,
  onAddToWishlist,
  inUserWishlist,
  product,
}) {
  return (
    <div className={styles.productDetails}>
      <div className={styles.productDetailsTop}>
        <h3 className={styles.productCategory}>{category}</h3>
        <h1>{name}</h1>
        <span>In stock</span>
        <h2>${price}</h2>
        <div className={styles.productDescription}>{productDescription}</div>
      </div>
      <div className={styles.productQuantityAndWishlist}>
        <QuantityControl
          quantity={quantity}
          onIncrease={onIncreaseQuantity}
          onDecrease={onDecreaseQuantity}
        />
        <button
          className={styles.wishlistButton}
          onClick={
            inUserWishlist
              ? () => onRemoveFromWishlist(wishlistItemId)
              : () => onAddToWishlist(id)
          }
        >
          {inUserWishlist ? (
            <ion-icon name="trash-outline"></ion-icon>
          ) : (
            <ion-icon name="heart-outline"></ion-icon>
          )}
        </button>
      </div>
      <div className={styles.interactive}>
        <div className={styles.interactiveQuantity}></div>
        <div className={styles.interactiveButtons}>
          {isLoggedIn ? (
            <button
              className={styles.buttonAddToCart}
              onClick={() => onAddToCart(product, quantity)}
            >
              Add to cart
            </button>
          ) : (
            <Link to={"/login"}>
              <button className={styles.buttonAddToCart}>Add to cart</button>
            </Link>
          )}
          {isLoggedIn ? (
            <button className={styles.buttonBuy} onClick={onBuyNow}>
              Buy Now
            </button>
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
