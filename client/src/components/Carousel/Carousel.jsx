// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Carousel.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Carousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      style={{ width: "100%", height: "24.2rem", marginBottom: "2.6rem" }}
    >
      <SwiperSlide slot="container-end">
        <img
          src="../../public/img4.jpg"
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
