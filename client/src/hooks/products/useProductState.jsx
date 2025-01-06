import { useSelector } from "react-redux";

function useProductState() {
  const productFormState = useSelector((state) => state.productForm);
  return { productFormState };
}

export default useProductState;
