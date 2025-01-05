import { useDispatch } from "react-redux";
import styles from "./Item.module.css";
import { openEditProduct } from "../../../../actions/productFormActions";
import { openEditUser } from "../../../../actions/userFormActions";

function Item({ item, handleOpenForm, onRemove, itemType }) {
  const dispatch = useDispatch();
  const handleEdit = () => {
    handleOpenForm("openEdit", item);

    dispatch(
      itemType === "product" ? openEditProduct(item) : openEditUser(item)
    );
  };


  return (
    <li className={styles.itemLine}>
      <div className={styles.itemName}>
        {itemType === "product" ? item?.name : item?.userEmail}
      </div>
      {itemType === "product" ? (
        <>
          <div className={styles.itemPrice}>R${item.price}</div>
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
          onClick={() => onRemove(item.id)}
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
