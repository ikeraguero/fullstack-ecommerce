import ProductItem from "./ProductItem/ProductItem";

function ProductsList({
  products,
  dispatch,
  removeProduct,
  fetchProducts,
}) {
  // check for creating a hook that fetches the products

  return (
    <ul>
      {products.map((product) => (
        <ProductItem
          dispatch={dispatch}
          product={product}
          fetchProducts={fetchProducts}
          removeProduct={removeProduct}
          key={product.id}
        />
      ))}
    </ul>
  );
}

export default ProductsList;
