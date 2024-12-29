import Main from "../../components/Main/Main";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./Home.module.css";
import BestDeals from "../../components/BestDeals/BestDeals";
import TopCategories from "../../components/TopCategories/TopCategories";

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
