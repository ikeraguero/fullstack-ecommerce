import styles from "./UserItem.module.css";

function UserItem({ user, handleOpenForm, onRemove }) {
  function handleEdit() {
    handleOpenForm("openEdit", user);
  }

  const { userEmail, userStatus, userRoleName } = user;

  return (
    <li className={styles.productLine}>
      <div className={styles.productName}>{userEmail}</div>
      <div className={styles.productCategory}>{userStatus}</div>
      <div className={styles.productPrice}>{userRoleName}</div>
      <div className={styles.productStockQuantity}>PASSWORD</div>
      <div className={styles.productItemButtons}>
        <button
          className={styles.removeButton}
          onClick={() => onRemove(user.id)}
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

export default UserItem;
