import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImgZoom from "react-img-zoom";
import { MoonLoader } from "react-spinners";

import { useProduct } from "../../api/products.api";
import { useAddToCart } from "../../api/cart.api";
import useCart from "../../api/cart.api";
import { useCreateWishlistItem } from "../../api/wishlist.api";

import Review from "../../components/Review/Review";

import styles from "./Product.module.css";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import { useSuccess } from "../../context/SuccessContext";

function Product({ userId, refetch }) {
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
  const { displaySuccess } = useSuccess();
  let userCart = useCart(userId).data;
  const { mutate: addToCart } = useAddToCart();
  const navigate = useNavigate();

  console.log(product);

  useEffect(
    function () {
      if (id) {
        refetchProduct();
      }
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

    addToCart(cartItem, {
      onSuccess: () => {
        refetch();
        displaySuccess("Product added to cart");
      },
      onError: (error) => {
        console.error("Failed to add to cart:", error);
      },
    });
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleIncreaseQuantity() {
    if (quantity < product?.stock_quantity) {
      setQuantity(quantity + 1);
    }
  }

  function handleAddToWishList() {
    const data = {
      userId,
      productId: product.id,
    };
    addToWishlist(data);
    displaySuccess("Product added to wishlist");
  }

  function handleBuyNow() {
    handleAddToCart();
    navigate("/cart");
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

  const { name, image_data, image_type, productReviewList, canUserReview } =
    product;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productTop}>
        <div className={styles.productPhoto}>
          <ImgZoom
            key={product?.id}
            img={`data:${image_type};base64,${image_data}`}
            className={styles.productPhotoZoom}
            zoomScale={1.5}
            alt={name}
            width={500}
            height={500}
          />
        </div>
        <ProductDetails
          onAddToCart={handleAddToCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onAddToWishlist={handleAddToWishList}
          onBuyNow={handleBuyNow}
          isLoggedIn={isLoggedIn}
          quantity={quantity}
          {...product}
        />
      </div>
      <div className={styles.productBottom}>
        <Review
          {...product}
          productReviewList={productReviewList}
          canUserReview={canUserReview}
          userId={userId}
        />
      </div>
    </div>
  );
}
export default Product;
