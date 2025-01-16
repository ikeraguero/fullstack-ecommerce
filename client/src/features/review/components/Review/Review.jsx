import { useEffect, useState } from "react";

import ReviewItem from "../ReviewItem/ReviewItem";
import StarRating from "@features/shared/components/StarRating/StarRating";
import styles from "./Review.module.css";
import { useCreateReview } from "@api/products/reviews.api";
import { useSuccess } from "@context/SuccessContext";

function Review({
  productReviewList: initialProductReviewList,
  canUserReview,
  userId,
  id,
  ratingAvg,
  onNewReview,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productReviewList, setProductReviewList] = useState(
    initialProductReviewList || []
  );
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const { mutate: createReview } = useCreateReview(id);
  const { displaySuccess } = useSuccess();
  const isFormValid = rating > 0 && comment.trim().length > 0;
  const reviewCount = productReviewList.length;

  useEffect(() => {
    if (initialProductReviewList && initialProductReviewList.length > 0) {
      setProductReviewList(initialProductReviewList);
    }
  }, [initialProductReviewList]);

  function handleSetRating(rating) {
    setRating(rating);
  }

  function handleCreateReview() {
    const reviewObject = {
      productId: id,
      userId,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    createReview(reviewObject, {
      onSuccess: () => {
        displaySuccess("Review posted");
        setProductReviewList((prevReviews) => [...prevReviews, reviewObject]);
        setRating(0);
        setComment("");
        setHasUserReviewed(true);
        onNewReview(reviewObject);
      },
      onError: (error) => {
        console.error("Failed to post review:", error);
      },
    });
  }

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewLeft}>
        <div className={styles.reviewLeftStats}>
          <h2>Customer ratings</h2>
          {!isNaN(ratingAvg) ? (
            <>
              <span>
                {productReviewList.length > 0 && (
                  <>
                    <StarRating
                      size={25}
                      maxRating={1}
                      defaultRating={1}
                      showRating={false}
                    />
                    <span>{ratingAvg.toFixed(1)} out of 5.0 </span>
                    <span>•</span>
                  </>
                )}
                <span>
                  {reviewCount > 0 && reviewCount}
                  {reviewCount === 0
                    ? "No reviews yet."
                    : reviewCount === 1
                    ? " review"
                    : " reviews"}
                </span>
              </span>
            </>
          ) : (
            <span>No reviews yet.</span>
          )}
        </div>
        {canUserReview && !hasUserReviewed ? (
          <div className={styles.reviewLeftRatingAndComment}>
            <h2>Review this product</h2>
            <span>Share your thoughts with other customers</span>
            <div className={styles.reviewLeftRating}>
              <StarRating
                size={25}
                value={rating}
                onSetRating={handleSetRating}
                editRating={true}
              />
            </div>
            <form
              action="submit"
              className={styles.reviewLeftComment}
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateReview();
              }}
            >
              <label htmlFor="comment">Comment</label>
              <textarea
                type="text"
                placeholder="Write your comment here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className={styles.sendButton}
                type="submit"
                disabled={!isFormValid}
              >
                Send Review
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.reviewMessages}>
            {"You cannot review this product."}
          </div>
        )}
      </div>
      <div className={styles.reviewRight}>
        <h2>Reviews</h2>
        <div className={styles.reviewsList}>
          {productReviewList.length > 0 ? (
            productReviewList.map((review) => (
              <ReviewItem
                key={review.date}
                rating={review.rating}
                comment={review.comment}
                userFullName={review.userFullName}
                formattedDate={review.formattedDate}
              />
            ))
          ) : (
            <span>No reviews yet.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;
