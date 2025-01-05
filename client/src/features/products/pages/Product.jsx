import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImgZoom from "react-img-zoom";
import { MoonLoader } from "react-spinners";

import { useProduct } from "@api/products/products.api";
import { useAddToCart } from "@api/cart/cart.api";
import { useCart } from "@api/cart/cart.api";
import {
  useCreateWishlistItem,
  useDeleteWishlistItem,
} from "@api/users/wishlist.api";

import Review from "@features/review/components/Review/Review";

import styles from "./Product.module.css";
import ProductDetails from "@features/products/components/ProductDetails/ProductDetails";
import { useSuccess } from "@context/SuccessContext";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

function Product({ userId, refetch }) {
  const { id } = useParams();
  const {
    data: product,
    error,
    refetch: refetchProduct,
    isLoading,
  } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const { mutate: removeWishlistItem } = useDeleteWishlistItem();
  const { mutate: addToWishlist } = useCreateWishlistItem();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { displaySuccess } = useSuccess();
  let userCart = useCart(userId).data;
  const [productReviewList, setProductReviewList] = useState(
    product?.productReviewList || []
  );
  const { mutate: addToCart } = useAddToCart();
  const [ratingAvg, setRatingAvg] = useState(0);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (id) {
        refetchProduct();
      }
    },
    [id, refetchProduct]
  );

  useEffect(() => {
    if (productReviewList?.length > 0) {
      const ratingSum = productReviewList
        .map((review) => review.rating)
        .reduce((cur, acc) => cur + acc, 0);
      const avg = ratingSum / productReviewList?.length;
      setRatingAvg(avg);
    }
  }, [productReviewList]);

  useEffect(() => {
    setProductReviewList(product?.productReviewList);
  }, [product]);

  const handleNewReview = (newReview) => {
    const updatedReviewList = [...productReviewList, newReview];
    setProductReviewList(updatedReviewList);

    const updatedRatingSum = updatedReviewList
      .map((review) => review.rating)
      .reduce((cur, acc) => cur + acc, 0);
    const updatedRatingAvg = updatedRatingSum / updatedReviewList.length;
    setRatingAvg(updatedRatingAvg);
  };

  async function handleAddToCart() {
    const cartItem = {
      cartId: userCart.id,
      productId: product.id,
      productName: product.name,
      quantity: Number(quantity),
      price: product.price,
      imageData: product.imageData,
      imageType: product.imageType,
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
    if (quantity < product?.stockQuantity) {
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

  function handleRemoveFromWishlist() {
    removeWishlistItem(wishlistItemId);
    displaySuccess("Product removed from wishlist");
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

  console.log(product);

  const {
    name,
    imageData,
    imageType,
    canUserReview,
    wishlistItemId,
    relatedProducts,
  } = product;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productTop}>
        <div className={styles.productPhoto}>
          <ImgZoom
            key={product?.id}
            img={`data:${imageType};base64,${imageData}`}
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
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onBuyNow={handleBuyNow}
          isLoggedIn={isLoggedIn}
          quantity={quantity}
          {...product}
        />
      </div>
      <div className={styles.productBottom}>
        <RelatedProducts products={relatedProducts} />
        <Review
          {...product}
          productReviewList={productReviewList}
          canUserReview={canUserReview}
          ratingAvg={ratingAvg}
          onNewReview={handleNewReview}
          userId={userId}
        />
      </div>
    </div>
  );
}
export default Product;
