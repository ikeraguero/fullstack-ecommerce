import { MoonLoader } from "react-spinners";
import { useUsersFormContext } from "../../hooks/useUsersFormContext";

import styles from "./UserForm.module.css";
import { useRoles } from "../../api/roles.api";

function UserForm({ formRef, onAdd, onEdit, handleOpenForm }) {
  const { state, dispatch } = useUsersFormContext();
  const { data: roles, error, isLoading } = useRoles();

  function handleSendData(e) {
    const formData = new FormData(e.target);
    if (isEditingUser) {
      onEdit(formData);
      return;
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    onAdd(formData);
  }

  function handleCloseForm() {
    handleOpenForm({ type: isAddingUser ? "toggleAdd" : "closeEdit" });
    handleClearForm();
  }

  function handleClearForm() {
    dispatch({ type: "reset" });

    if (formRef.current) {
      formRef.current.reset();
    }
  }

  if (isLoading) {
    return (
      <div>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  const {
    isAddingUser,
    isEditingUser,
    editUser,
    userFirstName,
    userLastName,
    userPassword,
    userRole,
    userEmail,
  } = state;

  console.log(isEditingUser, userPassword);

  return (
    <div>
      <span className={styles.formTop}>
        {!isEditingUser ? "Add New User" : `Edit ${editUser?.email}`}
        <ion-icon name="close-outline" onClick={handleCloseForm}></ion-icon>
      </span>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendData(e);
        }}
      >
        <div className={styles.formBody}>
          <div className={styles.formItem}>
            <label htmlFor="userFirstName">First Name</label>
            <input
              onChange={(e) =>
                dispatch({ type: "changeFirstName", payload: e.target.value })
              }
              name="userFirstName"
              className={styles.addFormInput}
              value={isEditingUser || userFirstName ? userFirstName : ""}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="userLastName">Last Name</label>
            <input
              onChange={(e) =>
                dispatch({ type: "changeLastName", payload: e.target.value })
              }
              name="userLastName"
              className={styles.addFormInput}
              value={isEditingUser || userLastName ? userLastName : ""}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              onChange={(e) =>
                dispatch({
                  type: "changePassword",
                  payload: e.target.value,
                })
              }
              name="userPassword"
              value={isEditingUser || userPassword ? userPassword : ""}
              className={styles.addFormInput}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="userRole">Role</label>
            <select
              onChange={(e) =>
                dispatch({
                  type: "changeRole",
                  payload: e.target.value,
                })
              }
              name="userRole"
              id="userRole"
              value={isEditingUser || userRole ? userRole : ""}
              className={styles.addFormSelect}
            >
              {roles?.map((role) => (
                <option value={role?.id} key={role?.id}>
                  {role?.name[0].toUpperCase() + role?.name.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="userEmail">Email</label>
            <input
              name="userEmail"
              type="email"
              value={isEditingUser || userEmail ? userEmail : ""}
              onChange={(e) =>
                dispatch({
                  type: "changeEmail",
                  payload: e.target.value,
                })
              }
              className={styles.addFormInput}
            />
          </div>
        </div>
        <button className={styles.sendButton}>+</button>
      </form>
    </div>
  );
}

export default UserForm;
