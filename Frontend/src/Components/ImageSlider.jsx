import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "../Components/Styles/ImageSlider.css";

const ImageSlider = () => {
  const slides = [
    {
      image: "/slider-1.jpg",
      title: "Delicious Food",
      subtitle: "Fresh ingredients, amazing taste",
    },
    {
      image: "/slider-3.jpg",
      title: "Fast Delivery",
      subtitle: "Get your food delivered in minutes",
    },
    {
      image: "/slider-2.jpg",
      title: "Best Restaurants",
      subtitle: "Discover top-rated dining experiences",
    },
  ];

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        speed={1000}
        className="custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-wrapper">
              <img
                src={slide.image}
                alt={slide.title}
                className="slider-image"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
