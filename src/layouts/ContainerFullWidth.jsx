import React from "react";
import { Box } from "@mui/material";

const ContainerFullWidth = ({ children, bgcolor = "transparent", sx = {} }) => {
  return (
    <Box
      sx={{
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        width: "100%",
        bgcolor,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerFullWidth;
