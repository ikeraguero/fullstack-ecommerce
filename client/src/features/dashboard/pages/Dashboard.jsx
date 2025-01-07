import { Navigate } from "react-router-dom";

import styles from "./Dashboard.module.css";
import ProductDashboard from "@features/products/components/ProductDashboard/ProductDashboard";
import UserDashboard from "@features/users/components/UserDashboard/UserDashboard";
import Main from "@features/shared/components/Main/Main";
import useAuth from "@hooks/auth/useAuth";
import useUserForm from "@hooks/user/useUserForm";
import useProductForm from "@hooks/products/useProductForm";

function Dashboard({ requiredRole }) {
  const { userFormState } = useUserForm();
  const { role } = useAuth();
  const { isAddingUser, isEditingUser } = userFormState;
  const { isAddingProduct, isEditingProduct } = useProductForm();
  const isUsersFormOpen = isEditingUser || isAddingUser;
  const isProductFormOpen = isAddingProduct || isEditingProduct;
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

export default Dashboard;
