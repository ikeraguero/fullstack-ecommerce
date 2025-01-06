import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./ProductDashboard.module.css";
import { useProducts } from "@api/products/products.api";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import useProductActions from "@hooks/products/useProductActions";
import { loadProducts } from "../../../../actions/productFormActions";
import useProductState from "@hooks/products/useProductState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";

function ProductDashboard() {
  const dispatch = useDispatch();
  const { productFormState } = useProductState();
  const { isAddingProduct, isEditingProduct, editProduct } = productFormState;

  const formRef = useRef();
  const isProductFormOpen = isAddingProduct || isEditingProduct;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

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
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevious() {
    if (initialProducts && initialProducts.hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    if (initialProducts?.content?.length) {
      dispatch(loadProducts(initialProducts.content));
    }
  }, [initialProducts, dispatch]);

  const { content, hasPrevious, hasNext } = initialProducts || {};
  const productDashboard = useDashboardItem(content, productDashboardActions);

  if (productError) {
    return <ErrorState error={productError} />;
  }

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
