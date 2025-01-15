import { useWishlist } from "@api/users/wishlist.api";
import styles from "./Wishlist.module.css";
import WishlistItem from "./WishlistItem/WishlistItem";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";

function Wishlist() {
  const { data: wishlist, isLoading, error } = useWishlist();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className={styles.wishlistContainer}>
          {wishlist?.map((item) => (
            <WishlistItem
              key={item}
              {...item}
              className={styles.wishlistItem}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyMessage}>
          Your wishlist is currently empty.
        </div>
      )}
    </div>
  );
}

export default Wishlist;
