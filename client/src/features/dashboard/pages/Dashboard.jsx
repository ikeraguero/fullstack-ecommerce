import { Navigate } from "react-router-dom";

import styles from "./Dashboard.module.css";
import ProductDashboard from "@features/products/components/ProductDashboard/ProductDashboard";
import UserDashboard from "@features/users/components/UserDashboard/UserDashboard";
import Main from "@features/shared/components/Main/Main";
import useUserState from "@hooks/user/useUserState";
import useProductState from "@hooks/products/useProductState";

function Dashboard({ requiredRole }) {
  const { userFormState, role } = useUserState();
  const { productFormState } = useProductState();
  const { isAddingUser, isEditingUser } = userFormState;
  const { isAddingProduct, isEditingProduct } = productFormState;
  const isUsersFormOpen = isEditingUser || isAddingUser;
  const isProductFormOpen = isAddingProduct || isEditingProduct;
  const isAuthorized = role === requiredRole;

  console.log(isAddingProduct, isEditingProduct);
  console.log(isAddingUser, isEditingUser);
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

export default Dashboard;
