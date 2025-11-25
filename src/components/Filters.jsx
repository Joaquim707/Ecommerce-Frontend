// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   FormControl,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Radio,
//   RadioGroup,
//   Divider,
//   Stack,
//   Chip,
// } from "@mui/material";
// import axios from "axios";
// import PriceFilter from "./PriceFilter";

// const Filters = ({ filters, setFilters }) => {
//   const [colors, setColors] = useState([]);

//   const brands = [
//     "Nike",
//     "Adidas",
//     "Puma",
//     "Reebok",
//     "Zara",
//     "HRX",
//     "WROGN",
//     "Mast & Harbour",
//   ];

//   const discountOptions = [10, 20, 30, 40, 50];

//   // ✅ Fetch colors dynamically from API
//   const fetchColors = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products/colors");
//       setColors(res.data.colors || []);
//     } catch (error) {
//       console.error("Error fetching colors:", error);
//     }
//   };

//   useEffect(() => {
//     fetchColors();
//   }, []);

//   const handleBrandChange = (brand) => {
//     setFilters((prev) => ({
//       ...prev,
//       brands: prev.brands.includes(brand)
//         ? prev.brands.filter((b) => b !== brand)
//         : [...prev.brands, brand],
//     }));
//   };

//   const handleColorChange = (color) => {
//     setFilters((prev) => ({
//       ...prev,
//       colors: prev.colors.includes(color)
//         ? prev.colors.filter((c) => c !== color)
//         : [...prev.colors, color],
//     }));
//   };

//   const handleDiscountChange = (value) => {
//     const v = value === "" ? "" : Number(value);
//     setFilters((prev) => ({ ...prev, discount: v }));
//   };

//   return (
//     <Box
//       sx={{
//         width: { xs: "90%", sm: 260 },
//         py: 2,
//         px: { xs: 2, sm: 0 },
//         backgroundColor: { xs: "#fafafa", sm: "transparent" },
//         borderRadius: { xs: 2, sm: 0 },
//         boxShadow: { xs: 1, sm: "none" },
//       }}
//     >
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//         Filters
//       </Typography>

//       {/* Brand Filter */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Typography sx={{ fontWeight: 600, mb: 1 }}>Brand</Typography>
//         <FormGroup>
//           {brands.map((b) => (
//             <FormControlLabel
//               key={b}
//               control={
//                 <Checkbox
//                   size="small"
//                   checked={filters.brands.includes(b)}
//                   onChange={() => handleBrandChange(b)}
//                 />
//               }
//               label={b}
//             />
//           ))}
//         </FormGroup>
//       </FormControl>

//       <Divider sx={{ my: 2 }} />

//       {/* Color Filter */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Typography sx={{ fontWeight: 600, mb: 1 }}>Color</Typography>
//         <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
//           {colors.map((c) => (
//             <Chip
//               key={c}
//               label={c}
//               clickable
//               color={filters.colors.includes(c) ? "primary" : "default"}
//               onClick={() => handleColorChange(c)}
//             />
//           ))}
//         </Stack>
//       </FormControl>

//       <Divider sx={{ my: 2 }} />

//       {/* Price Filter */}
//       <PriceFilter filters={filters} setFilters={setFilters} />

//       <Divider sx={{ my: 2 }} />

//       {/* Discount Filter */}
//       <FormControl fullWidth>
//         <Typography sx={{ fontWeight: 600, mb: 1 }}>Discount</Typography>
//         <RadioGroup
//           value={filters.discount === "" ? "" : String(filters.discount)}
//           onChange={(e) => handleDiscountChange(e.target.value)}
//         >
//           <FormControlLabel
//             value=""
//             control={<Radio size="small" />}
//             label="All"
//           />
//           {discountOptions.map((d) => (
//             <FormControlLabel
//               key={d}
//               value={String(d)}
//               control={<Radio size="small" />}
//               label={`${d}% or more`}
//             />
//           ))}
//         </RadioGroup>
//       </FormControl>
//     </Box>
//   );
// };

// export default Filters;

// import React from "react";
// import {
//   Box,
//   Typography,
//   FormControl,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Radio,
//   RadioGroup,
//   Divider,
//   Stack,
//   Chip,
// } from "@mui/material";
// import PriceFilter from "./PriceFilter"; // ✅ Ensure correct path

// const Filters = ({ filters, setFilters }) => {
//   const brands = [
//     "Nike",
//     "Adidas",
//     "Puma",
//     "Reebok",
//     "Zara",
//     "HRX",
//     "WROGN",
//     "Mast & Harbour",
//   ];
//   const colors = ["Black", "White", "Red", "Blue", "Green"];
//   const discountOptions = [10, 20, 30, 40, 50];

//   const handleBrandChange = (brand) => {
//     setFilters((prev) => ({
//       ...prev,
//       brands: prev.brands.includes(brand)
//         ? prev.brands.filter((b) => b !== brand)
//         : [...prev.brands, brand],
//     }));
//   };

//   const handleColorChange = (color) => {
//     setFilters((prev) => ({
//       ...prev,
//       colors: prev.colors.includes(color)
//         ? prev.colors.filter((c) => c !== color)
//         : [...prev.colors, color],
//     }));
//   };

//   const handleDiscountChange = (value) => {
//     const v = value === "" ? "" : Number(value);
//     setFilters((prev) => ({ ...prev, discount: v }));
//   };

//   return (
//     <Box
//       sx={{
//         width: { xs: "90%", sm: 260 }, // full width on phones, fixed sidebar on larger
//         pr: { xs: 0, sm: 2 },
//         py: 2,
//         px: { xs: 2, sm: 0 },
//         backgroundColor: { xs: "#fafafa", sm: "transparent" },
//         borderRadius: { xs: 2, sm: 0 },
//         boxShadow: { xs: 1, sm: "none" },
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{
//           mb: 2,
//           fontSize: { xs: 17, sm: 18 },
//           fontWeight: 600,
//           textAlign: { xs: "center", sm: "left" },
//         }}
//       >
//         Filters
//       </Typography>

//       {/* Brand Filter */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Typography
//           sx={{ fontWeight: 600, mb: 1, fontSize: { xs: 14, sm: 15 } }}
//         >
//           Brand
//         </Typography>
//         <FormGroup
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr" },
//           }}
//         >
//           {brands.map((b) => (
//             <FormControlLabel
//               key={b}
//               control={
//                 <Checkbox
//                   size="small"
//                   checked={filters.brands.includes(b)}
//                   onChange={() => handleBrandChange(b)}
//                 />
//               }
//               label={
//                 <Typography sx={{ fontSize: { xs: 13, sm: 14 } }}>
//                   {b}
//                 </Typography>
//               }
//             />
//           ))}
//         </FormGroup>
//       </FormControl>

//       <Divider sx={{ my: 2 }} />

//       {/* Color Filter */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Typography
//           sx={{ fontWeight: 600, mb: 1, fontSize: { xs: 14, sm: 15 } }}
//         >
//           Color
//         </Typography>

//         <Stack
//           direction="row"
//           spacing={1}
//           flexWrap="wrap"
//           sx={{
//             mb: 1,
//             justifyContent: { xs: "center", sm: "flex-start" },
//           }}
//         >
//           {colors.map((c) => {
//             const selected = filters.colors.includes(c);
//             return (
//               <Chip
//                 key={c}
//                 label={c}
//                 clickable
//                 color={selected ? "primary" : "default"}
//                 onClick={() => handleColorChange(c)}
//                 sx={{
//                   textTransform: "capitalize",
//                   fontSize: { xs: 12, sm: 13 },
//                   mb: 1,
//                 }}
//               />
//             );
//           })}
//         </Stack>

//         {/* Optional Checkbox list below (for accessibility) */}
//         <FormGroup
//           sx={{
//             display: { xs: "none", sm: "block" },
//           }}
//         >
//           {colors.map((c) => (
//             <FormControlLabel
//               key={c}
//               control={
//                 <Checkbox
//                   size="small"
//                   checked={filters.colors.includes(c)}
//                   onChange={() => handleColorChange(c)}
//                 />
//               }
//               label={<Typography sx={{ fontSize: 14 }}>{c}</Typography>}
//             />
//           ))}
//         </FormGroup>
//       </FormControl>

//       <Divider sx={{ my: 2 }} />

//       {/* Price Slider */}
//       <PriceFilter filters={filters} setFilters={setFilters} />

//       <Divider sx={{ my: 2 }} />

//       {/* Discount Filter */}
//       <FormControl fullWidth>
//         <Typography
//           sx={{ fontWeight: 600, mb: 1, fontSize: { xs: 14, sm: 15 } }}
//         >
//           Discount
//         </Typography>

//         <RadioGroup
//           value={filters.discount === "" ? "" : String(filters.discount)}
//           onChange={(e) => handleDiscountChange(e.target.value)}
//         >
//           <FormControlLabel
//             value=""
//             control={<Radio size="small" />}
//             label={
//               <Typography sx={{ fontSize: { xs: 13, sm: 14 } }}>All</Typography>
//             }
//           />
//           {discountOptions.map((d) => (
//             <FormControlLabel
//               key={d}
//               value={String(d)}
//               control={<Radio size="small" />}
//               label={
//                 <Typography sx={{ fontSize: { xs: 13, sm: 14 } }}>
//                   {d}% or more
//                 </Typography>
//               }
//             />
//           ))}
//         </RadioGroup>
//       </FormControl>
//     </Box>
//   );
// };

// export default Filters;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import axios from "axios";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";

const Filters = ({ filters, setFilters }) => {
  const [colors, setColors] = useState([]);

  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "Zara",
    "HRX",
    "WROGN",
    "Mast & Harbour",
  ];

  const discountOptions = [10, 20, 30, 40, 50];

  // ✅ Fetch colors dynamically from API
  const fetchColors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/colors");
      setColors(res.data.colors || []);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const handleBrandChange = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleColorChange = (color) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleDiscountChange = (value) => {
    const v = value === "" ? "" : Number(value);
    setFilters((prev) => ({ ...prev, discount: v }));
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 260 },
        py: 2.5,
        px: { sm: 0 },
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e9e9eb",
        pb: 3,
        fontFamily: `"Assistant", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
      }}
    >
      {/* Top row: Filters + count / clear (optional later) */}
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
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#282c3f",
            pl: 1.5,
            pb: 0.5,
          }}
        >
          FILTERS
        </Typography>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {/* Brand Filter */}
      <FormControl fullWidth sx={{ mb: 1.5 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            color: "#282c3f",
            mb: 0.5,
            pl: 1.5,
          }}
        >
          BRAND
        </Typography>
        <FormGroup
          sx={{
            maxHeight: 220,
            overflowY: "auto",
            pl: 1,
            "& .MuiFormControlLabel-root": {
              m: 0,
            },
          }}
        >
          {brands.map((b) => (
            <FormControlLabel
              key={b}
              control={
                <Checkbox
                  size="small"
                  checked={filters.brands.includes(b)}
                  onChange={() => handleBrandChange(b)}
                  sx={{
                    p: 0.3,
                    mr: 1,
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#535766",
                  }}
                >
                  {b}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </FormControl>

      <Divider sx={{ my: 1.5 }} />

      {/* Price Filter */}
      <Box sx={{ mb: 1.5 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            color: "#282c3f",
            mb: 0.5,
            pl: 1.5,
          }}
        >
          PRICE
        </Typography>
        <PriceFilter filters={filters} setFilters={setFilters} />
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {/* Color Filter */}

      <ColorFilter
        colors={colors} // the array you fetch from API
        selectedColors={filters.colors}
        onChange={(newColors) =>
          setFilters((prev) => ({
            ...prev,
            colors: newColors,
          }))
        }
      />

      <Divider sx={{ my: 1.5 }} />
      {/* Discount Filter */}
      <FormControl fullWidth>
        <Typography
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            color: "#282c3f",
            mb: 0.5,
            pl: 1.5,
            fontSize: 14,
          }}
        >
          DISCOUNT RANGE
        </Typography>
        <RadioGroup
          value={filters.discount === "" ? "" : String(filters.discount)}
          onChange={(e) => handleDiscountChange(e.target.value)}
          sx={{
            pl: 1.5,
            "& .MuiFormControlLabel-root": {
              m: 0,
            },
          }}
        >
          <FormControlLabel
            value=""
            control={
              <Radio
                size="small"
                sx={{
                  p: 0.3,
                  mr: 1,
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#535766",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                All
              </Typography>
            }
          />
          {discountOptions.map((d) => (
            <FormControlLabel
              key={d}
              value={String(d)}
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 0.3,
                    mr: 1,
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: "#535766",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {d}% and above
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default Filters;
