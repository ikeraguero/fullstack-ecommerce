import styles from "./Item.module.css";

function Item({ item, handleOpenForm, onRemove, itemType }) {
  const handleEdit = () => {
    handleOpenForm("openEdit", item);
  };

  console.log(item);

  return (
    <li className={styles.itemLine}>
      <div className={styles.itemName}>
        {itemType === "product" ? item?.name : item?.userEmail}
      </div>
      {itemType === "product" ? (
        <>
          <div className={styles.itemPrice}>R${item.price}</div>
          <div className={styles.itemCategory}>{item.category_name}</div>
          <div className={styles.itemStockQuantity}>
            {item.stock_quantity} units
          </div>
        </>
      ) : (
        <>
          <div className={styles.itemStatus}>{item?.userStatus}</div>
          <div className={styles.itemRole}>{item?.userRoleName}</div>
          <div className={styles.itemPassword}>PASSWORD</div>
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
