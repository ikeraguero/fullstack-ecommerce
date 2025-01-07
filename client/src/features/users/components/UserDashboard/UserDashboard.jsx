import { useRef, useState } from "react";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import { useUsers } from "@api/users/user.api";
import styles from "./UserDashboard.module.css";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import { useUserActions } from "@hooks/user/useUserActions";
import useUserForm from "@hooks/user/useUserForm";

function UserDashboard() {
  const { userFormState } = useUserForm();
  const { isAddingUser, isEditingUser, editUser } = userFormState;

  const formRef = useRef();
  const isUsersFormOpen = isAddingUser || isEditingUser;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [pendingContent, setPendingContent] = useState(null);
  const {
    data: usersResponse,
    error: userError,
    isLoading,
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
      setPendingContent(usersResponse.contentNext);
      setCurrentPage((prevPage) =>
        Math.min(prevPage + 1, usersResponse.totalPages - 1)
      );
    }
  }

  function handlePrevious() {
    if (usersResponse && usersResponse.hasPrevious) {
      setPendingContent(usersResponse.contentPrevious);
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  }

  // useEffect(() => {
  //   if (
  //     usersResponse &&
  //     usersResponse.content &&
  //     usersResponse.content.length > 0
  //   ) {
  //     dispatch(loadUsers(usersResponse.content));
  //   }
  // }, [usersResponse, dispatch]);

  const { content, hasPrevious, hasNext } = usersResponse || {};
  const displayedContent = pendingContent || content;
  const userDashboard = useDashboardItem(
    displayedContent,
    userDashboardActions
  );

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

      <div className={styles.paginationButtons}>
        <button
          onClick={handlePrevious}
          className={
            !isLoading && !hasPrevious ? styles.hidden : styles.paginationButton
          }
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
          Page {currentPage}
        </button>
        <button
          onClick={handleNext}
          className={
            !isLoading && !hasNext ? styles.hidden : styles.paginationButton
          }
        >
          Page {currentPage + 2}
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    </>
  );
}

export default UserDashboard;
