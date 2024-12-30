import UserItem from "./UserItem/UserItem";
import styles from "./UserList.module.css";

function UserList({ users, handleOpenForm, onRemove }) {
  return (
    <ul className={styles.usersList}>
      {users?.map((user) => (
        <UserItem
          user={user}
          key={user.id}
          handleOpenForm={handleOpenForm}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

export default UserList;
