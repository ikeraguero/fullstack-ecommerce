import {
  useCreateWishlistItem,
  useDeleteWishlistItem,
} from "@api/users/wishlist.api";
import { useSuccess } from "@context/SuccessContext";
import useAuth from "@hooks/auth/useAuth";

function useWishlistActions() {
  const { userId } = useAuth();
  const { displaySuccess } = useSuccess();
  const { mutate: removeWishlistItem } = useDeleteWishlistItem();
  const { mutate: addToWishlist } = useCreateWishlistItem();

  function handleAddToWishList(productId) {
    const data = {
      userId,
      productId,
    };
    addToWishlist(data);
    displaySuccess("Product added to wishlist");
  }

  function handleRemoveFromWishlist(wishlistItemId) {
    removeWishlistItem(wishlistItemId);
    displaySuccess("Product removed from wishlist");
  }

  return { handleAddToWishList, handleRemoveFromWishlist };
}

export default useWishlistActions;
