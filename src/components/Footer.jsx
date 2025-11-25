import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          color: "#3c3c3c",
          borderTop: "1px solid #e0e0e0",
          padding: "40px 60px",
          fontFamily: "sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 6,
          // width: { sm: "797px", md: "1255px", lg: "1440px", xl: "1785px" },
        }}
      >
        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              ONLINE SHOPPING
            </Typography>
            {[
              "Men",
              "Women",
              "Kids",
              "Home",
              "Beauty",
              "Genz",
              "Gift Cards",
              "Myntra Insider",
            ].map((item) => (
              <Typography
                key={item}
                sx={{ fontSize: 14, mb: 0.6, cursor: "pointer" }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              CUSTOMER POLICIES
            </Typography>
            {[
              "Contact Us",
              "FAQ",
              "T&C",
              "Terms Of Use",
              "Track Orders",
              "Shipping",
              "Cancellation",
              "Returns",
              "Privacy Policy",
            ].map((item) => (
              <Typography
                key={item}
                sx={{ fontSize: 14, mb: 0.6, cursor: "pointer" }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Column 3 (App + Social) */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              EXPERIENCE OUR APP
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <img
                src="/footer/googlePlay.png"
                alt="google play"
                width="120"
                style={{ cursor: "pointer" }}
              />
              <img
                src="/footer/AppleStore.png"
                alt="app store"
                width="120"
                style={{ cursor: "pointer" }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3 }}>
              KEEP IN TOUCH
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {[Facebook, Twitter, YouTube, Instagram].map((Icon, index) => (
                <IconButton key={index} size="small" sx={{ color: "#3c3c3c" }}>
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Column 4 (Guarantee Section) */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                100% ORIGINAL
              </Typography>
              <Typography sx={{ fontSize: 13 }}>for all products</Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                Return within 14 days
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                of receiving your order
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          mt: 2,
          borderTop: "1px solid #ddd",
          pt: 2,
        }}
      >
        <Typography sx={{ fontSize: 13 }}>
          © 2025 YourBrandName. All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
}
