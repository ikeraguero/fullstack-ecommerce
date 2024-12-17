import { useEffect, useRef } from "react";
import axios from "axios";

import { useProductFormContext } from "../../hooks/useProductsFormContext";

import { BASE_URL } from "../../config/config";
import useProducts, {
  useCreateProduct,
  useUpdateProduct,
} from "../../api/products.api";
import Main from "../../components/Main/Main";
import ProductsList from "../../components/ProductsList/ProductsList";
import ProductForm from "../../components/ProductForm/ProductForm";
import UserList from "../../components/UserList/UserList";

import styles from "./ManageProduct.module.css";
import { useDeleteUsers, useUsers } from "../../api/user.api";
import { useUsersFormContext } from "../../hooks/useUsersFormContext";

function ManageProduct() {
  const { state: productsState, dispatch: productsDispatch } =
    useProductFormContext();
  const { state: usersState, dispatch: usersDispatch } = useUsersFormContext();
  const { data: initialProducts, refetch, error, isLoading } = useProducts();
  const { data: initialUsers, refetch: userRefetch } = useUsers();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteUser } = useDeleteUsers();

  const {
    products,
    image,
    isAdding,
    isEditing,
    editProduct,
    productDescription,
  } = productsState;

  const { users } = usersState;
  const formRef = useRef();

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

  function toggleAddForm() {
    productsDispatch({ type: "toggleAdd" });
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
      for (const [key, value] of sendData.entries()) {
        console.log(`${key}:`, value);
      }
      createProduct(sendData);
      productsDispatch({ type: "toggleAdd" });
    }

    if (type === "put") {
      for (const [key, value] of sendData.entries()) {
        console.log(`${key}:`, value);
      }
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <>
      <Main>
        {(isAdding || isEditing) && <div className={styles.overlay} />}

        <div className={styles.addProductContainer}>
          <h2>Products</h2>
          <span onClick={toggleAddForm} className={styles.openAddProductButton}>
            Add Product +
          </span>
          <ProductForm
            formRef={formRef}
            handleImageChange={handleImageChange}
            send={send}
          />
          {products?.length === 0 && (
            <div className={styles.emptyMessage}>
              There are no products registered!
            </div>
          )}
          <ProductsList
            products={products}
            dispatch={productsDispatch}
            removeProduct={removeProduct}
            refetch={refetch}
          />
        </div>

        <div className={styles.addProductContainer}>
          <h2>Users</h2>
          <span onClick={toggleAddForm} className={styles.openAddProductButton}>
            Add User +
          </span>
          <ProductForm
            formRef={formRef}
            handleImageChange={handleImageChange}
            send={send}
          />
          {users?.length === 0 && (
            <div className={styles.emptyMessage}>
              There are no products registered!
            </div>
          )}

          <UserList users={users} removeUser={removeUser} />
        </div>

        <div className={styles.addProductContainer}>
          <h2>Orders</h2>
          <ProductForm
            formRef={formRef}
            handleImageChange={handleImageChange}
            send={send}
          />
          {products?.length === 0 && (
            <div className={styles.emptyMessage}>
              There are no products registered!
            </div>
          )}
          <ProductsList
            products={products}
            dispatch={productsDispatch}
            removeProduct={removeProduct}
            refetch={refetch}
          />
        </div>
      </Main>
    </>
  );
}

export default ManageProduct;
