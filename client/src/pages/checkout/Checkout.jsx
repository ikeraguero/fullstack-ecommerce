import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import styles from "./Checkout.module.css";
import { useOrder, usePayOrder } from "@api/orders/order.api";
import ShippingForm from "./ShippingForm/ShippingForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import useShippingForm from "@hooks/cart/useShippingForm";
import usePaymentForm from "@hooks/cart/usePaymentForm";
import OrderSummary from "@features/orders/components/OrderSummary/OrderSummary";
import { useCheckout } from "@context/CheckoutContext";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";

const PAID = "paid";

const STEPS = {
  SHIPPING: "shipping",
  PAYMENT: "payment",
};

function CheckoutShipping() {
  const params = useParams();
  const { data: order, isLoading, error } = useOrder(params.id);
  const { mutate: payOrder } = usePayOrder();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { order: updateOrder } = useCheckout();
  const [isPriceLocked, setIsPriceLocked] = useState(false);
  const initialized = useRef(false);

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
    calculateShippingPrice,
    updateCheckoutState,
  } = useCheckout();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
  }, [order, updateCheckoutState]);

  useEffect(() => {
    if (initialized.current && !isPriceLocked && order) {
      const updatedTotalPrice = order.totalPrice + shippingPrice;
      setTotalPrice(updatedTotalPrice);
    }
  }, [order, shippingPrice, isPriceLocked]);

  useEffect(() => {
    localStorage.setItem("checkoutStep", checkoutStep);
  }, [checkoutStep]);

  if (!initialized.current || isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  function onPaymentSubmit() {
    const paymentRequest = createPaymentRequest();
    sendPayment(paymentRequest);
  }

  async function onShippingSubmit() {
    if (shippingPrice === 0) {
      await calculateShippingPrice(shippingValues);
    }
    setIsPriceLocked(true);
    updateCheckoutState("checkoutStep", STEPS.PAYMENT);
    updateCheckoutState("isLoading", true);
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

    updateCheckoutState("isProcessingPayment", true);

    return {
      orderId: order?.orderId,
      email,
      paymentMethod,
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiration: cardExpiration,
      cvc: cardCvc,
      cardholderName,
    };
  }

  function sendPayment(paymentRequest) {
    const { address } = shippingValues;
    const payData = {
      ...updateOrder,
      status: PAID,
      shippingAddress: address,
      totalPrice,
    };

    paymentRequest.orderRequest = payData;
    payOrder(paymentRequest);
  }

  function handleBack() {
    if (checkoutStep === STEPS.PAYMENT)
      updateCheckoutState("checkoutStep", STEPS.SHIPPING);
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
