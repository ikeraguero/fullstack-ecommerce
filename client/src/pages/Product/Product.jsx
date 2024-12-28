import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImgZoom from "react-img-zoom";

import { useProduct } from "../../api/products.api";
import { useAddToCart } from "../../api/cart.api";
import useCart from "../../api/cart.api";

import styles from "./Product.module.css";
import { MoonLoader } from "react-spinners";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import Review from "../../components/Review/Review";
import { useCreateWishlistItem } from "../../api/wishlist.api";

function Product({ cart, userId, refetch, openSuccess }) {
  const { id } = useParams();
  const {
    data: product,
    error,
    refetch: refetchProduct,
    isLoading,
  } = useProduct(id, userId ? userId : 0);
  const [quantity, setQuantity] = useState(1);
  const { mutate: addToWishlist } = useCreateWishlistItem();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let userCart = useCart(userId).data;

  const { mutate: addToCart } = useAddToCart();
  console.log(id);

  useEffect(
    function () {
      refetchProduct();
    },
    [id, refetchProduct]
  );

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

  function handleAddToWishList() {
    const data = {
      userId,
      productId: product.id,
    };
    addToWishlist(data);
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

  console.log(product);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productTop}>
        <div className={styles.productPhoto}>
          <ImgZoom
            key={product?.id}
            img={`data:${product?.image_type};base64,${product?.image_data}`}
            className={styles.productPhotoZoom}
            zoomScale={1.5}
            width={500}
            height={500}
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
            <button
              className={styles.wishlistButton}
              onClick={handleAddToWishList}
            >
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
                  <button className={styles.buttonAddToCart}>
                    Add to cart
                  </button>
                </Link>
              )}
              <button className={styles.buttonBuy}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productBottom}>
        <Review
          productReviewList={product.productReviewList}
          canUserReview={product.canUserReview}
        />
      </div>
    </div>
  );
}
export default Product;
