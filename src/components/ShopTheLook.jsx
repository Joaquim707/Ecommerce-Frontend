import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ShopTheLook = ({ products = [], title = "Shop The Look" }) => {
  return (
    <Box sx={{ mt: 8 }}>
      {/* SECTION TITLE */}
      <Typography
        fontWeight={700}
        sx={{
          mb: 3,
          fontSize: "16px",
          color: "#282c3f",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>

      {/* PRODUCT GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // mobile
            sm: "repeat(3, 1fr)", // tablet
            md: "repeat(4, 1fr)", // desktop
            lg: "repeat(7, 1fr)", // EXACT 7 per row like Myntra
          },
          gap: 4,
        }}
      >
        {products.map((item) => {
          const originalPrice =
            item.price && item.discountPercent
              ? Math.round((item.price * 100) / (100 - item.discountPercent))
              : null;

          return (
            <Link
              key={item._id}
              to={`/product/${item.slug}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                sx={{
                  border: "1px solid #eee",
                  overflow: "hidden",
                  cursor: "pointer",
                  bgcolor: "#fff",
                  "&:hover": { boxShadow: 3 },
                }}
              >
                {/* IMAGE */}
                <Box
                  sx={{
                    width: "100%",
                    height: "270px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#fafafa",
                  }}
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* TEXT */}
                <Box sx={{ p: 1 }}>
                  <Typography fontWeight={700} fontSize={16} noWrap>
                    {item.brand}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: 13 }}
                    noWrap
                  >
                    {item.title}
                  </Typography>

                  <Typography fontWeight={700} sx={{ mt: 0.5 }}>
                    ₹{item.price}
                    {originalPrice && (
                      <Box
                        component="span"
                        sx={{
                          fontSize: 12,
                          color: "#888",
                          textDecoration: "line-through",
                          marginLeft: 1,
                        }}
                      >
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </Box>
                    )}
                    <Box
                      component="span"
                      sx={{
                        color: "green",
                        marginLeft: 1,
                        fontSize: 13,
                      }}
                    >
                      ({item.discountPercent}% OFF)
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default ShopTheLook;
