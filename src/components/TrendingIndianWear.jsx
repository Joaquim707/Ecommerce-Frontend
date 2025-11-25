import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const indianWearData = [
  {
    id: 1,
    image: "/indianwear/white-indian-wear.webp",
    link: "/indian-wear/all-white",
  },
  {
    id: 2,
    image: "/indianwear/ethnic-casuals.webp",
    link: "/indian-wear/ethnic-casuals",
  },
  {
    id: 3,
    image: "/indianwear/printed-kurta-sets.webp",
    link: "/indian-wear/printed-kurta-sets",
  },
  {
    id: 4,
    image: "/indianwear/everyday-kurtas.webp",
    link: "/indian-wear/everyday-kurtas",
  },
  {
    id: 5,
    image: "/indianwear/handpicked-trendy.webp",
    link: "/indian-wear/handpicked-trendy",
  },
];

const TrendingIndianWear = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        py: { xs: 4, md: 3 },
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          maxWidth: "1905px",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 5 },
        }}
      >
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
          {title}
        </Typography>
      </Box>

      {/* Image Cards only */}
      <Box
        sx={{
          maxWidth: "1905px",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          {indianWearData.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.id}>
              <Card
                sx={{
                  boxShadow: "none",
                  borderRadius: 0,
                  backgroundColor: "transparent",
                }}
              >
                <CardActionArea onClick={() => navigate(item.link)}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={`trending-indian-wear-${item.id}`}
                    sx={{
                      width: 328,
                      height: 463,
                      objectFit: "cover",
                      mx: "auto", // centers the image inside the grid cell
                    }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TrendingIndianWear;
