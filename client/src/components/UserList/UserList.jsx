import UserItem from "./UserItem/UserItem";

function UserList({ users, remove, dispatch }) {
  return (
    <ul>
      {users?.map((user) => (
        <UserItem
          user={user}
          key={user.id}
          removeUser={remove}
          usersDispatch={dispatch}
        />
      ))}
    </ul>
  );
}

export default UserList;
