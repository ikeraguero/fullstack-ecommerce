import { Link } from "react-router-dom";
import styles from "./WishlistItem.module.css";
import { useDeleteWishlistItem } from "@api/users/wishlist.api";

function WishlistItem({
  id,
  productImageType,
  productImageData,
  productName,
  createdAt,
  productPrice,
  productId,
}) {
  const { mutate: removeWishlistItem } = useDeleteWishlistItem();

  function handleRemoveWishlistItem() {
    removeWishlistItem(id);
  }
  return (
    <div className={styles.outerContainer}>
      <Link className={styles.wishlistItem} to={`/products/${productId}`}>
        <div className={styles.wishlistItemImgAndName}>
          <div className={styles.wishlistItemImg}>
            <img
              src={`data:${productImageType};base64,${productImageData}`}
              alt=""
            />
          </div>
          <div className={styles.wishlistItemNameAndCategory}>
            {/* <div className={styles.wishlistItemCategoryName}>{category_name}</div> */}
            <div className={styles.wishlistItemName}>{productName}</div>
          </div>
        </div>
        <div>
          <span>${productPrice}</span>
        </div>
        <div>
          <span>
            Added on <strong>{createdAt}</strong>
          </span>
        </div>
      </Link>
      <div>
        <button
          className={styles.removeButton}
          onClick={handleRemoveWishlistItem}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;
