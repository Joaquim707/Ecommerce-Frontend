import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const CouponDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ENTIRE COUPON UNIT (BAR + DRAWER) */}
      <Box
        sx={{
          position: "fixed",
          top: "80%",
          transform: "translateY(-50%)",
          right: open ? "0px" : "-600px",
          width: "650px",
          height: { md: "250px", lg: "288px" },
          display: "flex",
          zIndex: 4000,
          transition: "right 0.35s ease",
          mr: -1,
        }}
      >
        {/* ───────────────────────────────
            VERTICAL TOGGLE BAR 
        ─────────────────────────────── */}
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            width: "44px",
            height: { md: "250px", lg: "288px" },
            bgcolor: "#535766",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            userSelect: "none",
          }}
        >
          {/* Arrow */}
          <Box
            sx={{
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "6px solid white",
              mb: 4,
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.3s",
            }}
          />
          <Typography
            sx={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              letterSpacing: "1px",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            UPTO ₹200 OFF
          </Typography>
        </Box>

        {/* ───────────────────────────────
            MAIN DRAWER + 3 SECTIONS 
        ─────────────────────────────── */}
        <Box
          sx={{
            width: "600px",
            height: { md: "250px", lg: "288px" },
            bgcolor: "#fff",
            borderRadius: "0 16px 16px 0",
            display: open ? "flex" : "none",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            background: "linear-gradient(90deg,#fff2f6,#fff9ea)",
          }}
        >
          {/* SECTION 1 + SECTION 2 (side-by-side) */}
          <Box
            sx={{
              display: "flex",
              flex: 1,
              px: 3,
              pt: 3,
            }}
          >
            {/* ───────────────────────────────
                SECTION 1: TEXT BLOCK
            ─────────────────────────────── */}
            <Box
              sx={{
                flex: 1,
                color: "#3e4152",
                ml: 1.5,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>
                  Avail Upto
                </Typography>

                <Typography sx={{ fontSize: "40px", fontWeight: 800 }}>
                  200 OFF
                </Typography>
              </Box>

              <Box sx={{ mt: 5 }}>
                <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Coupon Code:{" "}
                  <strong
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      mt: { sm: 0, lg: 5 },
                    }}
                  >
                    MYNTRASAVE
                  </strong>
                </Typography>

                <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
                  Applicable on your first order
                </Typography>
              </Box>
            </Box>

            {/* ───────────────────────────────
                SECTION 2: IMAGE + BUTTON
            ─────────────────────────────── */}
            <Box
              sx={{
                width: "180px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: 1.5,
              }}
            >
              <img
                src="/images/coupon.png"
                style={{
                  width: "150px",
                  height: "120px",
                  marginBottom: "10px",
                  objectFit: "contain",
                }}
              />

              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg,#ff3f6c,#ff5b7c)",
                  fontWeight: 700,
                  borderRadius: "4px",
                  height: "48px",
                  width: "172px",
                  mt: 1,
                }}
              >
                SIGN UP NOW {">"}
              </Button>
            </Box>
          </Box>

          {/* ───────────────────────────────
              SECTION 3: FULL-WIDTH ICON STRIP
          ─────────────────────────────── */}
          <Box
            sx={{
              width: "100%",
              borderTop: "1px solid #e5e5e5",

              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              py: 2,
              pb: 2.5,
              mt: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedIcon fontSize="large" sx={{ color: "#03a685" }} />
              <Typography sx={{ fontSize: "12px" }}>
                Genuine Products
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckroomIcon fontSize="large" sx={{ color: "#03a685" }} />
              <Typography sx={{ fontSize: "12px" }}>Try & Buy</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SwapHorizIcon fontSize="large" sx={{ color: "#03a685" }} />
              <Typography sx={{ fontSize: "12px" }}>Easy Returns</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CouponDrawer;
