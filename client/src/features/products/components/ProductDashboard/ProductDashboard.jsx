import styles from "./ProductDashboard.module.css";
// import { MoonLoader } from "react-spinners";
import { useProducts } from "@api/products/products.api";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import { useEffect, useRef, useState } from "react";
import useProductActions from "@hooks/products/useProductActions";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../../../actions/productFormActions";

function ProductDashboard() {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productForm);
  const { isAddingProduct, isEditingProduct, editProduct } = productsState;

  const formRef = useRef();
  const isProductFormOpen = isAddingProduct || isEditingProduct;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const {
    data: initialProducts,
    error: productError,
    refetch: refetchProducts,
    isLoading, // Capture the loading state
  } = useProducts(currentPage, pageSize);

  const { create, update, remove } = useProductActions(
    editProduct,
    refetchProducts
  );

  const productDashboardActions = {
    create,
    edit: update,
    remove,
  };

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
    if (
      initialProducts &&
      initialProducts.content &&
      initialProducts.content.length > 0
    ) {
      dispatch(loadProducts(initialProducts.content));
    }
  }, [initialProducts, dispatch]);

  const { content, hasPrevious, hasNext } = initialProducts || {};

  const productDashboard = useDashboardItem(content, productDashboardActions);

  if (productError) return <div>Error loading data</div>;

  return (
    <>
      <DashboardItem
        title="Products"
        data={productDashboard.data}
        onAdd={productDashboardActions.create}
        onEdit={productDashboardActions.edit}
        onRemove={productDashboardActions.remove}
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
