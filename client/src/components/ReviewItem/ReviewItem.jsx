import StarRating from "../StarRating/StarRating";
import styles from "./ReviewItem.module.css";
function ReviewItem({ rating, comment, userFullName }) {
  console.log(rating, comment, userFullName);
  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewProfile}>
        <span>
          <img src="../../../profile-img.jpg" alt="" />
        </span>
        <span>{userFullName}</span>
      </div>
      <div className={styles.reviewRating}>
        <StarRating size={25} defaultRating={rating} />
      </div>
      <div className={styles.reviewComment}>
        <span>{comment}</span>
      </div>
    </div>
  );
}

export default ReviewItem;
