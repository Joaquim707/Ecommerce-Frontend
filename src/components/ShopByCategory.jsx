import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const categories = [
  { image: "/images/ethnic.jpeg", link: "/category/ethnic-wear" },
  { image: "/images/wfh.jpeg", link: "/category/t-shirts" },
  { image: "/images/active1.jpeg", link: "/category/activewear" },
  { image: "/images/western.jpeg", link: "/category/western-wear" },
  { image: "/images/sportswear.jpeg", link: "/category/sportswear" },
  { image: "/images/watches.jpeg", link: "/category/watches" },
  { image: "/images/active1.jpeg", link: "/category/activewear" },
  { image: "/images/western.jpeg", link: "/category/western-wear" },
  { image: "/images/sportswear.jpeg", link: "/category/sportswear" },
  { image: "/images/grooming.jpeg", link: "/category/grooming" },
  { image: "/images/beauty.jpeg", link: "/category/beauty" },
  { image: "/images/ethnic.jpeg", link: "/category/ethnic-wear" },
  { image: "/images/ethnic.jpeg", link: "/category/ethnic-wear" },
  { image: "/images/wfh.jpeg", link: "/category/t-shirts" },
  { image: "/images/active1.jpeg", link: "/category/activewear" },
  { image: "/images/western.jpeg", link: "/category/western-wear" },
  { image: "/images/sportswear.jpeg", link: "/category/sportswear" },
  { image: "/images/watches.jpeg", link: "/category/watches" },
  { image: "/images/grooming.jpeg", link: "/category/grooming" },
  { image: "/images/beauty.jpeg", link: "/category/beauty" },
  { image: "/images/ethnic.jpeg", link: "/category/ethnic-wear" },
];

const ShopByCategory = () => {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: 18, sm: 22, md: 28, lg: 29 },
          letterSpacing: 1,
          color: "#3e4152",
          mb: 4,
          margin: "10px 0 70px 0",
        }}
      >
        SHOP BY CATEGORY
      </Typography>

      <Grid container justifyContent="center">
        {categories.map((cat, index) => (
          <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
            <Box
              component={Link}
              to={cat.link}
              sx={{
                display: "block",
                textDecoration: "none",
                borderRadius: 1,
                overflow: "hidden",
                transition: "transform 0.3s ease",
              }}
            >
              <Box
                component="img"
                src={cat.image}
                alt={`Category ${index + 1}`}
                sx={{
                  width: "300px",
                  height: "400px",
                  aspectRatio: "3 / 4", // maintains uniform size
                  objectFit: "cover",
                  borderRadius: 1,
                  px: 2,
                  py: 3,
                  boxSizing: "border-box",
                  display: "block",
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopByCategory;
