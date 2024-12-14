import ProductItem from "./ProductItem/ProductItem";

function ProductsList({ products, dispatch, removeProduct, refetch }) {
  return (
    <ul>
      {products?.map((product) => (
        <ProductItem
          dispatch={dispatch}
          product={product}
          refetch={refetch}
          removeProduct={removeProduct}
          key={product.id}
        />
      ))}
    </ul>
  );
}

export default ProductsList;
