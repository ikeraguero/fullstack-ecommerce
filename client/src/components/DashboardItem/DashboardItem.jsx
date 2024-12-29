import styles from "./DashboardItem.module.css";
import ProductsList from "../../components/ProductsList/ProductsList";
import ProductForm from "../../components/ProductForm/ProductForm";
import UserList from "../../components/UserList/UserList";
import UserForm from "../../components/UserForm/UserForm";
import { useState } from "react";
import { useUsersFormContext } from "../../hooks/useUsersFormContext";
import { useProductFormContext } from "../../hooks/useProductsFormContext";

function DashboardItem({ title, data, onAdd, onEdit, onRemove, formRef }) {
  const titleCapitalized = title[0].toUpperCase() + title.slice(1);
  const { dispatch: usersDispatch } = useUsersFormContext();
  const { dispatch: productsDispatch } = useProductFormContext();
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleOpenForm(type, payload) {
    setIsFormOpen(!isFormOpen);
    if (title === "Products") {
      productsDispatch({ type, payload });

      return;
    }
    usersDispatch({ type, payload });
  }

  return (
    <div className={styles.addProductContainer}>
      <h2>{titleCapitalized}</h2>
      <span
        className={styles.openAddProductButton}
        onClick={() => handleOpenForm("toggleAdd")}
      >
        Add {titleCapitalized.slice(0, titleCapitalized.length - 1)} +
      </span>
      <div className={isFormOpen ? styles.form : styles.hide}>
        {title === "Products" && (
          <ProductForm formRef={formRef} handleOpenForm={handleOpenForm} />
        )}
        {title === "Users" && (
          <UserForm formRef={formRef} handleOpenForm={handleOpenForm} />
        )}
      </div>
      {data?.length === 0 && (
        <div className={styles.emptyMessage}>
          There are no products registered!
        </div>
      )}
      {title === "Products" && (
        <ProductsList
          products={data}
          handleOpenForm={handleOpenForm}
          onRemove={onRemove}
        />
      )}

      {title === "Users" && (
        <UserList
          users={data}
          handleOpenForm={handleOpenForm}
          onRemove={onRemove}
        />
      )}
    </div>
  );
}

export default DashboardItem;
