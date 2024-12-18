import styles from "./DashboardItem.module.css";
import ProductsList from "../../components/ProductsList/ProductsList";
import UserList from "../../components/UserList/UserList";

function DashboardItem({
  title,
  toggleAddForm,
  isFormOpen,
  Form,
  formRef,
  handleImageChange,
  send,
  list,
  dispatch,
  remove,
}) {
  console.log(list);
  const titleCapitalized = title[0].toUpperCase() + title.slice(1);
  return (
    <div className={styles.addProductContainer}>
      <h2>{titleCapitalized}</h2>
      <span onClick={toggleAddForm} className={styles.openAddProductButton}>
        Add {titleCapitalized.slice(0, titleCapitalized.length - 1)} +
      </span>
      <div className={isFormOpen ? styles.form : styles.hide}>
        <Form
          formRef={formRef}
          handleImageChange={handleImageChange}
          send={send}
        />
      </div>
      {list?.length === 0 && (
        <div className={styles.emptyMessage}>
          There are no products registered!
        </div>
      )}
      {title === "products" && (
        <ProductsList products={list} dispatch={dispatch} remove={remove} />
      )}

      {title === "users" && (
        <UserList users={list} dispatch={dispatch} remove={remove} />
      )}
    </div>
  );
}

export default DashboardItem;
