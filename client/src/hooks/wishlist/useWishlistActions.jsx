import {
  useCreateWishlistItem,
  useDeleteWishlistItem,
} from "@api/users/wishlist.api";
import { useSuccess } from "@context/SuccessContext";
import useAuth from "@hooks/auth/useAuth";

function useWishlistActions(refetchProduct) {
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
    refetchProduct();
    displaySuccess("Product added to wishlist");
  }

  function handleRemoveFromWishlist(wishlistItemId) {
    removeWishlistItem(wishlistItemId);
    refetchProduct();
    displaySuccess("Product removed from wishlist");
  }

  return { handleAddToWishList, handleRemoveFromWishlist };
}

export default useWishlistActions;
