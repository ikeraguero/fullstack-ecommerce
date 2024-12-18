import styles from "./UserItem.module.css";

function UserItem({ user, removeUser, usersDispatch }) {
  function handleEdit() {
    usersDispatch({ type: "openEdit", payload: user });
  }

  return (
    <li className={styles.productLine}>
      <div className={styles.productName}>{user.email}</div>
      <div className={styles.productPrice}>{user.role}</div>
      <div className={styles.productCategory}>
        {user.active ? "active" : "inactive"}
      </div>
      <div className={styles.productStockQuantity}>PASSWORD</div>
      <div className={styles.productItemButtons}>
        <button
          className={styles.removeButton}
          onClick={() => removeUser(user.id)}
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
