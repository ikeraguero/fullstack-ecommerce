import UserItem from "./UserItem/UserItem";

function UserList({ users, removeUser }) {
  return (
    <ul>
      {users?.map((user) => (
        <UserItem user={user} key={user.id} removeUser={removeUser} />
      ))}
    </ul>
  );
}

export default UserList;
