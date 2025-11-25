// import React from "react";
// import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";

// const brandDeals = [
//   {
//     name: "U.S. Polo Assn.",
//     image: "/Branddeals/USP.png",
//     offer: "30–60% Off",
//   },
//   {
//     name: "Levi’s",
//     image: "/Branddeals/Levis.png",
//     offer: "Min. 40% Off",
//   },
//   {
//     name: "Tommy Hilfiger",
//     image: "/Branddeals/Tommy.png",
//     offer: "30–50% Off",
//   },
//   {
//     name: "United Colors of Benetton",
//     image: "/Branddeals/united-colors.png",
//     offer: "40–70% Off",
//   },
//   {
//     name: "Crocs",
//     image: "/Branddeals/Crocs.png",
//     offer: "Up to 50% Off",
//   },
//   {
//     name: "Puma",
//     image: "/Branddeals/Puma.png",
//     offer: "30–60% Off",
//   },
// ];

// const BrandDealsGrid = () => {
//   return (
//     <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 6 }, backgroundColor: "#fff" }}>
//       <Typography
//         variant="h5"
//         sx={{
//           fontWeight: 700,
//           mb: 4,
//           textAlign: "left",
//           color: "#222",
//           letterSpacing: 1,
//         }}
//       >
//         Biggest Deals On Top Brands
//       </Typography>

//       <Box
//         sx={{
//           width: "100vw",
//           position: "relative",
//           left: "50%",
//           right: "50%",
//           ml: "-50vw",
//           mr: "-50vw",
//           backgroundColor: "#fff",
//           py: 6,
//         }}
//       >
//         <Grid
//           container
//           spacing={3}
//           justifyContent="center"
//           sx={{
//             maxWidth: "1400px", // center content and control max width
//             mx: "auto",
//             px: { xs: 2, sm: 4, md: 6 },
//           }}
//         >
//           {brandDeals.map((brand, index) => (
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={4} // ✅ 3 per row for medium and up
//               key={index}
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Card
//                 sx={{
//                   width: "100%",
//                   maxWidth: 380,
//                   height: 420, // ✅ fixed height
//                   borderRadius: 3,
//                   boxShadow: 2,
//                   textAlign: "center",
//                   cursor: "pointer",
//                   overflow: "hidden",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-5px)",
//                     boxShadow: 5,
//                   },
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={brand.image}
//                   alt={brand.name}
//                   sx={{
//                     width: "100%",
//                     height: 320,
//                     objectFit: "cover",
//                     transition: "transform 0.5s ease",
//                     "&:hover": { transform: "scale(1.05)" },
//                   }}
//                 />

//                 <Box sx={{ py: 2 }}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       fontWeight: 700,
//                       color: "#222",
//                       fontSize: { xs: 15, sm: 16 },
//                       mb: 0.5,
//                     }}
//                   >
//                     {brand.name}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontWeight: 600,
//                       color: "#555",
//                       fontSize: { xs: 13, sm: 15 },
//                     }}
//                   >
//                     {brand.offer}
//                   </Typography>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default BrandDealsGrid;

import React from "react";
import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const brandDeals = [
  {
    name: "U.S. Polo Assn.",
    slug: "us-polo-assn",
    image: "/Branddeals/USP1.png",
  },
  {
    name: "Levi’s",
    slug: "levis",
    // image: "/Branddeals/Levis.png",
    image: "/Branddeals/USP1.png",
  },
  {
    name: "Tommy Hilfiger",
    slug: "tommy-hilfiger",
    // image: "/Branddeals/Tommy.png",
    image: "/Branddeals/USP1.png",
  },
  {
    name: "United Colors of Benetton",
    slug: "united-colors-of-benetton",
    // image: "/Branddeals/united-colors.png",
    image: "/Branddeals/USP1.png",
  },
  {
    name: "Crocs",
    slug: "crocs",
    // image: "/Branddeals/Crocs.png",
    image: "/Branddeals/USP1.png",
  },
  {
    name: "Puma",
    slug: "puma",
    // image: "/Branddeals/Puma.png",
    image: "/Branddeals/USP1.png",
  },
  {
    name: "U.S. Polo Assn.",
    slug: "us-polo-assn",
    image: "/Branddeals/USP1.png",
  },
  {
    name: "Levi’s",
    slug: "levis",
    // image: "/Branddeals/Levis.png",
    image: "/Branddeals/USP1.png",
  },
];

// helper to chunk array into pairs
const chunkIntoPairs = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr.slice(i, i + 2));
  }
  return result;
};

const BrandDealsGrid = () => {
  const navigate = useNavigate();
  const brandPairs = chunkIntoPairs(brandDeals); // [[0,1],[2,3],[4,5],...]

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1910px",
        position: "relative",
        py: { xs: 3, sm: 4 },
        display: "flex",
      }}
    >
      {/* full-bleed container */}
      <Box
        sx={{
          width: "100%",
          // px: { xs: 2, sm: 3, md: 6 },
        }}
      >
        {/* Heading */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "26px",
            textTransform: "uppercase",
            ml: 5,
            mb: 10,
            textAlign: "left",
            color: "rgb(62, 65, 82)",
            letterSpacing: 3,
          }}
        >
          Biggest Deals On Top Brands
        </Typography>

        {/* Cards */}
        <Grid container spacing={5} justifyContent="center">
          {brandPairs.map((pair, pairIndex) => (
            <Grid
              item
              xs={6} // 2 per row on phones
              sm={4} // 3 per row on small screens
              md={3} // 4 per row on md+
              key={pairIndex}
              sx={{
                display: "flex",
                flexDirection: "column", // 👈 column container
                gap: 10, // space between the two cards (same visual feel)
                backgroundColor: "#F3F3F5",
              }}
            >
              {pair.map((brand, index) => (
                <Card
                  key={brand.slug ?? index}
                  onClick={() => navigate(`/brand/${brand.slug}`)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#F3F3F5",
                    boxShadow: "none",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={brand.image}
                    sx={{
                      width: "364px",
                      height: { xs: 220, sm: 250, md: "574px" },
                      objectFit: "fit",
                      py: 2,
                      px: 2,
                    }}
                  />
                </Card>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BrandDealsGrid;
