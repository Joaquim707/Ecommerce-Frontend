import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const images = [
    "/banners/banner2.png",
    "/banners/banner3.png",
    "/banners/banner4.png",
    "/banners/banner5.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
        mb: 11.5, // ✅ adds margin below the dots
        position: "relative",
        ".slick-dots": {
          bottom: "-35px", // ✅ move dots lower
        },
        ".slick-dots li button:before": {
          color: "#bcbcbc",
          fontSize: "8px",
          fontWeight: 400,
        },
        ".slick-dots li.slick-active button:before": {
          color: "#000",
          opacity: 0.9,
        },
        ".slick-slide": {
          outline: "none",
        },
      }}
    >
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box key={index}>
            <Box
              component="img"
              src={img}
              alt={`slide-${index}`}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 1,
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
