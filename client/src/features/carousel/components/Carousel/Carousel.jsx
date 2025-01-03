// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Carousel.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Carousel() {
  const SPACE_BETWEEN_SLIDES = 50;
  const SLIDER_PER_VIEW = 1;
  const AUTOPLAY_DELAY = 3500;

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={SPACE_BETWEEN_SLIDES}
      slidesPerView={SLIDER_PER_VIEW}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: false,
      }}
      style={{
        width: "100%",
        height: "24.2rem",
        marginBottom: "2.6rem",
        zIndex: -1,
      }}
    >
      <SwiperSlide slot="container-end">
        <img
          src="../../public/img5.jpg"
          alt=""
          className={styles.carouselImg}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="../../public/img2.jpg"
          className={styles.carouselImg}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="../../public/img3.jpg"
          className={styles.carouselImg}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="../../public/img1.jpg"
          className={styles.carouselImg}
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Carousel;
