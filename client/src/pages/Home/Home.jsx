import Main from "../../components/Main/Main";
import ProductCard from "../../components/ProductCard/ProductCard";
import Carousel from "../../components/Carousel/Carousel";
import useProducts from "../../api/products.api";
import styles from "./Home.module.css";
import { MoonLoader } from "react-spinners";
import { Link } from "react-router-dom";

function Home({ userId, refetch, cart, openSuccess }) {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <Main className={styles.container}>
      <Carousel className={styles.carousel} />
      <section className={styles.bestDeals}>
        <div className={styles.bestDealsHeader}>
          <h2>
            Grab the best deals on{" "}
            <span className={styles.bestDealCategory}>Smartphones</span>
          </h2>
          <div className={styles.bestDealsViewAll}>
            <span>View All</span>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Link
              to={`products/${product.id}`}
              key={product.id}
              className={styles.productLink}
            >
              <ProductCard
                {...product}
                userId={userId}
                refetch={refetch}
                cart={cart}
                openSuccess={openSuccess}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.topCategories}>
        <div className={styles.topCategoriesHeader}>
          <h2>
            Shop From{" "}
            <span className={styles.topCategoriesTitle}>Top Categories</span>
          </h2>
        </div>
      </section>
    </Main>
  );
}

export default Home;
