import styles from "./ProfileInformation.module.css";
import { useState } from "react";
import useUserEditForm from "@hooks/user/useUserEditForm";
import { useUpdateUser } from "@api/users/user.api";
import useAuth from "@hooks/auth/useAuth";

function ProfileInformation() {
  const { userId, email, username, updateUserProfile } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const userEditForm = useUserEditForm(handleSubmitForm);
  const { values, handleChange } = userEditForm;
  const { mutateAsync: updateUser } = useUpdateUser();

  function handleEditButtonClick() {
    setIsEditingProfile(!isEditingProfile);
  }

  async function handleSubmitForm() {
    const { firstName, lastName, email } = values;
    const userRequest = {
      userId,
      firstName,
      lastName,
      email,
      password: "",
      roleId: Number(values.roleId),
    };
    await updateUser(userRequest);
    const username = firstName + " " + lastName;
    updateUserProfile(username, firstName, lastName, email);
    setIsEditingProfile(false);
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
