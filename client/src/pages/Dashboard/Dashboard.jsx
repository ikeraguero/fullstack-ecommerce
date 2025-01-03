import { useProductFormContext } from "../../hooks/useProductsFormContext";

import Main from "../../components/Main/Main";

import styles from "./Dashboard.module.css";

import { useUsersFormContext } from "../../hooks/useUsersFormContext";
import ProductDashboard from "../../components/ProductDashboard/ProductDashboard";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ManageProduct({ requiredRole }) {
  const { state: usersState } = useUsersFormContext();
  const { state: productsState } = useProductFormContext();
  const { isAddingUser, isEditingUser } = usersState;
  const { isAddingProduct, isEditingProduct } = productsState;
  const isUsersFormOpen = isEditingUser || isAddingUser;
  const isProductFormOpen = isAddingProduct || isEditingProduct;
  const role = useSelector((state) => state.auth.role);
  const isAuthorized = role === requiredRole 
  return isAuthorized ? (
    <>
      <Main>
        {(isProductFormOpen || isUsersFormOpen) && (
          <div className={styles.overlay} />
        )}
        <ProductDashboard />
        <UserDashboard />
      </Main>
    </>
  ) : (
    <Navigate to={"/unauthorized"} replace />
  );
}

export default ManageProduct;
