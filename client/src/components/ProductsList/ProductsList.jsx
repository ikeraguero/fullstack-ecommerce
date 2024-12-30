import ProductItem from "./ProductItem/ProductItem";
import styles from "./ProductsList.module.css";

function ProductsList({ products, handleOpenForm, onRemove }) {
  return (
    <ul className={styles.productsList}>
      {products?.map((product) => (
        <ProductItem
          product={product}
          key={product.id}
          handleOpenForm={handleOpenForm}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

export default ProductsList;
