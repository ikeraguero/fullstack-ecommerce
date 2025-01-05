import styles from "./Dashboard.module.css";

import ProductDashboard from "@features/products/components/ProductDashboard/ProductDashboard";
import UserDashboard from "@features/users/components/UserDashboard/UserDashboard";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Main from "@features/shared/components/Main/Main";

function ManageProduct({ requiredRole }) {
  const usersState = useSelector((state) => state.userForm);
  const productsState = useSelector((state) => state.productForm);
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
        <h1>Dashboard</h1>
        <ProductDashboard />
        <UserDashboard />
      </Main>
    </>
  ) : (
    <Navigate to={"/unauthorized"} replace />
  );
}

export default ManageProduct;
