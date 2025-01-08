import { useRef, useState } from "react";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import { useUsers } from "@api/users/user.api";
import styles from "./UserDashboard.module.css";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import { useUserActions } from "@hooks/user/useUserActions";
import useUserForm from "@hooks/user/useUserForm";

function UserDashboard() {
  const {
    isAddingUser,
    isEditingUser,
    editUser,
    deleteUserId,
    toggleDeleteUserForm,
    isDeletingUser,
  } = useUserForm();

  console.log(isDeletingUser);
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

  function handleDelete() {
    userDashboard.handleRemove(deleteUserId);
  }

  function handleCancel() {
    toggleDeleteUserForm();
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
      <div
        className={isDeletingUser ? styles.confirmationModal : styles.hidden}
      >
        <h1 className={styles.confirmationTitle}>
          Are you sure you want to delete this item?
        </h1>
        <div className={styles.confirmationButtons}>
          <button className={styles.confirmationButton} onClick={handleCancel}>
            Back
          </button>
          <button className={styles.confirmationButton} onClick={handleDelete}>
            Confirm
          </button>
        </div>
      </div>
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
