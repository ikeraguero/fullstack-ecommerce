import Item from "@features/dashboard/components/Item/Item";
import styles from "./ProductsList.module.css";

function ProductsList({ items, handleOpenForm, onRemove }) {
  if (!items?.length) {
    return <div>No products available</div>;
  }
  return (
    <div>
      <table className={styles.productsTable}>
        <thead>
          <tr className={styles.listHeader}>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
            <Item
              item={product}
              key={product.id}
              handleOpenForm={handleOpenForm}
              onRemove={onRemove}
              itemType="product"
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
