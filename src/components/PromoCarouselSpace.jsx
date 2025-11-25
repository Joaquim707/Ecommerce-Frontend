// import React from "react";
// import Slider from "react-slick";
// import { Box } from "@mui/material";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const carouselImages = [
//   "/images/rare-rabbit.jpeg",
//   "/images/snitch-bewakoof.jpg",
//   "/images/powerlook-urban.jpeg",
//   "/images/fablestreet-globus.jpeg",
//   "/images/house-chikankari-rainbow.jpeg",
//   "/images/powerlook-urban.jpeg",
//   "/images/fablestreet-globus.jpeg",
//   "/images/house-chikankari-rainbow.jpeg",
// ];

// const PromoCarouselSpace = ({ title }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 5,
//     slidesToScroll: 5,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: { slidesToShow: 3, slidesToScroll: 3 },
//       },
//       {
//         breakpoint: 900,
//         settings: { slidesToShow: 2, slidesToScroll: 2 },
//       },
//       {
//         breakpoint: 600,
//         settings: { slidesToShow: 1, slidesToScroll: 1 },
//       },
//     ],
//   };

//   return (
//     <Box sx={{ width: "100%", mt: 6, mb: 5 }}>
//       <Box
//         sx={{
//           width: "95%",
//           ml: { xs: 2, sm: 4, md: 5 },
//           mt: { xs: 3, sm: 4, md: 6, lg: 10 },
//           fontWeight: 800,
//           fontSize: { xs: 16, sm: 20, md: 25, lg: 30 },
//           letterSpacing: 1,
//           color: "#3e4152",
//           letterSpacing: 2,
//           fontSize: "29px",
//           margin: "50px 0 79px 30px",
//           maxHeight: "80px",
//           fontWeight: 700,
//         }}
//       >
//         {title}
//       </Box>
//       <Slider {...settings}>
//         {carouselImages.map((image, index) => (
//           <Box key={index}>
//             {/* sx={{ px: 1 }} */}
//             <Box
//               component="img"
//               src={image}
//               alt={`Promo ${index + 1}`}
//               sx={{
//                 width: "100%",
//                 height: "306px",
//                 objectFit: "cover",
//                 display: "block",
//                 transition: "transform 0.4s ease, box-shadow 0.4s ease",
//                 "&:hover": {
//                   transform: "scale(1.03)",
//                   boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//                 },
//               }}
//             />
//           </Box>
//         ))}
//       </Slider>
//     </Box>
//   );
// };

// export default PromoCarouselSpace;

import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselImages = [
  "/images/rare-rabbit.jpeg",
  "/images/snitch-bewakoof.jpg",
  "/images/powerlook-urban.jpeg",
  "/images/fablestreet-globus.jpeg",
  "/images/house-chikankari-rainbow.jpeg",
  "/images/powerlook-urban.jpeg",
  "/images/fablestreet-globus.jpeg",
  "/images/house-chikankari-rainbow.jpeg",
];

const PromoCarouselSpace = ({ title }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", mt: 6, mb: 5 }}>
      <Typography
        sx={{
          width: "95%",
          ml: { xs: 2, sm: 4, md: 5 },
          mt: { xs: 3, sm: 4, md: 6, lg: 10 },
          fontWeight: 700,
          fontSize: { xs: 18, sm: 22, md: 28, lg: 30 },
          letterSpacing: 1,
          color: "#3e4152",
          mb: 4,
          margin: "50px 0 79px 30px",
        }}
      >
        {title}
      </Typography>

      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <Box key={index} sx={{ px: 1.5 }}>
            {" "}
            <Box
              component="img"
              src={image}
              alt={`Promo ${index + 1}`}
              sx={{
                width: "304px",
                height: "396px",
                objectFit: "fit",
                display: "block",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PromoCarouselSpace;
