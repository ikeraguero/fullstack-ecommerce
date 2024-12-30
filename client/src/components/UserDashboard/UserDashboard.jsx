import { useEffect, useRef } from "react";
import DashboardItem from "../DashboardItem/DashboardItem";
import { useUsersFormContext } from "../../hooks/useUsersFormContext";
import { useUsers } from "../../api/user.api";
import { MoonLoader } from "react-spinners";
import useDashboardItem from "../../hooks/useDashboardItem";
import { useUserActions } from "../../hooks/useUserActions";

function UserDashboard() {
  const { state: usersState, dispatch } = useUsersFormContext();
  const { isAddingUser, isEditingUser, editUser } = usersState;

  const formRef = useRef();
  const isUsersFormOpen = isAddingUser || isEditingUser;

  const {
    data: users,
    error: userError,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useUsers();

  const { create, update, remove } = useUserActions(editUser, refetchUsers);

  useEffect(() => {
    if (users && users.length > 0) {
      dispatch({ type: "loadUsers", payload: users });
    }
  }, [users, dispatch]);

  const userDashboardActions = {
    create,
    edit: update,
    remove,
  };

  const userDashboardData = useDashboardItem(users, userDashboardActions);

  if (usersLoading) return <MoonLoader aria-label="Loading users..." />;
  if (userError) return <div>Error loading users: {userError.message}</div>;

  return (
    <DashboardItem
      title="Users"
      data={userDashboardData.data}
      onAdd={userDashboardActions.create}
      onEdit={userDashboardActions.edit}
      onRemove={userDashboardActions.remove}
      isFormOpen={isUsersFormOpen}
      formRef={formRef}
    />
  );
}

export default UserDashboard;
