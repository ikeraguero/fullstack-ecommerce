import { useDispatch, useSelector } from "react-redux";
import {
  setCheckoutStep,
  setIsProcessingPayment,
  setLoading,
  setShippingPrice,
} from "../../actions/CheckoutActions";
import { useCalculateShipping } from "../../api/orders/shipping.api";

function useCheckout(shippingValues) {
  const dispatch = useDispatch();
  const shippingPrice = useSelector((state) => state.checkout.shippingPrice);
  const checkoutStep = useSelector((state) => state.checkout.checkoutStep);
  const isProcessingPayment = useSelector(
    (state) => state.checkout.isProcessingPayment
  );
  const loading = useSelector((state) => state.checkout.loading);
  const updateShippingPrice = (price) => dispatch(setShippingPrice(price));
  const updateCheckoutStep = (step) => dispatch(setCheckoutStep(step));
  const setProcessingPayment = (isProcessing) =>
    dispatch(setIsProcessingPayment(isProcessing));
  const setLoadingState = (isLoading) => dispatch(setLoading(isLoading));
  const resetCheckout = () => dispatch({ type: "RESET" });

  const { mutateAsync: calculateShipping } = useCalculateShipping();

  async function calculateShippingPrice() {
    const { postalCode } = shippingValues;
    const data = {
      postalCode,
    };

    setLoadingState(true);
    const { shippingPrice } = await calculateShipping(data);
    updateShippingPrice(shippingPrice);
    setLoadingState(false);
  }

  return {
    shippingPrice,
    checkoutStep,
    isProcessingPayment,
    loading,
    updateShippingPrice,
    updateCheckoutStep,
    setProcessingPayment,
    setLoadingState,
    calculateShippingPrice,
    resetCheckout,
  };
}

export default useCheckout;
