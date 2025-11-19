import React, { useState, useEffect } from "react";
import Banner1 from "../../Assets/Images/BANNER2.png";
import Banner2 from "../../Assets/Images/banner-1.jpg";
import Banner3 from "../../Assets/Images/BANNER3.png";
import "../../Styles/Carousel.css"; 

const banners = [Banner1, Banner2, Banner3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-banner">
        <img src={banners[currentIndex]} alt="banner" className="carousel-image"/>
      </div>
    </div>
  );
};

export default Carousel;
