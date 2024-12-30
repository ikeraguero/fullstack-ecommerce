import { useEffect, useRef } from "react";

import { useProductFormContext } from "../../hooks/useProductsFormContext";

import useProducts, {
  useCreateProduct,
  useUpdateProduct,
  useRemoveProduct,
} from "../../api/products.api";
import Main from "../../components/Main/Main";

import DashboardItem from "../../components/DashboardItem/DashboardItem";
import styles from "./Dashboard.module.css";
import {
  useCreateUser,
  useDeleteUsers,
  useUpdateUser,
  useUsers,
} from "../../api/user.api";
import { useUsersFormContext } from "../../hooks/useUsersFormContext";
import { MoonLoader } from "react-spinners";
import useDashboardItem from "../../hooks/useDashboardItem";

function ManageProduct() {
  const { state: productsState, dispatch: productsDispatch } =
    useProductFormContext();
  const { state: usersState, dispatch: usersDispatch } = useUsersFormContext();

  const {
    data: initialProducts,
    error: productError,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useProducts();

  const {
    data: initialUsers,
    error: userError,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useUsers();

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useRemoveProduct();
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUsers();

  const { image, isAddingProduct, isEditingProduct, editProduct } =
    productsState;

  const { isAddingUser, isEditingUser, editUser } = usersState;
  const formRef = useRef();

  const isProductFormOpen = isAddingProduct || isEditingProduct;
  const isUsersFormOpen = isEditingUser || isAddingUser;

  const productActions = {
    create: createProduct,
    update: updateProduct,
    remove: deleteProduct,
    refetch: refetchProducts,
  };

  const userActions = {
    create: createUser,
    update: updateUser,
    remove: deleteUser,
    refetch: refetchUsers,
  };

  const productDashboard = useDashboardItem(initialProducts, productActions);
  const userDashboard = useDashboardItem(initialUsers, userActions);
  console.log(initialUsers);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      productsDispatch({ type: "loadProducts", payload: initialProducts });
    }
  }, [initialProducts, productsDispatch]);

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0) {
      usersDispatch({ type: "loadUsers", payload: initialUsers });
    }
  }, [initialUsers, usersDispatch]);

  const handleFormSubmitProduct = (type, formData, { image }) => {
    const productData = {
      name: formData.get("productName"),
      price: parseFloat(formData.get("productPrice")),
      stock_quantity: Number(formData.get("productStockQuantity")),
      category_id: Number(formData.get("productCategory")),
      product_description: formData.get("productDescription"),
    };

    if (type === "put") productData.id = editProduct.id;
    console.log(productData);

    const sendData = new FormData();
    sendData.append("image", image);
    sendData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );
    for (let [key, value] of sendData.entries()) {
      console.log(key, value);
    }

    if (type === "post") {
      productActions.create(sendData);
      productsDispatch({ type: "toggleAdd" });
    }
    if (type === "put") {
      productActions.update(sendData);
      productsDispatch({ type: "closeEdit" });
    }
  };

  function handleFormSubmitUser(type, formData) {
    const userData = {
      email: formData.get("userEmail"),
      password: formData.get("userPassword"),
      firstName: formData.get("userFirstName"),
      lastName: formData.get("userLastName"),
      roleId: Number(formData.get("userRole")),
    };

    if (type === "put") userData.userId = editUser.id;

    if (type === "post") {
      userActions.create(userData);
      usersDispatch({ type: "toggleAdd" });
    }
    if (type === "put") {
      console.log(userData);
      userActions.update(userData);
      usersDispatch({ type: "closeEdit" });
    }
  }

  if (productsLoading || usersLoading) return <MoonLoader />;
  if (productError || userError) return <div>Error loading data</div>;

  return (
    <>
      <Main>
        {(isProductFormOpen || isUsersFormOpen) && (
          <div className={styles.overlay} />
        )}

        <DashboardItem
          title="Products"
          data={productDashboard.data}
          onAdd={(formData) =>
            handleFormSubmitProduct("post", formData, { image })
          }
          onEdit={(formData) =>
            handleFormSubmitProduct("put", formData, { image })
          }
          onRemove={productDashboard.handleRemove}
          isFormOpen={isProductFormOpen}
          formRef={formRef}
        />

        <DashboardItem
          title="Users"
          data={userDashboard.data}
          onAdd={(formData) => handleFormSubmitUser("post", formData)}
          onEdit={(formData) => handleFormSubmitUser("put", formData)}
          isFormOpen={isUsersFormOpen}
          formRef={formRef}
        />

        <div className={styles.addProductContainer}>
          <h2>Orders</h2>
        </div>
      </Main>
    </>
  );
}

export default ManageProduct;
