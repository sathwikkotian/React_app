// Carousel.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";

// Import images
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import grid1 from "../assets/grid1.jpg";
import grid2 from "../assets/grid2.jpg";
import grid3 from "../assets/grid3.jpg";
import grid4 from "../assets/grid4.jpg";
import grid5 from "../assets/grid5.jpg";
import grid6 from "../assets/grid6.jpg";

const gridItems = [
  { image: grid1, brand: "Sneakers", description: "Trending Footwear", price: "STARTING 4000" },
  { image: grid2, brand: "SANDALS", description: "International Picks", discount: "Min. 50% OFF" },
  { image: grid3, brand: "METRO", description: "Trending Footwear", price: "STARTING 1999-799" },
  { image: grid4, brand: "MOCHIA", description: "Stylish Footwear", price: "STARTING 1999-799" },
  { image: grid5, brand: "Trolley Bags", description: null, price: "STARTING 7499-2399" },
  { image: grid6, brand: "Hand Bags", description: null, price: "STARTING 7999-1999" },
];

const Carousel = () => {
  const navigate = useNavigate();

  const handleImageClick = (index) => {
    if (index >= 0 && index <= 3) {
      navigate("/men");
    } else if (index >= 4 && index <= 5) {
      navigate("/women");
    }
  };

  return (
    <div className="carousel-container">
      {/* Main Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {[image1, image2, image3, image4, image5, image6].map((image, index) => (
          <SwiperSlide key={index} onClick={() => handleImageClick(index)}>
            <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
          </SwiperSlide>
        ))}
      </Swiper>
{/* Promo Banner Section */}
<div className="promo-banner">
  <img src={require("../assets/BANNER.jpg")} alt="Promo Banner" className="banner-image" />
</div>



      {/* Products Grid Section */}
      <div className="grid-section">
        {gridItems.map((item, index) => (
          <div key={index} className="grid-item">
            <img src={item.image} alt={`Grid ${index + 1}`} className="grid-image" />
            <div className="grid-details">
              <div className="grid-brand">{item.brand}</div>
              <div className="grid-description">{item.description}</div>
              <div className="grid-price-discount">
                {item.price && <span className="grid-price">{item.price}</span>}
                {item.discount && <span className="grid-discount">{item.discount}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;