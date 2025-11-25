// src/components/WishlistButton.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // <-- uses your axios file
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Tooltip } from "@mui/material";

const WishlistButton = ({ productId, size = "medium" }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist status initially
  useEffect(() => {
    let mounted = true;

    const fetchWishlistStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axiosInstance.get("/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!mounted) return;

        if (res.data.ok) {
          const exists = res.data.wishlist.some(
            (item) => item.product && item.product._id === productId
          );
          setInWishlist(exists);
        }
      } catch (err) {
        // user may not be logged in
        setInWishlist(false);
      }
    };

    if (productId) fetchWishlistStatus();

    return () => {
      mounted = false;
    };
  }, [productId]);

  // Toggle wishlist status
  const toggleWishlist = async (e) => {
    e.stopPropagation();
    if (!productId) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post(
        "/wishlist/toggle",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.ok) {
        setInWishlist(res.data.inWishlist);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please log in to use wishlist.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
      <IconButton
        onClick={toggleWishlist}
        disabled={loading}
        size={size}
        sx={{
          color: inWishlist ? "#ff3f6c" : "rgba(0,0,0,0.6)",
          transition: "transform 120ms ease",
          "&:active": { transform: "scale(.95)" },
        }}
      >
        {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default WishlistButton;
