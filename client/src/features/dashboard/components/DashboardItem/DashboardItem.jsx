import styles from "./DashboardItem.module.css";
import ProductsList from "@features/products/components/ProductsList/ProductsList";
import ProductForm from "@features/products/components/ProductForm/ProductForm";
import UserList from "@features/users/components/UserList/UserList";
import UserForm from "@features/users/components/UserForm/UserForm";

import { useDispatch } from "react-redux";
import { toggleAddProduct } from "../../../../actions/productFormActions";
import { toggleAddUser } from "../../../../actions/userFormActions";

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
  const titleCapitalized = title[0].toUpperCase() + title.slice(1);
  const dispatch = useDispatch();

  function handleOpenForm(payload) {
    if (title === "Products") {
      dispatch(toggleAddProduct(payload));
      return;
    }
    dispatch(toggleAddUser(payload));
  }

  const FormComponent = formComponents[title];
  const ListComponent = listComponents[title];

  return (
    <div className={styles.addProductContainer}>
      <h2>{titleCapitalized}</h2>
      <span
        className={styles.openAddProductButton}
        onClick={() => handleOpenForm()}
      >
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
