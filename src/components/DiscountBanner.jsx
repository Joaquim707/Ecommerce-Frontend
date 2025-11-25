// import { Box } from "@mui/material";

// const DiscountBanner = () => {
//   return (
//     <Box sx={{ width: "100%", mt: 6, mb: 5 }}>
//       <a href="#" style={{ display: "block", width: "90%" }}>
//         <Box
//           component="img"
//           src="/Discount.png"
//           alt="Discount"
//           sx={{
//             width: "100%",
//             height: "auto",
//             maxHeight: { xs: 180, sm: 250, md: 350 },
//             objectFit: "cover",
//             display: "block",
//           }}
//         />
//       </a>
//     </Box>
//   );
// };

// export default DiscountBanner;

import { Box } from "@mui/material";

const DiscountBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 6,
        mb: 6,
        display: "flex",
        justifyContent: "center", // centers the banner horizontally
      }}
    >
      <a
        href="#"
        style={{
          display: "block",
          width: "95%", // fluid width for responsiveness
          maxWidth: "13120px", // keeps it neat on large screens
          overflow: "hidden", // hides overflow during hover zoom
          borderRadius: "12px",
        }}
      >
        <Box
          component="img"
          src="/Discount.png"
          alt="Discount Banner"
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: { xs: 180, sm: 250, md: 350 }, // responsive height
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            },
          }}
        />
      </a>
    </Box>
  );
};

export default DiscountBanner;
