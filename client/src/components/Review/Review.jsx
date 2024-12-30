import { useState } from "react";
import ReviewItem from "../ReviewItem/ReviewItem";
import StarRating from "../StarRating/StarRating";
import styles from "./Review.module.css";
import { useCreateReview } from "../../api/reviews.api";

function Review({ productReviewList, canUserReview }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState();
  const ratingSum = productReviewList
    .map((productReview) => productReview.rating)
    .reduce((cur, acc) => cur + acc, 0);
  const ratingLength = productReviewList.length;
  const ratingAvg = ratingSum / ratingLength;
  const { mutate: createReview } = useCreateReview();



  function handleSetRating(rating) {
    setRating(rating);
  }

  function handleCreateReview() {
    const reviewObject = {
      productId: 4,
      userId: 1,
      rating: 5,
      comment: "Great product! Highly recommend.",
      date: new Date().toISOString(),
    };
    createReview(reviewObject);
  }

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewLeft}>
        <div className={styles.reviewLeftStats}>
          <h2>Customer ratings</h2>
          {!isNaN(ratingAvg) ? (
            <>
              <span>
                <StarRating
                  size={25}
                  maxRating={1}
                  defaultRating={1}
                  showRating={false}
                />
                <span>{ratingAvg} out of 5.0 </span>
                <span>•</span>
                <span>
                  {ratingLength} {ratingLength === 1 ? "review" : "reviews"}{" "}
                </span>
              </span>
            </>
          ) : (
            <span>No reviews yet</span>
          )}
        </div>
        {canUserReview && (
          <div className={styles.reviewLeftRatingAndComment}>
            <h2>Review this product</h2>
            <span>Share your thoughts with other customers</span>
            <div className={styles.reviewLeftRating}>
              <StarRating
                size={25}
                defaultRating={rating}
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
              <button className={styles.sendButton} type="submit">
                Send Review
              </button>
            </form>
          </div>
        )}
      </div>
      <div className={styles.reviewRight}>
        <h2>Reviews</h2>
        <div className={styles.reviewsList}>
          {productReviewList.map((review) => (
            <ReviewItem key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
