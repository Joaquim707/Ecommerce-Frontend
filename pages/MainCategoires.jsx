// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   CircularProgress,
//   Card,
//   CardActionArea,
//   CardMedia,
//   CardContent,
// } from "@mui/material";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import MainCategorySlider from "../src/components/MainCategorySlider";
// import ContainerFullWidth from "../src/layouts/ContainerFullWidth";

// const MainCategories = () => {
//   const [subCategories, setSubCategories] = useState([]);
//   const [mainCategoryName, setMainCategoryName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract slug: e.g. "/category/men" → "men"
//   const mainSlug = location.pathname.split("/")[2];

//   const fetchSubCategories = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:5000/api/categories/sub/${mainSlug}`
//       );
//       setMainCategoryName(res.data.mainCategory);
//       setSubCategories(res.data.subCategories || []);
//     } catch (err) {
//       console.error("Error fetching subcategories:", err);
//       setSubCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubCategories();
//   }, [mainSlug]);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "50vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <ContainerFullWidth>
//       {/* ✅ Responsive Banner Slider */}
//       <MainCategorySlider slug={mainSlug} />

//       {/* ✅ Category Grid */}
//       <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: "1400px", mx: "auto" }}>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 700,
//             mb: { xs: 2, sm: 4 },
//             textAlign: "center",
//             textTransform: "capitalize",
//             fontSize: { xs: 22, sm: 26, md: 32 },
//           }}
//         >
//           {mainCategoryName || mainSlug}
//         </Typography>

//         {subCategories.length > 0 ? (
//           <Grid
//             container
//             spacing={{ xs: 1.5, sm: 2, md: 3 }}
//             justifyContent="center"
//           >
//             {subCategories.map((cat) => (
//               <Grid item xs={6} sm={4} md={3} lg={2.4} key={cat._id}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     borderRadius: 3,
//                     boxShadow: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     transition: "transform 0.25s, box-shadow 0.25s",
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: 4,
//                     },
//                   }}
//                 >
//                   <CardActionArea
//                     onClick={() =>
//                       navigate(`/category/${mainSlug}/${cat.slug}`)
//                     }
//                     sx={{ flexGrow: 1 }}
//                   >
//                     {cat.image ? (
//                       <Box
//                         sx={{
//                           width: "100%",
//                           pt: "100%", // ✅ Keeps square ratio
//                           position: "relative",
//                         }}
//                       >
//                         <CardMedia
//                           component="img"
//                           image={cat.image}
//                           alt={cat.name}
//                           sx={{
//                             position: "absolute",
//                             inset: 0,
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             borderTopLeftRadius: 12,
//                             borderTopRightRadius: 12,
//                           }}
//                         />
//                       </Box>
//                     ) : (
//                       <Box
//                         sx={{
//                           width: "100%",
//                           pt: "100%",
//                           position: "relative",
//                           backgroundColor: "#f0f0f0",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           color: "#999",
//                           fontWeight: 600,
//                         }}
//                       >
//                         No Image
//                       </Box>
//                     )}

//                     <CardContent
//                       sx={{
//                         textAlign: "center",
//                         py: { xs: 1, sm: 1.5 },
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontWeight: 600,
//                           fontSize: { xs: 14, sm: 16 },
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {cat.name}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography
//             sx={{
//               textAlign: "center",
//               mt: 5,
//               fontSize: { xs: 14, sm: 16 },
//               color: "text.secondary",
//             }}
//           >
//             No subcategories found.
//           </Typography>
//         )}
//       </Box>
//     </ContainerFullWidth>
//   );
// };

// export default MainCategories;

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import MainCategorySlider from "../src/components/MainCategorySlider";
import ContainerFullWidth from "../src/layouts/ContainerFullWidth";
import BrandDealsGrid from "../src/components/BrandDealsGrid";
import MyntraLuxe from "../src/components/MyntraLuxe";
import Footer from "../src/components/Footer";
import ExploreTopBrands from "../src/components/ExploreTopBrands";
import TrendingIndianWear from "../src/components/TrendingIndianWear";

const MainCategories = () => {
  const [thirdLevelCategories, setThirdLevelCategories] = useState([]);
  const [mainCategoryName, setMainCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract slug: e.g. "/category/men" → "men"
  const mainSlug = location.pathname.split("/")[2];

  // 🔹 Fetch 2nd level categories first, then 3rd level under each
  const fetchThirdLevel = async () => {
    try {
      setLoading(true);

      // Get subcategories of main category
      const res = await axios.get(
        `http://localhost:5000/api/categories/sub/${mainSlug}`
      );
      const mainCat = res.data.mainCategory;
      const subCats = res.data.subCategories || [];
      setMainCategoryName(mainCat);

      // Fetch 3rd-level categories for each subcategory
      const allThirdLevel = [];
      for (const sub of subCats) {
        const subRes = await axios.get(
          `http://localhost:5000/api/categories/sub/${sub.slug}`
        );
        const third = subRes.data.subCategories || [];
        allThirdLevel.push(
          ...third.map((cat) => ({
            ...cat,
            parentSlug: sub.slug,
          }))
        );
      }

      setThirdLevelCategories(allThirdLevel);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setThirdLevelCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThirdLevel();
  }, [mainSlug]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ContainerFullWidth>
      {/* 🔹 Responsive Banner Slider */}
      <MainCategorySlider slug={mainSlug} />

      <BrandDealsGrid />

      {/* 🔹 Third Level Grid */}
      <Box
        sx={{
          py: 6,
          px: { xs: 2, sm: 4, md: 5.5 },
          backgroundColor: "#fff",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "26px",
            textTransform: "uppercase",
            ml: 0,
            mb: 10,
            textAlign: "left",
            color: "rgb(62, 65, 82)",
            letterSpacing: 3,
          }}
        >
          Categories To Bag
        </Typography>
        {thirdLevelCategories.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 7 }}
            justifyContent="center"
          >
            {thirdLevelCategories.map((cat) => (
              <Grid item xs={6} sm={4} md={2} key={cat._id}>
                <Box
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    // "&:hover": {
                    //   transform: "scale(1.05)",
                    // },
                  }}
                >
                  {/* Circle Image */}
                  <Box
                    sx={{
                      width: { sm: "160px", md: "180px", lg: "240px" },
                      height: { sm: "160px", md: "180px", lg: "240px" },
                      mx: "auto",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "4px solid #E9E0DA",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: 2,
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={cat.image}
                      alt={cat.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* Category Name */}
                  <Typography
                    sx={{
                      mt: 1.5,
                      fontWeight: 500,
                      fontSize: { xs: 14, sm: 16, md: 24 },
                      color: "#222",
                      fontFamily: `"Kepler Std Extended Display", serif`,
                    }}
                  >
                    {cat.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              mt: 5,
              fontSize: { xs: 14, sm: 16 },
              color: "text.secondary",
            }}
          >
            No subcategories found.
          </Typography>
        )}
      </Box>

      <ExploreTopBrands />

      <MyntraLuxe />

      <TrendingIndianWear title={"Trending in Indian Wear"} />
      <TrendingIndianWear title={"Trending In Sports Wear"} />
      <TrendingIndianWear title={"Trending In Footwear"} />
      <TrendingIndianWear title={"Trending In Accessories"} />
    </ContainerFullWidth>
  );
};

export default MainCategories;
