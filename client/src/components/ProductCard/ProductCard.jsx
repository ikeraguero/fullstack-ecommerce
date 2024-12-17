import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../Button/Button";
import { useIsProductInUserCart } from "../../api/cart.api";
import { useAddToCart } from "../../api/cart.api";

import styles from "./ProductCard.module.css";

function ProductCard({
  id,
  name,
  price,
  category_name,
  image_data,
  image_type,
  userId,
  refetch,
  cart,
  openSuccess,
}) {
  const [isOnCart, setIsOnCart] = useState(useIsProductInUserCart(id, userId));
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let userCart = cart;

  const { mutate: addToCart } = useAddToCart();

  async function handleAddToCart() {
    const cartItem = {
      cart_id: userCart.id,
      product_id: id,
      product_name: name,
      quantity: 1,
      price: price,
      image_data: image_data,
      image_type: image_type,
    };
    setIsOnCart(true);
    addToCart(cartItem);
    openSuccess();
  }

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
          {(!isOnCart || isLoggedIn) && (
            <Button handler={handleAddToCart}>Add to cart</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
