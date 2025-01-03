import Main from "@features/shared/components/Main/Main";
import Carousel from "@features/carousel/components/Carousel/Carousel";
import styles from "./Home.module.css";
import BestDeals from "@features/products/components/BestDeals/BestDeals";
import TopCategories from "@features/categories/components/TopCategories/TopCategories";

function Home() {
  return (
    <Main className={styles.container}>
      <Carousel className={styles.carousel} />
      <BestDeals />
      <TopCategories />
    </Main>
  );
}

export default Home;
