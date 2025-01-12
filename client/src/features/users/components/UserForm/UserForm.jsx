import { MoonLoader } from "react-spinners";
import { useRoles } from "@api/users/roles.api";
import useUserAddForm from "@hooks/user/useUserAddForm";
import useUserEditForm from "@hooks/user/useUserEditForm";
import styles from "./UserForm.module.css";
import { useEffect } from "react";
import { useUserForm } from "@context/useUserFormContext";

function UserForm({ formRef, onAdd, onEdit, handleOpenForm }) {
  const { isEditingUser, editUser, isAddingUser, resetUserForm } =
    useUserForm();

  const userAddForm = useUserAddForm((e) => handleSendData(e));
  const userEditForm = useUserEditForm((e) => handleSendData(e));

  const { values, handleChange } = isEditingUser ? userEditForm : userAddForm;

  const { data: roles, error, isLoading } = useRoles();

  useEffect(() => {
    if (isAddingUser) {
      resetUserForm();
    }
  }, [isAddingUser]);

  function handleSendData(e) {
    e.preventDefault();

    const userRequest = {
      userId: editUser?.id || null,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      roleId: Number(values.roleId),
      address: {
        addressId: editUser?.userAddress.id || null,
        address: values.address,
        postalCode: values.postalCode,
        country: values.country,
        city: values.city,
      },
    };

    console.log(userRequest);

    if (isEditingUser) {
      onEdit(userRequest);
      resetUserForm();
      return;
    }

    onAdd(userRequest);
    resetUserForm();
  }

  function handleCloseForm() {
    resetUserForm();
    handleClearForm();
  }

  function handleClearForm() {
    resetUserForm();
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

  return (
    <div>
      <span className={styles.formTop}>
        {!isEditingUser ? "Add New User" : `Edit ${editUser?.userEmail}`}
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
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={handleChange}
              name="firstName"
              className={styles.addFormInput}
              value={values.firstName}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={handleChange}
              name="lastName"
              className={styles.addFormInput}
              value={values.lastName}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={values.password}
              className={styles.addFormInput}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="roleId">Role</label>
            <select
              onChange={handleChange}
              name="roleId"
              value={values.roleId}
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
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={styles.addFormInput}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              name="postalCode"
              type="postalCode"
              value={values.postalCode}
              onChange={handleChange}
              className={styles.addFormInput}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="address">Address</label>
            <input
              name="address"
              type="address"
              value={values.address}
              onChange={handleChange}
              className={styles.addFormInput}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="country">Country</label>
            <input
              name="country"
              type="country"
              value={values.country}
              onChange={handleChange}
              className={styles.addFormInput}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="city">City</label>
            <input
              name="city"
              type="city"
              value={values.city}
              onChange={handleChange}
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
