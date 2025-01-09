import styles from "./DashboardItem.module.css";
import ProductsList from "@features/products/components/ProductsList/ProductsList";
import ProductForm from "@features/products/components/ProductForm/ProductForm";
import UserList from "@features/users/components/UserList/UserList";
import UserForm from "@features/users/components/UserForm/UserForm";

import { useProductForm } from "@context/useProductFormContext";
import { useUserForm } from "@context/useUserFormContext";

const formComponents = {
  Products: ProductForm,
  Users: UserForm,
};

const listComponents = {
  Products: ProductsList,
  Users: UserList,
};

function DashboardItem({
  title,
  data,
  onAdd,
  onEdit,
  onRemove,
  formRef,
  isFormOpen,
}) {
  const { toggleAddProduct } = useProductForm();
  const { toggleAddUser } = useUserForm();
  const titleCapitalized = title[0].toUpperCase() + title.slice(1);

  function handleOpenForm(payload) {
    if (title === "Products") {
      console.log("a");
      toggleAddProduct();
      return;
    }
    toggleAddUser(payload);
  }

  console.log(data);

  const FormComponent = formComponents[title];
  const ListComponent = listComponents[title];

  return (
    <div className={styles.addProductContainer}>
      <h2>{titleCapitalized}</h2>
      <span className={styles.openAddProductButton} onClick={handleOpenForm}>
        Add {titleCapitalized.slice(0, titleCapitalized.length - 1)} +
      </span>
      <div className={isFormOpen ? styles.form : styles.hide}>
        {FormComponent && (
          <FormComponent
            formRef={formRef}
            handleOpenForm={handleOpenForm}
            onAdd={onAdd}
            onEdit={onEdit}
          />
        )}
      </div>
      {data?.length === 0 && (
        <div className={styles.emptyMessage}>
          There are no products registered!
        </div>
      )}
      {ListComponent && (
        <ListComponent
          items={data}
          handleOpenForm={handleOpenForm}
          onRemove={onRemove}
        />
      )}
    </div>
  );
}

export default DashboardItem;
