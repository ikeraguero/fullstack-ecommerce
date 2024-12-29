import styles from "./TopCategories.module.css";
function TopCategories() {
  return (
    <section className={styles.topCategories}>
      <div className={styles.topCategoriesHeader}>
        <h2>
          Shop From{" "}
          <span className={styles.topCategoriesTitle}>Top Categories</span>
        </h2>
      </div>
    </section>
  );
}

export default TopCategories;
