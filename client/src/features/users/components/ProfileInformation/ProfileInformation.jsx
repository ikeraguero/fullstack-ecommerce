import { useSelector } from "react-redux";
import styles from "./ProfileInformation.module.css";
import { useState } from "react";
import useUserEditForm from "@hooks/cart/useUserEditForm";
import { useUpdateUser } from "@api/users/user.api";

function ProfileInformation() {
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.id);
  const email = useSelector((state) => state.auth.email);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const userEditForm = useUserEditForm(handleSubmitForm);
  const { values, handleChange } = userEditForm;
  const { mutate: updateUser } = useUpdateUser();

  function handleEditButtonClick() {
    setIsEditingProfile(!isEditingProfile);
  }

  function handleSubmitForm() {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", "123");
    formData.append("roleId", 0);
    updateUser(formData);
  }
  return (
    <div>
      <h1>Profile</h1>
      <div className={styles.profileTop}>
        <div className={styles.profileTopLeft}>
          <div className={styles.profileLeftPhoto}>
            <img src="../../../profile-img.jpg" alt="" />
          </div>
          <div className={styles.profileLeftEmailAndName}>
            <span className={styles.profileUsername}>
              {username?.toUpperCase()}
            </span>
            <span className={styles.profileEmail}>{email}</span>
          </div>
        </div>
        <div className={styles.profileTopRight}>
          <button
            className={styles.profileTopRightButton}
            onClick={
              isEditingProfile ? handleSubmitForm : handleEditButtonClick
            }
          >
            {isEditingProfile ? "Save" : "Edit"}
          </button>
        </div>
      </div>
      <div className={styles.profileBody}>
        <form action="submit" className={styles.profileBodyForm}>
          <div className={styles.profileFormItem}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              disabled={!isEditingProfile}
            />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={values.lastName}
              disabled={!isEditingProfile}
              onChange={handleChange}
            />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              disabled={!isEditingProfile}
              onChange={handleChange}
            />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="password">Password</label>
            <input type="password" disabled={!isEditingProfile} />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" disabled={!isEditingProfile} />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="Address">Address</label>
            <input type="text" disabled={!isEditingProfile} />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="country">Country</label>
            <input type="text" disabled={!isEditingProfile} />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="city">City</label>
            <input type="text" disabled={!isEditingProfile} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInformation;
