import { Box, Typography, LinearProgress } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// Helper to create random star counts
const randomStarCount = () => Math.floor(Math.random() * 1500 + 50);

const RatingsSection = () => {
  const ratings = {
    average: (Math.random() * 2 + 3).toFixed(1), // random between 3.0 - 5.0
    totalBuyers: (Math.random() * 20000 + 2000).toFixed(0),
    stars: {
      5: randomStarCount(),
      4: randomStarCount(),
      3: randomStarCount(),
      2: randomStarCount(),
      1: randomStarCount(),
    },
  };

  const totalRatings =
    ratings.stars[5] +
    ratings.stars[4] +
    ratings.stars[3] +
    ratings.stars[2] +
    ratings.stars[1];

  // Progress bar width calculation
  const percent = (count) => (count / totalRatings) * 100;

  // Random “What customers said” values
  const customerFeedback = {
    Fit: Math.floor(Math.random() * 20 + 70), // 70–90%
    Length: Math.floor(Math.random() * 20 + 70),
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* RATINGS HEADER */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#282c3f",
          mb: 2,
          display: "flex",
          gap: 0.5,
        }}
      >
        RATINGS <StarBorderIcon fontSize="small" />
      </Typography>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
        {/* LEFT SIDE: AVERAGE RATING */}
        <Box>
          <Typography
            sx={{ fontSize: 48, fontWeight: 400, color: "#282c3f", mb: -0.5 }}
          >
            {ratings.average}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#535766" }}>
            {Number(ratings.totalBuyers).toLocaleString()} Verified Buyers
          </Typography>
        </Box>

        {/* RIGHT SIDE: STAR DISTRIBUTION */}
        <Box sx={{ borderLeft: "1px solid #a9abb33b", pl: 7, width: "223px" }}>
          {[5, 4, 3, 2, 1].map((star) => (
            <Box
              key={star}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: 14, width: 20 }}>{star}★</Typography>

              <LinearProgress
                variant="determinate"
                value={percent(ratings.stars[star])}
                sx={{
                  flex: 1,
                  height: 5,
                  borderRadius: 50,
                  backgroundColor: "#eaeaec",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      star === 5
                        ? "#0ab47b"
                        : star === 4
                        ? "#3cb9b5"
                        : star === 3
                        ? "#d7d017"
                        : star === 2
                        ? "#e59c2c"
                        : "#e25a5a",
                  },
                }}
              />

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#535766",
                  width: 40,
                  textAlign: "right",
                }}
              >
                {ratings.stars[star]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* WHAT CUSTOMERS SAID */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#282c3f",
          mt: 2,
          mb: 0.5,
          display: "flex",
          gap: 0.5,
        }}
      >
        WHAT CUSTOMERS SAID <StarBorderIcon fontSize="small" />
      </Typography>

      {/* FEEDBACK ROWS */}
      {Object.entries(customerFeedback).map(([label, percentVal]) => (
        <Box key={label} sx={{ mb: 1, width: 300 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: "#3e4152" }}>
            {label}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LinearProgress
              variant="determinate"
              value={percentVal}
              sx={{
                flex: 1,
                height: 5,
                borderRadius: 50,
                "& .MuiLinearProgress-bar": { backgroundColor: "#0ab47b" },
              }}
            />
            <Typography
              sx={{ fontSize: 14, fontWeight: 700, color: "#3e4152" }}
            >
              Just Right ({percentVal}%)
            </Typography>
          </Box>
        </Box>
      ))}

      {/* VIEW DETAILS */}
      <Typography
        sx={{
          mt: 1,
          fontSize: 14,
          fontWeight: 600,
          color: "#ff3f6c",
          cursor: "pointer",
        }}
      >
        View Details
      </Typography>
    </Box>
  );
};

export default RatingsSection;
