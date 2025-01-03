import { useWishlist } from "@api/users/wishlist.api";
import styles from "./Wishlist.module.css";
import WishlistItem from "./WishlistItem/WishlistItem";

function Wishlist() {
  const { data: wishlist, isLoading } = useWishlist();

  if (isLoading) return <div>Loading..</div>;
  return (
    <div>
      <h1>Wishlist</h1>
      <div className={styles.wishlistContainer}>
        {wishlist?.map((item) => (
          <WishlistItem key={item} {...item} className={styles.wishlistItem} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
