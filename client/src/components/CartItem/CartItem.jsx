function CartItem({
  name,
  price,
  quantity,
  category_name,
  image_data,
  image_type,
}) {
  const totalPrice = price * quantity;
  return (
    <div>
      <div className="image"></div>
      <div className="name">Name</div>
      <div className="totalPrice">{totalPrice}</div>
    </div>
  );
}

export default CartItem;
