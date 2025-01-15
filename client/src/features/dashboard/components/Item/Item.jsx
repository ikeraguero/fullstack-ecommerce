import { useProductForm } from "@context/useProductFormContext";
import styles from "./Item.module.css";
import { useUserForm } from "@context/useUserFormContext";

function Item({ item, handleOpenForm, itemType }) {
  const { openEditProduct, toggleDeleteProduct } = useProductForm();
  const { openEditUser, toggleDeleteUser } = useUserForm();
  function handleEdit() {
    handleOpenForm("openEdit", item);

    itemType === "product" ? openEditProduct(item) : openEditUser(item);
  }

  function handleDelete(itemId) {
    itemType === "product"
      ? toggleDeleteProduct(itemId)
      : toggleDeleteUser(itemId);
  }

  return (
    <li className={styles.itemLine}>
      <div className={styles.itemName}>
        {itemType === "product" ? item?.name : item?.userEmail}
      </div>
      {itemType === "product" ? (
        <>
          <div className={styles.itemPrice}>${item.price}</div>
          <div className={styles.itemCategory}>{item.categoryName}</div>
          <div className={styles.itemStockQuantity}>
            {item.stockQuantity} units
          </div>
        </>
      ) : (
        <>
          <div className={styles.itemStatus}>{item?.userStatus}</div>
          <div className={styles.itemRole}>{item?.userRoleName}</div>
          <div className={styles.itemPassword}>#{item?.id}</div>
        </>
      )}
      <div className={styles.itemButtons}>
        <button
          className={styles.removeButton}
          onClick={() => handleDelete(item.id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          <ion-icon name="pencil-outline"></ion-icon>
        </button>
      </div>
    </li>
  );
}

export default Item;
