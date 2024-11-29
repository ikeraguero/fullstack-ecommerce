import ProductLine from "./ProductItem/ProductItem";

function ProductsList({ products, removeProduct }) {
  // check for creating a hook that fetches the products

  return (
    <ul>
      {products.map((product) => (
        <ProductLine
          productName={product.name}
          productPrice={product.price}
          productStockQuantity={product.stock_quantty}
          productId={product.id}
          removeProduct={removeProduct}
          key={product.id}
        />
      ))}
    </ul>
  );
}

export default ProductsList;
