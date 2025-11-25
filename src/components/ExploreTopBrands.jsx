import React from "react";
import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";

const topBrands = [
  { id: 1, image: "/topbrands/nike.webp" },
  { id: 2, image: "/topbrands/levis.webp" },
  { id: 3, image: "/topbrands/roadster.webp" },
  { id: 4, image: "/topbrands/JackJones.webp" },
  { id: 5, image: "/topbrands/hrx.webp" },
];

const ExploreTopBrands = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1905px",
        backgroundColor: "#ffffff",
        py: { xs: 4, md: 6 },
      }}
    >
      {/* Heading */}
      <Box sx={{ ml: 6 }}>
        <Typography
          sx={{
            fontWeight: 700,
            letterSpacing: 4,
            fontSize: "26px",
            textTransform: "uppercase",
            color: "#3E4152",
            mb: { xs: 3, md: 4, lg: 6 },
          }}
        >
          Explore Top Brands
        </Typography>

        {/* Cards */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {topBrands.map((brand) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={brand.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0px 12px 30px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={brand.image}
                  alt={`Top brand ${brand.id}`}
                  sx={{
                    width: 333,
                    height: 510,
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ExploreTopBrands;
