import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const luxeBrands = [
  {
    name: "FARAH",
    tagline: "The Iconic 'F'",
    image: "/Luxe/farah.png",
    slug: "farah",
  },
  {
    name: "THE COLLECTIVE",
    tagline: "Created For The Luxe Life",
    image: "/Luxe/the-collective.png",
    slug: "the-collective",
  },
  {
    name: "POLO RALPH LAUREN",
    tagline: "An American Classic",
    image: "/Luxe/ralph.png",
    slug: "polo-ralph-lauren",
  },
  {
    name: "D1 MILANO",
    tagline: "Made To Stand Out",
    image: "/Luxe/d1milano.png",
    slug: "d1-milano",
  },
  {
    name: "HUGO",
    tagline: "Elan Meets Effortless",
    image: "/Luxe/hugo.png",
    slug: "hugo",
  },
  {
    name: "DUCATI CORSE",
    tagline: "Sports Meets Style",
    image: "/Luxe/ducati.png",
    slug: "ducati-corse",
  },
];

const MyntraLuxe = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 2 },
        width: "100%",
        maxWidth: "1905px",
        mx: "auto",
        backgroundColor: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* Section Title */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "26px",
          textTransform: "uppercase",
          ml: 5,
          mb: 8,
          textAlign: "left",
          color: "rgb(62, 65, 82)",
          letterSpacing: 3,
        }}
      >
        Myntra Luxe
      </Typography>

      {/* Responsive Grid */}
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 3 }}
        justifyContent="center"
        sx={{
          margin: "0 auto",
          maxWidth: "100%",
        }}
      >
        {luxeBrands.map((brand, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              onClick={() => navigate(`/brand/${brand.slug}`)}
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: 320, md: 340 },
                height: { xs: 260, sm: 300, md: 370 },
                overflow: "hidden",
                position: "relative",
                boxShadow: "none",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                image={brand.image}
                alt={brand.name}
                sx={{
                  width: "275px ",
                  height: "358px",
                  objectFit: "fit",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyntraLuxe;
