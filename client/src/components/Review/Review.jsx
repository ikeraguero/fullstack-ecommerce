import ReviewItem from "../ReviewItem/ReviewItem";
import StarRating from "../StarRating/StarRating";
import styles from "./Review.module.css";

function Review({ productReviewList }) {
  console.log(productReviewList);
  const ratingSum = productReviewList
    .map((productReview) => productReview.rating)
    .reduce((cur, acc) => cur + acc, 0);
  const ratingLength = productReviewList.length;
  const ratingAvg = ratingSum / ratingLength;
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
                  defaultRating={ratingAvg}
                  showRating={false}
                />
                <span>{ratingAvg} out of 5 </span>
              </span>
              <span>{ratingLength} reviews</span>
            </>
          ) : (
            <span>No reviews yet</span>
          )}
        </div>
        <div>
          <h2>Review this product</h2>
          <span>Share your thoughts with other customers</span>
        </div>
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
