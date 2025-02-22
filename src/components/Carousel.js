import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Carousel.css'; // Add custom styles

import img1 from '../assets/image1.jpg';
import img2 from '../assets/image2.jpg';
import img3 from '../assets/image3.jpg';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div><img src={img1} alt="Slide 1" className="carousel-image" /></div>
        <div><img src={img2} alt="Slide 2" className="carousel-image" /></div>
        <div><img src={img3} alt="Slide 3" className="carousel-image" /></div>
      </Slider>
    </div>
  );
};

export default Carousel;
