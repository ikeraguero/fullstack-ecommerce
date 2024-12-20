import { useEffect, useRef } from "react";
import axios from "axios";

import { useProductFormContext } from "../../hooks/useProductsFormContext";

import { BASE_URL } from "../../config/config";
import useProducts, {
  useCreateProduct,
  useUpdateProduct,
} from "../../api/products.api";
import Main from "../../components/Main/Main";
import ProductForm from "../../components/ProductForm/ProductForm";
import UserForm from "../../components/UserForm/UserForm";
import DashboardItem from "../../components/DashboardItem/DashboardItem";
import styles from "./ManageProduct.module.css";
import { useDeleteUsers, useUsers } from "../../api/user.api";
import { useUsersFormContext } from "../../hooks/useUsersFormContext";
import { MoonLoader } from "react-spinners";

function ManageProduct() {
  const { state: productsState, dispatch: productsDispatch } =
    useProductFormContext();
  const { state: usersState, dispatch: usersDispatch } = useUsersFormContext();
  const { data: initialProducts, error, isLoading } = useProducts();
  const { data: initialUsers, refetch: userRefetch } = useUsers();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteUser } = useDeleteUsers();

  const {
    products,
    image,
    isAddingProduct,
    isEditingProduct,
    editProduct,
    productDescription,
  } = productsState;

  const { users, isAddingUser, isEditingUser } = usersState;
  const formRef = useRef();

  const isProductFormOpen = isAddingProduct || isEditingProduct;
  const isUsersFormOpen = isEditingUser || isAddingUser;

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

  function toggleProductAddForm() {
    formRef.current.reset();
    productsDispatch({ type: "toggleAdd" });
  }

  function toggleUserAddForm() {
    formRef.current.reset();
    usersDispatch({ type: "toggleAdd" });
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    productsDispatch({ type: "setImage", payload: file });
  }

  async function send(type, formData) {
    const productName = formData.get("productName");
    const productPrice = parseFloat(formData.get("productPrice"));
    const productStockQuantity = Number(formData.get("productStockQuantity"));
    const productCategory = Number(formData.get("productCategory"));

    if (
      !productName ||
      !productPrice ||
      !productStockQuantity ||
      !productCategory ||
      !productDescription ||
      !image
    ) {
      return alert("Empty fields are not allowed");
    }

    let productData = {
      name: productName,
      price: productPrice,
      stock_quantity: productStockQuantity,
      category_id: productCategory,
      product_description: productDescription,
    };

    if (type === "put") {
      productData.id = editProduct?.id;
    }

    const sendData = new FormData();
    sendData.append("image", image);
    sendData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    if (type === "post") {
      createProduct(sendData);
      productsDispatch({ type: "toggleAdd" });
    }

    if (type === "put") {
      updateProduct(sendData);
      productsDispatch({ type: "closeEdit" });
    }
  }

  function removeProduct(productId) {
    axios
      .delete(`${BASE_URL}/products/${productId}`)
      .catch((err) => console.log(err));
    productsDispatch({
      type: "loadProducts",
      payload: products.filter((product) => product.id !== productId),
    });
  }

  function removeUser(userId) {
    deleteUser(userId);
    userRefetch();
    const newUserData = users.filter((user) => user.id !== userId);
    usersDispatch({ type: "loadUsers", payload: newUserData });
  }

  if (isLoading) {
    return (
      <div>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <>
      <Main>
        {(isProductFormOpen || isUsersFormOpen) && (
          <div className={styles.overlay} />
        )}

        <DashboardItem
          title={"products"}
          toggleAddForm={toggleProductAddForm}
          isFormOpen={isProductFormOpen}
          Form={ProductForm}
          formRef={formRef}
          handleImageChange={handleImageChange}
          send={send}
          list={products}
          dispatch={productsDispatch}
          remove={removeProduct}
        />

        <DashboardItem
          title={"users"}
          toggleAddForm={toggleUserAddForm}
          isFormOpen={isUsersFormOpen}
          Form={UserForm}
          formRef={formRef}
          handleImageChange={handleImageChange}
          send={send}
          list={users}
          dispatch={usersDispatch}
          remove={removeUser}
        />

        <div className={styles.addProductContainer}>
          <h2>Orders</h2>
        </div>
      </Main>
    </>
  );
}

export default ManageProduct;
