import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Checkout.module.css";
import { useOrder, usePayOrder } from "@api/orders/order.api";
import ShippingForm from "./ShippingForm/ShippingForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import useShippingForm from "@hooks/cart/useShippingForm";
import usePaymentForm from "@hooks/cart/usePaymentForm";
import OrderSummary from "@features/orders/components/OrderSummary/OrderSummary";
import useCheckout from "@hooks/cart/useCheckout";

function CheckoutShipping() {
  const params = useParams();
  const { data: order } = useOrder(params.id);
  const { mutate: payOrder } = usePayOrder();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { updateOrder } = useCheckout();
  const [isPriceLocked, setIsPriceLocked] = useState(false);

  const STEPS = {
    SHIPPING: "shipping",
    PAYMENT: "payment",
  };

  const {
    values: shippingValues,
    handleChange: handleShippingChange,
    handleSubmit: handleShippingSubmit,
    handleBlur: handleShippingBlur,
    errors: shippingErrors,
    touched: shippingTouched,
  } = useShippingForm(onShippingSubmit);

  const {
    values: paymentValues,
    handleChange: handlePaymentChange,
    handleSubmit: handlePaymentSubmit,
    handleBlur: handlePaymentBlur,
    errors: paymentErrors,
    touched: paymentTouched,
  } = usePaymentForm(onPaymentSubmit);

  const {
    shippingPrice,
    checkoutStep,
    isProcessingPayment,
    loading,
    updateShippingPrice,
    updateCheckoutStep,
    setProcessingPayment,
    setLoadingState,
    calculateShippingPrice,
  } = useCheckout(shippingValues);

  const updateLocalStorage = () => {
    const storedShippingPrice = localStorage.getItem("shippingPrice");
    const storedTotalPrice = localStorage.getItem("totalPrice");
    const storedOrderId = localStorage.getItem("orderId");

    if (
      storedShippingPrice &&
      storedTotalPrice &&
      storedOrderId === order?.orderId
    ) {
      updateShippingPrice(Number(storedShippingPrice));
      setTotalPrice(Number(storedTotalPrice));
      return;
    }
    updateShippingPrice(0);
  };

  useEffect(() => {
    updateLocalStorage();
  }, []);

  useEffect(
    function () {
      if (order && !isPriceLocked) {
        const updatedTotalPrice = order.totalPrice + shippingPrice;
        setTotalPrice(updatedTotalPrice);
        localStorage.setItem("orderId", order?.orderId);
        localStorage.setItem("shippingPrice", shippingPrice);
        localStorage.setItem("totalPrice", updatedTotalPrice);
      }
    },
    [order, shippingPrice]
  );

  if (!updateOrder) return <div>Loading...</div>;

  function onPaymentSubmit() {
    const paymentRequest = createPaymentRequest();
    sendPayment(paymentRequest);
  }

  async function onShippingSubmit() {
    if (shippingPrice === 0) {
      await calculateShippingPrice();
    }
    setIsPriceLocked(true);
    updateCheckoutStep(STEPS.PAYMENT);
    setLoadingState(false);
  }

  function createPaymentRequest() {
    const {
      paymentMethod,
      email,
      cardNumber,
      cardCvc,
      cardExpiration,
      cardholderName,
    } = paymentValues;

    setProcessingPayment(true);

    const paymentRequest = {
      orderId: order?.orderId,
      email,
      paymentMethod,
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiration: cardExpiration,
      cvc: cardCvc,
      cardholderName,
    };

    return paymentRequest;
  }

  function sendPayment(paymentRequest) {
    const { address } = shippingValues;
    const payData = {
      ...updateOrder,
      status: "paid",
      shippingAddress: address,
      totalPrice,
    };

    paymentRequest.orderRequest = payData;

    payOrder(paymentRequest);
  }

  function handleBack() {
    if (checkoutStep === STEPS.PAYMENT) updateCheckoutStep(STEPS.SHIPPING);
    if (checkoutStep === STEPS.SHIPPING) navigate("/cart");
  }
  return (
    <>
      <div className={styles.cartMainContainer}>
        <div className={styles.cartLeftSide}>
          {checkoutStep === STEPS.SHIPPING && (
            <ShippingForm
              values={shippingValues}
              handleChange={handleShippingChange}
              handleBack={handleBack}
              handleCalculateShipping={calculateShippingPrice}
              handleBlur={handleShippingBlur}
              errors={shippingErrors}
              touched={shippingTouched}
            />
          )}
          {checkoutStep === STEPS.PAYMENT && (
            <PaymentForm
              values={paymentValues}
              handleChange={handlePaymentChange}
              handleBack={handleBack}
              handleBlur={handlePaymentBlur}
              errors={paymentErrors}
              touched={paymentTouched}
            />
          )}
        </div>
        <OrderSummary
          order={order}
          isLoading={loading}
          shippingPrice={shippingPrice}
          totalPrice={totalPrice}
          checkoutStep={checkoutStep}
          isProcessingPayment={isProcessingPayment}
          handlePaymentSubmit={handlePaymentSubmit}
          handleShippingSubmit={handleShippingSubmit}
        />
      </div>
    </>
  );
}

export default CheckoutShipping;
