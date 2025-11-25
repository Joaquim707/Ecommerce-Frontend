import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        bgcolor: "#f5f5f6",
        borderRadius: 1,
        mt: 2,
      }}
    >
      <SearchIcon sx={{ color: "#6e6e6e", fontSize: 24, mr: 1 }} />
      <InputBase
        placeholder="Search for products, brands and more"
        sx={{ flex: 1, fontSize: 16 }}
      />
    </Box>
  );
};

export default Search;
