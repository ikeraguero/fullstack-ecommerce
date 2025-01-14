import Item from "@features/dashboard/components/Item/Item";
import styles from "./ProductsList.module.css";

function ProductsList({ items, handleOpenForm, onRemove }) {
  if (!items?.length) {
    return <div>No products available</div>;
  }
  return (
    <div>
      <div className={styles.listHeader}>
        <span>Name</span>
        <span>Price</span>
        <span>Category</span>
        <span>Quantity</span>
        <span>Actions</span>
      </div>
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
    </div>
  );
}

export default ProductsList;
