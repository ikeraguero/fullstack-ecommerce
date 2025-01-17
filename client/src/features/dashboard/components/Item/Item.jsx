import { useProductForm } from "@context/useProductFormContext";
import styles from "./Item.module.css";
import { useUserForm } from "@context/useUserFormContext";

function Item({ item, handleOpenForm, itemType }) {
  const { openEditProduct, toggleDeleteProduct } = useProductForm();
  const { openEditUser, toggleDeleteUser } = useUserForm();

  const PRODUCT = "product";

  function handleEdit() {
    handleOpenForm("openEdit", item);

    itemType === PRODUCT ? openEditProduct(item) : openEditUser(item);
  }

  function handleDelete(itemId) {
    itemType === PRODUCT
      ? toggleDeleteProduct(itemId)
      : toggleDeleteUser(itemId);
  }

  return (
    <tr className={styles.itemLine}>
      <td className={styles.userName}>
        {itemType === PRODUCT ? item?.name : item?.userEmail}
      </td>
      {itemType === PRODUCT ? (
        <>
          <td>${item.price}</td>
          <td className={styles.itemCategory}>{item?.categoryName}</td>
          <td className={styles.itemStockQuantity}>
            {item.stockQuantity} units
          </td>
        </>
      ) : (
        <>
          <td className={styles.itemStatus}>{item?.userStatus}</td>
          <td className={styles.itemRole}>{item?.userRoleName}</td>
          <td className={styles.itemPassword}>#{item?.id}</td>
        </>
      )}
      <td className={styles.itemButtons}>
        <button
          className={styles.removeButton}
          onClick={() => handleDelete(item.id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          <ion-icon name="pencil-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}

export default Item;
