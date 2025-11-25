import React, { useState, useEffect } from "react";
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return null; // or a spinner
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { minWidth: 220 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1">Hello {user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.phone}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>Orders</MenuItem>
        <MenuItem onClick={handleClose}>Wishlist</MenuItem>
        <MenuItem onClick={handleClose}>Gift Cards</MenuItem>
        <MenuItem onClick={handleClose}>Contact Us</MenuItem>
        <MenuItem onClick={handleClose}>
          Myntra Insider{" "}
          <Typography component="span" color="error">
            New
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
