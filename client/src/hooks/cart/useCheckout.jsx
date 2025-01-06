import { useDispatch, useSelector } from "react-redux";
import {
  resetCheckoutData,
  setCheckoutStep,
  setIsProcessingPayment,
  setItemsPrice,
  setLoading,
  setShippingPrice,
} from "../../actions/checkoutActions";
import { useCalculateShipping } from "../../api/orders/shipping.api";

function useCheckout(shippingValues) {
  const dispatch = useDispatch();
  const shippingPrice = useSelector((state) => state.checkout.shippingPrice);
  const checkoutStep = useSelector((state) => state.checkout.checkoutStep);
  const isProcessingPayment = useSelector(
    (state) => state.checkout.isProcessingPayment
  );
  const loading = useSelector((state) => state.checkout.loading);
  const updateOrder = useSelector((state) => state.checkout.order);
  const totalItemsPrice = useSelector(
    (state) => state.checkout.totalItemsPrice
  );

  const updateShippingPrice = (price) => dispatch(setShippingPrice(price));
  const updateCheckoutStep = (step) => dispatch(setCheckoutStep(step));
  const setProcessingPayment = (isProcessing) =>
    dispatch(setIsProcessingPayment(isProcessing));
  const setLoadingState = (isLoading) => dispatch(setLoading(isLoading));
  const setItemsTotalPrice = (price) => dispatch(setItemsPrice(price));
  const resetCheckout = () => dispatch(resetCheckoutData());

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
    setItemsTotalPrice,
    updateOrder,
    totalItemsPrice,
  };
}

export default useCheckout;
