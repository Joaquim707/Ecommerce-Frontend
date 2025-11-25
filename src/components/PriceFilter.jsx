// import Slider from "@mui/material/Slider";

// const PriceFilter = ({ filters, setFilters }) => {
//   const min = filters.minPrice ?? 0;
//   const max = filters.maxPrice ?? 10000;

//   const handleChangeCommitted = (event, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       minPrice: value[0],
//       maxPrice: value[1],
//     }));
//   };

//   return (
//     <div className="mb-6">
//       <h4 className="font-medium mb-2">Price Range (₹)</h4>

//       <div className="px-2 py-2">
//         <Slider
//           width="200px"
//           value={[min, max]}
//           onChangeCommitted={handleChangeCommitted} // ✅ Only update after release
//           min={0}
//           max={10000}
//           step={50}
//           disableSwap
//         />
//       </div>

//       <div className="flex justify-between text-sm mt-1 gap-4">
//         <span>₹{min}</span> - <span>₹{max}</span>
//       </div>
//     </div>
//   );
// };

// export default PriceFilter;

import React from "react";
import { Box, Typography, Slider } from "@mui/material";

const PriceFilter = ({ filters, setFilters }) => {
  const min = filters.minPrice ?? 100;
  const max = filters.maxPrice ?? 10000;

  const handleChangeCommitted = (_event, value) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  // 👉 Helper for formatting with unit separator
  const formatPrice = (value) => Number(value).toLocaleString("en-IN"); // 10000 -> 10,000

  return (
    <Box sx={{ mb: 2, pl: 0.5 }}>
      {/* Slider */}
      <Box sx={{ px: 0.5 }}>
        <Slider
          value={[min, max]}
          onChangeCommitted={handleChangeCommitted}
          min={100}
          max={10000}
          step={50}
          disableSwap
          sx={{
            height: 2,
            width: 230,
            pt: 2,
            pb: 1,
            "& .MuiSlider-track": {
              border: "none",
              color: "#ff3f6c",
            },
            "& .MuiSlider-rail": {
              opacity: 1,
              color: "#d4d5d9",
            },
            "& .MuiSlider-thumb": {
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "4px solid #ff3f6c",
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "0px 0px 0px 6px rgba(255,63,108,0.16)",
              },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          width: 240,
          display: "flex",
          alignItems: "center",
          pl: 1.5,
        }}
      >
        <Typography sx={{ fontSize: 12, color: "#000000ff", fontWeight: 600 }}>
          ₹{formatPrice(min)} -
        </Typography>
        <Box sx={{ p: 0.2 }} />
        <Typography sx={{ fontSize: 12, color: "#000000ff", fontWeight: 600 }}>
          ₹{formatPrice(max)}+
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceFilter;
