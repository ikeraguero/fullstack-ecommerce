import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { useProduct } from "../../api/products.api";
import { useAddToCart } from "../../hooks/useAddToCart";
import { createCart } from "../../api/cart.api";

import styles from "./Product.module.css";

function Product({ cart, userId, refetch }) {
  const { id } = useParams();
  const { data: product, error, isLoading } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let userCart = cart;

  const options = Array.from(
    { length: product?.stock_quantity },
    (_, i) => i + 1
  );

  const mutation = useAddToCart(refetch);

  async function handleAddToCart() {
    console.log("oi");
    if (!cart) {
      const createCartData = {
        status: "active",
        user_id: userId,
      };

      userCart = await createCart(createCartData);
    }
    const cartItem = {
      cart_id: userCart.id,
      product_id: product.id,
      product_name: product.name,
      quantity: Number(quantity),
      price: product.price,
      image_data: product.image_data,
      image_type: product.image_type,
    };
    mutation.mutate(cartItem);
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
          <h2>R${product?.price}</h2>
        </div>
        <span>Stock Available: {product?.stock_quantity}</span>
        <span>{product.product_description}</span>
        <div className={styles.productQuantity}>
          <label htmlFor="quantity">Quantity:</label>
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
          </select>
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
