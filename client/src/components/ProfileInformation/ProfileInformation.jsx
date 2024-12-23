import styles from "./ProfileInformation.module.css";

function ProfileInformation() {
  return (
    <div>
      <h1>Profile</h1>
      <div className={styles.profileTop}>
        <div className={styles.profileTopLeft}>
          <div className={styles.profileLeftPhoto}>
            <img src="../../../profile-img.jpg" alt="" />
          </div>
          <div className={styles.profileLeftEmailAndName}>
            <span>Full Name</span>
            <span>Email</span>
          </div>
        </div>
        <div className={styles.profileTopRight}>
          <button>Edit</button>
        </div>
      </div>
      <div className={styles.profileBody}>
        <form action="submit" className={styles.profileBodyForm}>
          <div className={styles.profileFormItem}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="email">Email</label>
            <input type="email" />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="password">Password</label>
            <input type="password" />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="Address">Address</label>
            <input type="text" />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="country">Country</label>
            <input type="text" />
          </div>
          <div className={styles.profileFormItem}>
            <label htmlFor="city">City</label>
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInformation;
