import ProductItem from "./ProductItem/ProductItem";

function ProductsList({ products, handleOpenForm, onRemove }) {
  console.log(products);
  return (
    <ul>
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
