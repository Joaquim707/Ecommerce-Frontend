import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Link,
  Drawer,
  TextField,
  IconButton,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Radio, // 👈 added
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Map for known colors / fancy names → hex
const colorNameToHex = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  blue: "#0000ff",
  green: "#008000",
  grey: "#808080",
  gray: "#808080",

  // fancy / compound names you might see in catalog
  "off white": "#f5f5f5",
  "off-white": "#f5f5f5",
  charcoal: "#36454F",
  "charcoal grey": "#3C4142",
  "charcoal gray": "#3C4142",
  "brick red": "#B22222",
  wine: "#5C0731",
  maroon: "#800000",
  "navy blue": "#000080",
  "sky blue": "#87CEEB",
  "light pink": "#FFB6C1",
  beige: "#F5F5DC",
  tan: "#D2B48C",
  mustard: "#FFDB58",
  olive: "#808000",
  "lime green": "#32CD32",
  "rust brown": "#B7410E",
};

// Helper to derive a usable swatch color from arbitrary label
const getSwatchColor = (label) => {
  if (!label) return "#ffffff";

  const key = label.toLowerCase().trim();

  // 1) Exact match in mapping
  if (colorNameToHex[key]) return colorNameToHex[key];

  // 2) Try to find a known word inside multi-word names
  const words = key.split(/\s+/);
  for (let i = words.length - 1; i >= 0; i--) {
    const w = words[i];
    if (colorNameToHex[w]) return colorNameToHex[w];
  }

  // 3) If the string itself is a valid CSS color, use it directly
  try {
    if (typeof window !== "undefined" && window.CSS?.supports?.("color", key)) {
      return key;
    }
  } catch (e) {
    // ignore
  }

  // 4) Fallback neutral
  return "#ffffff";
};

// Props:
// colors: array of strings (all available colors)
// selectedColors: array of strings
// onChange: (newSelectedColors) => void
const ColorFilter = ({ colors = [], selectedColors = [], onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("");

  // Show only first few colors in collapsed view
  const previewColors = useMemo(() => colors.slice(0, 6), [colors]);

  const handleToggleColor = (color) => {
    const exists = selectedColors.includes(color);
    const updated = exists
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onChange(updated);
  };

  // Filter logic inside drawer
  const filteredColors = useMemo(() => {
    let list = colors;

    if (activeLetter) {
      list = list.filter(
        (c) => c[0]?.toUpperCase() === activeLetter.toUpperCase()
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => c.toLowerCase().includes(q));
    }

    return list;
  }, [colors, search, activeLetter]);

  return (
    <>
      {/* COLLAPSED VIEW (inside filter sidebar) */}
      <Box sx={{ mb: 2, pl: 1.5 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            color: "#282c3f",
            mb: 1,
          }}
        >
          Color
        </Typography>

        {/* Column of chips */}
        <Stack direction="column" spacing={0.8} sx={{ width: "50%" }}>
          {previewColors.map((color) => (
            <Chip
              key={color}
              label={color}
              size="small"
              clickable
              onClick={() => handleToggleColor(color)}
              variant={selectedColors.includes(color) ? "filled" : "outlined"}
              icon={
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    mr: 0.5,
                    border: "1px solid #d4d5d9",
                    backgroundColor: getSwatchColor(color),
                  }}
                />
              }
              sx={{
                justifyContent: "flex-start",
                borderRadius: 0,
                fontSize: 14,
                border: "none",
                backgroundColor: selectedColors.includes(color)
                  ? "#f5f5f6"
                  : "#ffffff",
              }}
            />
          ))}
        </Stack>

        {/* View all link */}
        {colors.length > previewColors.length && (
          <Box sx={{ mt: 1, pl: 2 }}>
            <Link
              component="button"
              type="button"
              onClick={() => setOpen(true)}
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: "#ff3f6c",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              + {colors.length} more
            </Link>
          </Box>
        )}
      </Box>

      {/* FULL VIEW (Drawer like Myntra) */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
          setSearch("");
          setActiveLetter("");
        }}
      >
        <Box
          sx={{
            width: { xs: "80vw", sm: 360 },
            p: 2,
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#282c3f",
              }}
            >
              All Colors
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                setOpen(false);
                setSearch("");
                setActiveLetter("");
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search color"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiInputBase-root": {
                fontSize: 13,
              },
            }}
          />

          {/* A-Z Alphabet Bar */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              mb: 1.5,
            }}
          >
            {ALPHABETS.map((letter) => (
              <Box
                key={letter}
                onClick={() =>
                  setActiveLetter((prev) => (prev === letter ? "" : letter))
                }
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: 12,
                  borderRadius: "50%",
                  border: "1px solid #d4d5d9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  userSelect: "none",
                  backgroundColor:
                    activeLetter === letter ? "#ffedf2" : "#ffffff",
                  color: activeLetter === letter ? "#ff3f6c" : "#535766",
                }}
              >
                {letter}
              </Box>
            ))}
          </Box>

          <Divider sx={{ mb: 1 }} />

          {/* Color list */}
          <List
            dense
            disablePadding
            sx={{ maxHeight: "60vh", overflowY: "auto" }}
          >
            {filteredColors.map((color) => {
              const selected = selectedColors.includes(color);
              return (
                <ListItemButton
                  key={color}
                  onClick={() => handleToggleColor(color)}
                  sx={{
                    py: 0.5,
                    px: 1,
                    "&:hover": {
                      backgroundColor: "#f5f5f6",
                    },
                  }}
                >
                  {/* Radio on the left */}
                  <Radio
                    size="small"
                    checked={selected}
                    tabIndex={-1}
                    disableRipple
                    sx={{ mr: 1 }}
                  />

                  <ListItemText
                    primary={color}
                    primaryTypographyProps={{
                      fontSize: 13,
                      color: "#282c3f",
                    }}
                  />

                  {/* Swatch on the right */}
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: "1px solid #d4d5d9",
                      ml: 1,
                      backgroundColor: getSwatchColor(color),
                    }}
                  />
                </ListItemButton>
              );
            })}

            {filteredColors.length === 0 && (
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#94969f",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                No colors found
              </Typography>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default ColorFilter;
