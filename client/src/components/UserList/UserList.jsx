import UserItem from "./UserItem/UserItem";

function UserList({ users, handleOpenForm, onRemove }) {
  console.log(users);
  return (
    <ul>
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
