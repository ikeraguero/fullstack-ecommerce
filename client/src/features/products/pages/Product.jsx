import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import ImgZoom from "react-img-zoom";

import { useProduct } from "@api/products/products.api";
import Review from "@features/review/components/Review/Review";
import styles from "./Product.module.css";
import ProductDetails from "@features/products/components/ProductDetails/ProductDetails";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import useWishlistActions from "@hooks/wishlist/useWishlistActions";
import useProductActions from "@hooks/products/useProductActions";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";
import useAuth from "@hooks/auth/useAuth";

function Product({ refetch }) {
  const { id } = useParams();
  const { userId, isLoggedIn } = useAuth();
  const {
    data: product,
    error,
    refetch: refetchProduct,
    isLoading,
  } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  const { handleAddToCart } = useProductActions();
  const { handleAddToWishList, handleRemoveFromWishlist } =
    useWishlistActions();
  const [productReviewList, setProductReviewList] = useState([]);
  const [initialRelatedProducts, setInitialRelatedProducts] = useState(null);
  const navigate = useNavigate();
  const { name, imageData, imageType, canUserReview } = product || {};

  useEffect(() => {
    if (product?.relatedProducts && initialRelatedProducts === null) {
      setInitialRelatedProducts(product.relatedProducts);
    }
  }, [product?.relatedProducts, initialRelatedProducts]);

  const handleNewReview = (review) => {
    setProductReviewList((prevReviews) => [...prevReviews, review]);
  };

  const memoizedRelatedProducts = useMemo(
    () => initialRelatedProducts || [],
    [initialRelatedProducts]
  );

  const ratingAvg = useMemo(() => {
    if (productReviewList.length === 0) return 0;
    const totalRating = productReviewList.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / productReviewList.length;
  }, [productReviewList]);

  useEffect(() => {
    if (id) {
      refetchProduct();
    }
  }, [id, refetchProduct]);

  useEffect(() => {
    setProductReviewList(product?.productReviewList || []);
  }, [product]);

  async function handleBuyNow() {
    await handleAddToCart(product, quantity);
    navigate("/cart");
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

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} retry={refetch} />;
  }

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
          product={product}
          {...product}
        />
      </div>
      <div className={styles.productBottom}>
        <RelatedProducts products={memoizedRelatedProducts} />
        <Review
          {...product}
          productReviewList={productReviewList}
          canUserReview={canUserReview}
          onNewReview={handleNewReview}
          ratingAvg={ratingAvg}
          userId={userId}
        />
      </div>
    </div>
  );
}

export default Product;
