import { useProductFormContext } from "../../hooks/useProductsFormContext";

import Main from "../../components/Main/Main";

import styles from "./Dashboard.module.css";

import { useUsersFormContext } from "../../hooks/useUsersFormContext";
import ProductDashboard from "../../components/ProductDashboard/ProductDashboard";
import UserDashboard from "../../components/UserDashboard/UserDashboard";

function ManageProduct() {
  const { state: usersState } = useUsersFormContext();

  const { state: productsState } = useProductFormContext();

  const { isAddingUser, isEditingUser } = usersState;
  const { isAddingProduct, isEditingProduct } = productsState;

  const isUsersFormOpen = isEditingUser || isAddingUser;
  const isProductFormOpen = isAddingProduct || isEditingProduct;

  return (
    <>
      <Main>
        {(isProductFormOpen || isUsersFormOpen) && (
          <div className={styles.overlay} />
        )}
        <ProductDashboard />
        <UserDashboard />
      </Main>
    </>
  );
}

export default ManageProduct;
