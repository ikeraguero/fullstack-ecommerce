import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { useProduct } from "../../api/products.api";
import { useAddToCart } from "../../api/cart.api";
import useCart from "../../api/cart.api";

import styles from "./Product.module.css";
import { MoonLoader } from "react-spinners";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";

function Product({ cart, userId, refetch, openSuccess }) {
  const { id } = useParams();
  const { data: product, error, isLoading } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let userCart = useCart(userId).data;

  const { mutate: addToCart } = useAddToCart();

  async function handleAddToCart() {
    const cartItem = {
      cart_id: userCart.id,
      product_id: product.id,
      product_name: product.name,
      quantity: Number(quantity),
      price: product.price,
      image_data: product.image_data,
      image_type: product.image_type,
    };
    addToCart(cartItem);
    refetch();
    <SuccessAlert />;
    openSuccess();
  }

  function handleDecreaseQuantity() {
    if (quantity - 1 <= 0) return;
    setQuantity(quantity - 1);
  }

  function handleIncreaseQuantity() {
    if (quantity + 1 > product?.stock_quantity) return;
    setQuantity(quantity + 1);
  }

  if (isLoading) {
    return (
      <div>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productPhoto}>
        <img
          src={`data:${product?.image_type};base64,${product?.image_data}`}
          alt={product?.name}
        />
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productDetailsTop}>
          <h3 className={styles.productCategory}>{product.category}</h3>
          <h1>{product?.name}</h1>
          <span>Rating | In stock</span>
          <h2>${product?.price}</h2>
          <div className={styles.productDescription}>
            {product.product_description}
          </div>
        </div>
        <div className={styles.productQuantityAndWishlist}>
          <div className={styles.productQuantity}>
            <button
              className={styles.productQuantityDecrease}
              onClick={handleDecreaseQuantity}
            >
              -
            </button>
            <div className={styles.productQuantityDisplay}>
              {quantity < 10 ? "0" + quantity : quantity}
            </div>
            <button
              className={styles.productQuantityIncrease}
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
            {/* <label htmlFor="quantity">Quantity:</label>
          <select
            name="quantity"
            id=""
            className={styles.select}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select> */}
          </div>
          <button className={styles.wishlistButton}>
            <ion-icon name="heart-outline"></ion-icon>
          </button>
        </div>
        <div className={styles.interactive}>
          <div className={styles.interactiveQuantity}></div>
          <div className={styles.interactiveButtons}>
            {isLoggedIn ? (
              <button
                className={styles.buttonAddToCart}
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            ) : (
              <Link to={"/login"}>
                <button className={styles.buttonAddToCart}>Add to cart</button>
              </Link>
            )}
            <button className={styles.buttonBuy}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
