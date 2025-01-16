import { useEffect, useMemo, useState } from "react";

import styles from "./ProductDashboard.module.css";
import { useProducts } from "@api/products/products.api";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import useProductActions from "@hooks/products/useProductActions";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";
import { useProductForm } from "@context/useProductFormContext";

function ProductDashboard() {
  const {
    isAddingProduct,
    isEditingProduct,
    isDeletingProduct,
    toggleDeleteProduct,
    deleteProductId,
  } = useProductForm();

  const isProductFormOpen = isAddingProduct || isEditingProduct;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [pendingContent, setPendingContent] = useState(null);
  const PRODUCTS = "Products";

  const {
    data: initialProducts,
    error: productError,
    isLoading,
  } = useProducts(currentPage, pageSize);

  const { create, update, remove } = useProductActions();

  const productDashboardActions = useMemo(
    () => ({
      create,
      edit: update,
      remove,
    }),
    [create, update, remove]
  );

  function handleNext() {
    if (initialProducts && initialProducts.hasNext) {
      setPendingContent(contentNext);
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevious() {
    if (initialProducts && initialProducts.hasPrevious) {
      setPendingContent(contentPrevious);
      setCurrentPage(currentPage - 1);
    }
  }

  const { content, hasPrevious, hasNext, contentNext, contentPrevious } =
    initialProducts || {};

  const displayedContent = pendingContent || content;

  const productDashboard = useDashboardItem(
    displayedContent,
    productDashboardActions
  );

  function handleDelete() {
    productDashboard.handleRemove(deleteProductId);
  }

  function handleCancel() {
    toggleDeleteProduct();
  }

  useEffect(() => {
    if (!isLoading && content && currentPage > 0) {
      setPendingContent(null);
    }
  }, [isLoading, currentPage, content]);

  if (productError) {
    return <ErrorState error={productError} />;
  }

  return (
    <>
      <div
        className={isDeletingProduct ? styles.confirmationModal : styles.hidden}
      >
        <h1 className={styles.confirmationTitle}>
          Are you sure you want to delete this item?
        </h1>
        <div className={styles.confirmationButtons}>
          <button className={styles.confirmationButton} onClick={handleCancel}>
            Back
          </button>
          <button className={styles.confirmationButton} onClick={handleDelete}>
            Confirm
          </button>
        </div>
      </div>
      <DashboardItem
        title={PRODUCTS}
        data={productDashboard.data}
        onAdd={productDashboard.handleAdd}
        onEdit={productDashboard.handleEdit}
        onRemove={productDashboard.handleRemove}
        isFormOpen={isProductFormOpen}
      />

      <div className={styles.paginationButtons}>
        <button
          onClick={handlePrevious}
          className={
            !isLoading && !hasPrevious ? styles.hidden : styles.paginationButton
          }
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
          Page {currentPage}
        </button>
        <button
          onClick={handleNext}
          className={
            !isLoading && !hasNext ? styles.hidden : styles.paginationButton
          }
        >
          Page {currentPage + 2}
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    </>
  );
}

export default ProductDashboard;
