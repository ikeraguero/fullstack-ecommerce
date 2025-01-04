import { MoonLoader } from "react-spinners";
import { useProducts } from "@api/products/products.api";
import useDashboardItem from "@hooks/dashboard/useDashboardItem";
import DashboardItem from "@features/dashboard/components/DashboardItem/DashboardItem";
import { useEffect, useRef } from "react";
import useProductActions from "@hooks/products/useProductActions";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../../../actions/productFormActions";

function ProductDashboard() {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productForm);
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
      dispatch(loadProducts(initialProducts));
    }
  }, [initialProducts, dispatch]);

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
