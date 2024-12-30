import Item from "../Item/Item";
import styles from "./ProductsList.module.css";

function ProductsList({ items, handleOpenForm, onRemove }) {
  if (!items?.length) {
    return <div>No products available</div>;
  }
  return (
    <ul className={styles.productsList}>
      {items?.map((product) => (
        <Item
          item={product}
          key={product.id}
          handleOpenForm={handleOpenForm}
          onRemove={onRemove}
          itemType="product"
        />
      ))}
    </ul>
  );
}

export default ProductsList;
