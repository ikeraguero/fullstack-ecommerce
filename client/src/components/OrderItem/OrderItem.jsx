import styles from "./OrderItem.module.css";

function OrderItem({
  productName,
  quantity,
  totalPrice,
  imageData,
  imageType,
}) {
  console.log(imageData, imageType);
  return (
    <>
      <div className={styles.order}>
        <span>
          <img src={`data:${imageType};base64,${imageData}`} alt="" />
        </span>
        <span>{productName}</span>
        <span>
          {quantity < 9 ? `0${quantity}` : quantity}{" "}
          {quantity > 1 ? "items" : "item"}
        </span>
        <span>${totalPrice}</span>
      </div>
      <span></span>
    </>
  );
}

export default OrderItem;
