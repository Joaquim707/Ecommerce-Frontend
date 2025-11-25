import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const MegaMenu = ({ open, onClose, subcategories = [], level2 = [] }) => {
  if (!open || !subcategories.length) return null;

  return (
    <Box
      onMouseLeave={onClose}
      sx={{
        position: "absolute",
        top: "100%",
        left: 0, // 👈 directly below parent
        bgcolor: "#fff",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
        p: { xs: 2, sm: 3, md: 4 },
        zIndex: 1300,
        borderTop: "1px solid #eee",
        borderRadius: "0 0 8px 8px",
        maxHeight: { xs: 400, md: 500 },
        overflowY: "auto",
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 2, sm: 3, md: 4 },
        width: "auto",
        minWidth: { xs: "280px", sm: "400px" },
        maxWidth: { xs: "90vw", md: "1000px" },
        transition: "all 0.2s ease",
        backgroundClip: "padding-box",
      }}
    >
      {subcategories.map((sub) => {
        const children = level2?.filter((child) => child.parentId === sub._id);

        return (
          <Box
            key={sub._id}
            sx={{
              flex: "0 1 auto",
              minWidth: { xs: 140, sm: 160, md: 180 },
              maxWidth: { xs: 200, sm: 220 },
            }}
          >
            {/* Level 1 Title */}
            <Typography
              component={Link}
              to={`/category/${sub.slug}`}
              sx={{
                display: "block",
                textDecoration: "none",
                color: "#ff3f6c",
                fontWeight: 700,
                fontSize: { xs: 13, sm: 14 },
                mb: 1,
                "&:hover": { color: "#d81b60" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {sub.name}
            </Typography>

            {/* Level 2 Items */}
            {children?.length > 0 ? (
              children.map((child) => (
                <Typography
                  key={child._id}
                  component={Link}
                  to={`/category/${child.slug}`}
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "#282c3f",
                    fontSize: { xs: 12.5, sm: 13 },
                    mb: 0.8,
                    lineHeight: 1.3,
                    "&:hover": { color: "#ff3f6c" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {child.name}
                </Typography>
              ))
            ) : (
              <Typography
                sx={{
                  color: "#9e9e9e",
                  fontSize: { xs: 11, sm: 12 },
                  fontStyle: "italic",
                }}
              >
                No subcategories
              </Typography>
            )}

            {children?.length > 0 && <Divider sx={{ my: 1, width: "60%" }} />}
          </Box>
        );
      })}
    </Box>
  );
};

export default MegaMenu;
