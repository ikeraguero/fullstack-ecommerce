import ProductItem from "./ProductItem/ProductItem";

function ProductsList({ products, dispatch, remove }) {

  return (
    <ul>
      {products?.map((product) => (
        <ProductItem
          dispatch={dispatch}
          product={product}
          removeProduct={remove}
          key={product.id}
        />
      ))}
    </ul>
  );
}

export default ProductsList;
