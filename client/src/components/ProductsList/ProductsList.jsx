import ProductItem from "./ProductItem/ProductItem";

function ProductsList({ products, removeProduct, fetchProducts }) {
  // check for creating a hook that fetches the products

  return (
    <ul>
      {products.map((product) => (
        <ProductItem
          productName={product.name}
          productPrice={product.price}
          productStockQuantity={product.stock_quantity}
          productCategory={product.category_id}
          productImageId={product.image_id}
          productId={product.id}
          fetchProducts={fetchProducts}
          removeProduct={removeProduct}
          key={product.id}
        />
      ))}
    </ul>
  );
}

export default ProductsList;
