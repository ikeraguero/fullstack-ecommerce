import { useEffect, useRef, useState } from "react";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import { useUsers } from "@api/users/user.api";
import { MoonLoader } from "react-spinners";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import { useUserActions } from "@hooks/user/useUserActions";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../../../actions/userFormActions";

function UserDashboard() {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.userForm);
  const { isAddingUser, isEditingUser, editUser } = usersState;

  const formRef = useRef();
  const isUsersFormOpen = isAddingUser || isEditingUser;


  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);


  const {
    data: usersResponse,
    error: userError,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useUsers(currentPage, pageSize);

  const { create, update, remove } = useUserActions(editUser, refetchUsers);

  const userDashboardActions = {
    create,
    edit: update,
    remove,
  };


  function handleNext() {
    if (usersResponse && usersResponse.hasNext) {
      setCurrentPage((prevPage) =>
        Math.min(prevPage + 1, usersResponse.totalPages - 1)
      ); 
    }
  }

  function handlePrevious() {
    if (usersResponse && usersResponse.hasPrevious) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); 
    }
  }


  useEffect(() => {
    if (
      usersResponse &&
      usersResponse.content &&
      usersResponse.content.length > 0
    ) {
      dispatch(loadUsers(usersResponse.content));
    }
  }, [usersResponse, dispatch]);

  const { content, hasPrevious, hasNext, totalPages } = usersResponse || {};


  const userDashboard = useDashboardItem(content, userDashboardActions);

  if (usersLoading) return <MoonLoader aria-label="Loading users..." />;
  if (userError) return <div>Error loading users: {userError.message}</div>;

  return (
    <>
      <DashboardItem
        title="Users"
        data={userDashboard.data}
        onAdd={userDashboardActions.create}
        onEdit={userDashboardActions.edit}
        onRemove={userDashboardActions.remove}
        isFormOpen={isUsersFormOpen}
        formRef={formRef}
      />

      <div>
        <button onClick={handlePrevious} disabled={!hasPrevious}>
          Previous
        </button>
        <button onClick={handleNext} disabled={!hasNext}>
          Next
        </button>
      </div>

      <p>
        Page {currentPage + 1} of {totalPages}
      </p>
    </>
  );
}

export default UserDashboard;
