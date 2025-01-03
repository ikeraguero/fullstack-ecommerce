import { useProductFormContext } from "../../../hooks/products/useProductsFormContext";

import styles from "./Dashboard.module.css";

import ProductDashboard from "@features/products/components/ProductDashboard/ProductDashboard";
import UserDashboard from "@features/users/components/UserDashboard/UserDashboard";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useUsersFormContext } from "@hooks/user/useUsersFormContext";
import Main from "@features/shared/components/Main/Main";

function ManageProduct({ requiredRole }) {
  const { state: usersState } = useUsersFormContext();
  const { state: productsState } = useProductFormContext();
  const { isAddingUser, isEditingUser } = usersState;
  const { isAddingProduct, isEditingProduct } = productsState;
  const isUsersFormOpen = isEditingUser || isAddingUser;
  const isProductFormOpen = isAddingProduct || isEditingProduct;
  const role = useSelector((state) => state.auth.role);
  const isAuthorized = role === requiredRole;
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
