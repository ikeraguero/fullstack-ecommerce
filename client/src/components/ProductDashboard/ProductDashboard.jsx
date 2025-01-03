import { MoonLoader } from "react-spinners";
import { useProducts } from "../../api/products/products.api";
import useDashboardItem from "../../hooks/useDashboardItem";
import { useProductFormContext } from "../../hooks/useProductsFormContext";
import DashboardItem from "../DashboardItem/DashboardItem";
import { useEffect, useRef } from "react";
import useProductActions from "../../hooks/useProductActions";

function ProductDashboard() {
  const { state: productsState, dispatch: productsDispatch } =
    useProductFormContext();
  const { isAddingProduct, isEditingProduct, editProduct } = productsState;

  const formRef = useRef();
  const isProductFormOpen = isAddingProduct || isEditingProduct;

  const {
    data: initialProducts,
    error: productError,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useProducts();

  const { create, update, remove } = useProductActions(
    editProduct,
    refetchProducts
  );

  const productDashboardActions = {
    create,
    edit: update,
    remove,
  };

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      productsDispatch({ type: "loadProducts", payload: initialProducts });
    }
  }, [initialProducts, productsDispatch]);

  const productDashboard = useDashboardItem(
    initialProducts,
    productDashboardActions
  );

  if (productsLoading) return <MoonLoader />;
  if (productError) return <div>Error loading data</div>;

  return (
    <DashboardItem
      title="Products"
      data={productDashboard.data}
      onAdd={productDashboardActions.create}
      onEdit={productDashboardActions.edit}
      onRemove={productDashboardActions.remove}
      isFormOpen={isProductFormOpen}
      formRef={formRef}
    />
  );
}

export default ProductDashboard;
