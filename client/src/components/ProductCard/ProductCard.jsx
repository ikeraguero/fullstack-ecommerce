import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { checkProductInUserCart, createCart } from "../../api/cart.api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddToCart } from "../../hooks/useAddToCart";

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
}) {
  const [isOnCart, setIsOnCart] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let userCart = cart;

  useEffect(() => {
    async function checkIsOnCart() {
      const res = await checkProductInUserCart(id, userId);
      setIsOnCart(res);
    }
    checkIsOnCart();
  }, [id, userId]);

  const mutation = useAddToCart(refetch);

  async function handleAddToCart() {
    if (!cart) {
      const createCartData = {
        status: "active",
        user_id: userId,
      };

      userCart = await createCart(createCartData);
    }
    const cartItem = {
      cart_id: userCart.id,
      product_id: id,
      product_name: name,
      quantity: 1,
      price: price,
      image_data: image_data,
      image_type: image_type,
    };
    mutation.mutate(cartItem);
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
          {!isLoggedIn ? (
            <Link to={"/login"}>
              <Button>Add to cart</Button>
            </Link>
          ) : isOnCart ? (
            <Button onClick={handleAddToCart}>Add to cart</Button>
          ) : (
            <Button>Remove from cart</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
