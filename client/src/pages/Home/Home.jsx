import Main from "../../components/Main/Main";
import ProductCard from "../../components/ProductCard/ProductCard";
import Carousel from "../../components/Carousel/Carousel";
import useProducts from "../../api/products.api";

import styles from "./Home.module.css";

function Home({ userId, refetch, cart, openSuccess }) {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <Main className={styles.container}>
      <Carousel />
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            userId={userId}
            refetch={refetch}
            cart={cart}
            openSuccess={openSuccess}
          />
        ))}
      </div>
    </Main>
  );
}

export default Home;
