import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./ProductDashboard.module.css";
import { useProducts } from "@api/products/products.api";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import useProductActions from "@hooks/products/useProductActions";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";
import useProductForm from "@hooks/products/useProductForm";

function ProductDashboard() {
  const { isAddingProduct, isEditingProduct, editProduct } = useProductForm();

  const formRef = useRef();
  const isProductFormOpen = isAddingProduct || isEditingProduct;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [pendingContent, setPendingContent] = useState(null);

  const {
    data: initialProducts,
    error: productError,
    refetch: refetchProducts,
    isLoading,
  } = useProducts(currentPage, pageSize);

  const { create, update, remove } = useProductActions(
    editProduct,
    refetchProducts
  );

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
      setCurrentPage(currentPage - 1);
    }
  }

  const { content, hasPrevious, hasNext, contentNext } = initialProducts || {};
  const displayedContent = pendingContent || content;
  const productDashboard = useDashboardItem(
    displayedContent,
    productDashboardActions
  );

  useEffect(() => {
    if (!isLoading && content && currentPage > 0) {
      setPendingContent(null);
    }
  }, [isLoading, currentPage, content]);

  if (productError) {
    return <ErrorState error={productError} />;
  }

  console.log(isAddingProduct, isEditingProduct);

  return (
    <>
      <DashboardItem
        title="Products"
        data={productDashboard.data}
        onAdd={productDashboard.handleAdd}
        onEdit={productDashboard.handleEdit}
        onRemove={productDashboard.handleRemove}
        isFormOpen={isProductFormOpen}
        formRef={formRef}
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
