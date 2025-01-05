import { MoonLoader } from "react-spinners";
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

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10); // Default page size

  // Fetch products with pagination
  const {
    data: initialProducts,
    error: productError,
    isLoading: productsLoading,
    refetch: refetchProducts,
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

  // Handle Next Page click
  function handleNext() {
    if (initialProducts && initialProducts.hasNext) {
      setCurrentPage(currentPage + 1); // Change current page for next
    }
  }

  // Handle Previous Page click
  function handlePrevious() {
    if (initialProducts && initialProducts.hasPrevious) {
      setCurrentPage(currentPage - 1); // Change current page for previous
    }
  }

  // Dispatch initial products
  useEffect(() => {
    if (
      initialProducts &&
      initialProducts.content &&
      initialProducts.content.length > 0
    ) {
      dispatch(loadProducts(initialProducts.content));
    }
  }, [initialProducts, dispatch]);

  // Destructure pagination response
  const { content, hasPrevious, hasNext, totalPages } = initialProducts || {};

  // Generate dashboard items
  const productDashboard = useDashboardItem(content, productDashboardActions);

  if (productsLoading) return <MoonLoader />;
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

      <div>
        {hasPrevious && <button onClick={handlePrevious}>Previous</button>}
        {hasNext && <button onClick={handleNext}>Next</button>}
      </div>

      <p>
        Page {currentPage + 1} of {totalPages}
      </p>
    </>
  );
}

export default ProductDashboard;
