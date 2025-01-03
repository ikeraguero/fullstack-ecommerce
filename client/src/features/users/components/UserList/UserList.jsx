import Item from "@features/dashboard/components/Item/Item";
import styles from "./UserList.module.css";

function UserList({ items, handleOpenForm, onRemove }) {
  if (!items?.length) {
    return <div>No products available</div>;
  }
  return (
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
  );
}

export default UserList;
