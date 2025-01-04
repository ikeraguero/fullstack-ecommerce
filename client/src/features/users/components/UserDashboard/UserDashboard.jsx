import { useEffect, useRef } from "react";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import { useUsers } from "@api/users/user.api";
import { MoonLoader } from "react-spinners";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import { useUserActions } from "@hooks/user/useUserActions";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../../../actions/userFormActions";

function UserDashboard() {
  const usersState = useSelector((state) => state.userForm);
  const dispatch = useDispatch();
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
      dispatch(loadUsers(users));
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
