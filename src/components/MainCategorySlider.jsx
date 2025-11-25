// import React, { useEffect, useState } from "react";
// import { Box, Fade, Stack, IconButton } from "@mui/material";

// const MainCategorySlider = ({ slug }) => {
//   const [index, setIndex] = useState(0);

//   const sliderImages = {
//     men: [
//       "/Mainbanner/men1.png",
//       "/Mainbanner/men2.png",
//       "/Mainbanner/men3.png",
//     ],
//     women: [
//       "/Mainbanner/women1.png",
//       "/Mainbanner/women2.png",
//       "/Mainbanner/women3.png",
//     ],
//     kids: [
//       "/Mainbanner/kids1.png",
//       "/Mainbanner/kids2.png",
//       "/Mainbanner/kids3.png",
//     ],
//     default: ["/Mainbanner/men4.png"],
//   };

//   const images = sliderImages[slug] || sliderImages.default;

//   // Auto-slide
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3500);
//     return () => clearInterval(timer);
//   }, [images.length]);

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         maxWidth: "1920px",
//         mx: "auto",
//         aspectRatio: "3 / 1", // ✅ Ensures consistent banner height scaling
//         overflow: "hidden",
//         mb: { xs: 2, sm: 3, md: 4 },
//         backgroundColor: "#f9f9f9",
//         mt: 5.5,
//       }}
//     >
//       {images.map((src, i) => (
//         <Fade in={i === index} timeout={800} key={i}>
//           <Box
//             component="img"
//             src={src}
//             alt={`${slug}-banner-${i}`}
//             sx={{
//               width: "100%",
//               height: "52vh",
//               objectFit: "fit", // ✅ Ensures full coverage
//               objectPosition: "center", // ✅ Keeps image centered (no cut-off sides)
//               position: "absolute",
//               top: 0,
//               left: 0,
//               opacity: i === index ? 1 : 0,
//               transition: "opacity 0.8s ease-in-out",
//             }}
//           />
//         </Fade>
//       ))}

//       {/* Dots */}
//       <Stack
//         direction="row"
//         spacing={{ xs: 0.8, sm: 1 }}
//         sx={{
//           position: "absolute",
//           bottom: { xs: 8, sm: 14 },
//           left: "50%",
//           transform: "translateX(-50%)",
//           zIndex: 10,
//         }}
//       >
//         {images.map((_, i) => (
//           <IconButton
//             key={i}
//             onClick={() => setIndex(i)}
//             sx={{
//               width: { xs: 8, sm: 10, md: 12 },
//               height: { xs: 8, sm: 10, md: 12 },
//               borderRadius: "50%",
//               p: 0,
//               bgcolor: i === index ? "primary.main" : "grey.400",
//               "&:hover": {
//                 bgcolor: i === index ? "primary.main" : "grey.500",
//               },
//               transition: "background-color 0.3s ease",
//             }}
//           />
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default MainCategorySlider;

import React, { useEffect, useState } from "react";
import { Box, Fade, Stack, IconButton } from "@mui/material";

const MainCategorySlider = ({ slug }) => {
  const [index, setIndex] = useState(0);

  const sliderImages = {
    men: [
      "/Mainbanner/men1.png",
      "/Mainbanner/men2.png",
      "/Mainbanner/men3.png",
    ],
    women: [
      "/Mainbanner/women1.png",
      "/Mainbanner/women2.png",
      "/Mainbanner/women3.png",
    ],
    kids: [
      "/Mainbanner/kids1.png",
      "/Mainbanner/kids2.png",
      "/Mainbanner/kids3.png",
    ],
    default: ["/Mainbanner/men4.png"],
  };

  const images = sliderImages[slug] || sliderImages.default;

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1920px",
        overflow: "hidden",
        mb: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#f9f9f9",
        mt: 5.5,
      }}
    >
      {/* Image wrapper (relative so fades stack) */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        {images.map((src, i) => (
          <Fade in={i === index} timeout={800} key={i}>
            <Box
              component="img"
              src={src}
              alt={`${slug}-banner-${i}`}
              sx={{
                width: "100%",
                height: { xs: "32vh", sm: "40vh", md: "50vh" }, // responsive height
                objectFit: "cover",
                objectPosition: "center",
                position: i === index ? "relative" : "absolute",
                top: 0,
                left: 0,
                opacity: i === index ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            />
          </Fade>
        ))}
      </Box>

      {/* Dots BELOW the image */}
      <Stack
        direction="row"
        spacing={{ xs: 0.8, sm: 1 }}
        justifyContent="center"
        sx={{
          mt: { xs: 1, sm: 1.5 }, // distance from image bottom
        }}
      >
        {images.map((_, i) => (
          <IconButton
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: { xs: 4, sm: 5, md: 6 },
              height: { xs: 4, sm: 5, md: 6 },
              borderRadius: "50%",
              p: 0,
              bgcolor: i === index ? "primary.main" : "grey.400",
              "&:hover": {
                bgcolor: i === index ? "primary.main" : "grey.500",
              },
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default MainCategorySlider;
