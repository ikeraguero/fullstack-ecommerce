import Item from "@features/dashboard/components/Item/Item";
import styles from "./UserList.module.css";

function UserList({ items, handleOpenForm, onRemove }) {
  if (!items?.length) {
    return <div>No products available</div>;
  }
  return (
    <div>
      <div className={styles.listHeader}>
        <span>Email</span>
        <span>Status</span>
        <span>Role</span>
        <span>Id</span>
        <span>Actions</span>
      </div>
      <ul className={styles.usersList}>
        {items?.map((user) => (
          <Item
            item={user}
            key={user.id}
            handleOpenForm={handleOpenForm}
            onRemove={onRemove}
            itemType="user"
          />
        ))}
      </ul>
    </div>
  );
}

export default UserList;
