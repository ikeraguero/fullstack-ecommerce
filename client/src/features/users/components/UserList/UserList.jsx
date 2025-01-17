import Item from "@features/dashboard/components/Item/Item";
import styles from "./UserList.module.css";

function UserList({ items, handleOpenForm, onRemove }) {
  if (!items?.length) {
    return <div>No users available</div>;
  }
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.usersTable}>
        <thead>
          <tr className={styles.listHeader}>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((user) => (
            <Item
              item={user}
              key={user.id}
              handleOpenForm={handleOpenForm}
              onRemove={onRemove}
              itemType="user"
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
