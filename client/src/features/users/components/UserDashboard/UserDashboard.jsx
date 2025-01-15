import { useEffect, useMemo, useState } from "react";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import { useUsers } from "@api/users/user.api";
import styles from "./UserDashboard.module.css";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import { useUserActions } from "@hooks/user/useUserActions";
import { useUserForm } from "@context/useUserFormContext";

function UserDashboard() {
  const {
    isAddingUser,
    isEditingUser,
    editUser,
    deleteUserId,
    toggleDeleteUser,
    isDeletingUser,
  } = useUserForm();

  const isUsersFormOpen = isAddingUser || isEditingUser;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [pendingContent, setPendingContent] = useState(null);
  const {
    data: initialUsers,
    error: userError,
    isLoading,
    refetch: refetchUsers,
  } = useUsers(currentPage, pageSize);

  const { create, update, remove } = useUserActions(editUser, refetchUsers);

  const userDashboardActions = useMemo(
    () => ({
      create,
      edit: update,
      remove,
    }),
    [create, update, remove]
  );

  function handleNext() {
    if (initialUsers && initialUsers.hasNext) {
      setPendingContent(contentNext);
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevious() {
    if (initialUsers && initialUsers.hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  }

  const { content, hasPrevious, hasNext, contentNext } = initialUsers || {};
  const displayedContent = pendingContent || content;
  const userDashboard = useDashboardItem(
    displayedContent,
    userDashboardActions
  );

  function handleDelete() {
    userDashboard.handleRemove(deleteUserId);
  }

  function handleCancel() {
    toggleDeleteUser();
  }

  useEffect(() => {
    if (!isLoading && content && currentPage > 0) {
      setPendingContent(null);
    }
  }, [isLoading, currentPage, content]);

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
        onAdd={userDashboard.handleCreate}
        onEdit={userDashboard.handleEdit}
        onRemove={userDashboard.handleRemove}
        isFormOpen={isUsersFormOpen}
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
