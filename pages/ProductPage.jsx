import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Chip,
  Breadcrumbs,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  TextField,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RatingsSection from "../src/components/RatingsSection";
import ShopTheLook from "../src/components/ShopTheLook";
import WishlistIcon from "../src/components/WishlistIcon";

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  const [pincode, setPincode] = useState("");
  const [pinError, setPinError] = useState("");
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [isPincodeConfirmed, setIsPincodeConfirmed] = useState(false);

  // Viewer & zoom state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [similarProducts, setSimilarProducts] = useState([]);

  // NEW: Selected size/color state
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [colorError, setColorError] = useState("");

  useEffect(() => {
    if (!product) return;

    const lastCategory = product.categoryPath
      .split(">")
      .pop()
      .trim()
      .toLowerCase();

    const fetchSimilar = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/products/similar/${lastCategory}`
      );
      if (res.data.ok) {
        setSimilarProducts(res.data.products);
      }
    };

    fetchSimilar();
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/slug/${slug}`
        );
        if (res.data.ok) {
          setProduct(res.data.product);
          // Reset selection when product changes
          setSelectedSize(null);
          setSelectedColor(null);
          setSizeError("");
          setColorError("");
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) return <Typography>Loading...</Typography>;

  const handleCheckPincode = () => {
    // If already confirmed, this acts as "Change"
    if (isPincodeConfirmed) {
      setIsPincodeConfirmed(false);
      setShowDeliveryInfo(false);
      setPincode("");
      setPinError("");
      return;
    }

    // Otherwise, validate and "Check"
    if (!pincode) {
      setPinError("Please enter a pincode");
      setShowDeliveryInfo(false);
      setIsPincodeConfirmed(false);
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setPinError("Please enter a valid 6-digit pincode");
      setShowDeliveryInfo(false);
      setIsPincodeConfirmed(false);
      return;
    }

    setPinError("");
    setShowDeliveryInfo(true);
    setIsPincodeConfirmed(true);

    // later: call API here if needed
  };

  // NEW: Add to cart handler
  const handleAddToBag = () => {
    let hasError = false;

    if (!selectedSize) {
      setSizeError("Please select a size");
      hasError = true;
    }
    if (product.colorOptions?.length && !selectedColor) {
      setColorError("Please select a color");
      hasError = true;
    }

    if (hasError) return;

    // You can replace this with your cart API / context logic
    const cartItem = {
      productId: product._id,
      slug: product.slug,
      title: product.title,
      brand: product.brand,
      price: product.price,
      selectedSize,
      selectedColor,
      quantity: 1,
      image: product.images?.[0] || "",
    };

    console.log("Add to cart item:", cartItem);
    // e.g. await axios.post("/api/cart", cartItem);
  };

  const {
    title,
    images = [],
    price,
    mrp,
    discountPercent,
    brand,
    sizeOptions,
    colorOptions,
    ratings,
    specifications,
    materialCare,
    categoryPath,
  } = product;

  // helper to clamp index
  const prevIndex = () =>
    setActiveIndex((idx) => (idx > 0 ? idx - 1 : images.length - 1));
  const nextIndex = () =>
    setActiveIndex((idx) => (idx < images.length - 1 ? idx + 1 : 0));
  const originalPrice = Math.round(
    product.price / (1 - (product.discountPercent || 0) / 100)
  );

  return (
    <Box
      sx={{
        maxWidth: "1600px",
        mx: "auto",
        pt: 3,
        pb: 6,
        px: { xs: 2, md: 0 },
        fontFamily:
          '"Assistant", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* BREADCRUMBS */}
      <Breadcrumbs sx={{ mb: 3, fontSize: 13 }}>
        {categoryPath.split(">").map((cat, index) => {
          const trimmed = cat.trim();
          const slug = trimmed.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link
              key={index}
              component={RouterLink}
              to={`/category/${slug}`}
              underline="hover"
              sx={{ color: "#696e79", fontSize: 12 }}
            >
              {trimmed}
            </Link>
          );
        })}

        {/* Current Product (no link) */}
        <Typography sx={{ fontSize: 12, color: "#282c3f" }}>{title}</Typography>
      </Breadcrumbs>
      {/* MAIN LAYOUT (NO GRID) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* LEFT: IMAGES */}
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "60%" },
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 4,
              columnGap: 0,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {images.map((img, index) => (
              <Box
                key={index}
                sx={{
                  maxWidth: "445px",
                  width: "100%",
                  height: {
                    xs: "auto",
                    md: "612px",
                  },
                  aspectRatio: { xs: "3 / 4", md: "auto" },
                  borderRadius: 1,
                  overflow: "hidden",
                  border: "1px solid #e9e9eb",
                  backgroundColor: "#f5f5f6",
                  mx: { xs: "auto", md: 0 },
                }}
              >
                {/* ================= Myntra-style magnifier inside the box ================= */}
                <Box
                  onClick={() => {
                    // open fullscreen viewer on click
                    setActiveIndex(index);
                    setViewerOpen(true);
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    cursor: { xs: "default", md: "zoom-in" },
                    overflow: "hidden",
                    "&:hover": {
                      transform: "scale(1.08)",
                    },
                  }}
                  onMouseMove={(e) => {
                    if (!e || !e.currentTarget) return;
                    const imgEl = e.currentTarget.querySelector("img");
                    if (!imgEl) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    const cx = Math.max(0, Math.min(100, x));
                    const cy = Math.max(0, Math.min(100, y));
                    imgEl.style.transformOrigin = `${cx}% ${cy}%`;
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={title}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.18s ease-out",
                      transform: "scale(1)",
                      pointerEvents: "none",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* RIGHT: DETAILS */}
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "40%" },
            width: { xs: "100%", md: "100%", lg: "642px" },
          }}
        >
          {/* Brand + Title */}
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: "#282c3f",
            }}
          >
            {brand}
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              fontSize: 20,
              fontWeight: 400,
              color: "#535766",
            }}
          >
            {title}
          </Typography>

          {/* Ratings */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              mt: 1.5,
              border: "1px solid #eaeaec",
              px: 1,
              py: 0.3,
              borderRadius: 1,
              gap: 0.6,
            }}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: 700, color: "#282c3f" }}
            >
              {ratings?.average?.toFixed(1) || "4.0"}
            </Typography>
            <StarIcon sx={{ fontSize: "medium", color: "#14958f" }} />
            <Typography
              sx={{ fontSize: 16, fontWeight: 400, color: "#535766" }}
            >
              | {ratings?.totalCount} Ratings
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Price block */}
          <Box sx={{ mt: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography
                sx={{ fontSize: 24, fontWeight: 700, color: "#282c3f" }}
              >
                ₹{price}
              </Typography>
              <Typography
                sx={{ fontSize: 20, fontWeight: 400, color: "#7e818c" }}
              >
                MRP
              </Typography>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: "#7e818c",
                  textDecoration: "line-through",
                }}
              >
                {mrp}
              </Typography>
              <Typography
                sx={{ fontSize: 20, fontWeight: 700, color: "#ff905a" }}
              >
                ({discountPercent}% OFF)
              </Typography>
            </Box>
            <Typography
              sx={{ mt: 0.5, fontSize: 14, color: "#03a685", fontWeight: 700 }}
            >
              inclusive of all taxes
            </Typography>
          </Box>

          {/* Colors (clickable) */}
          {colorOptions?.length > 0 && (
            <>
              <Typography
                sx={{
                  mt: 3,
                  mb: 1,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  color: "#282c3f",
                  textTransform: "uppercase",
                }}
              >
                More Colors
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 0.5 }}>
                {colorOptions.map((color) => {
                  const isActive = selectedColor === color;
                  return (
                    <Chip
                      key={color}
                      label={color}
                      size="small"
                      onClick={() => {
                        setSelectedColor(color);
                        setColorError("");
                      }}
                      sx={{
                        fontSize: 11,
                        borderRadius: 1,
                        borderColor: isActive ? "#ff3f6c" : "#d4d5d9",
                        color: isActive ? "#ff3f6c" : "#282c3f",
                        backgroundColor: isActive ? "#fff0f5" : "#fff",
                        "&:hover": {
                          borderColor: "#ff3f6c",
                        },
                      }}
                      variant={isActive ? "filled" : "outlined"}
                    />
                  );
                })}
              </Box>
              {colorError && (
                <Typography sx={{ fontSize: 12, color: "#ff3f6c", mb: 1 }}>
                  {colorError}
                </Typography>
              )}
            </>
          )}

          {/* Size selection */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 2 }}>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 0.4,
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              Select Size
            </Typography>
            <Typography
              sx={{
                ml: 2,
                fontSize: 14,
                fontWeight: 700,
                color: "#ff3f6c",
                cursor: "pointer",
              }}
            >
              SIZE CHART {">"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {sizeOptions?.map((size) => {
              const isActive = selectedSize === size;
              return (
                <Chip
                  key={size}
                  label={size}
                  clickable
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError("");
                  }}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: isActive
                      ? "2px solid #ff3f6c"
                      : "1px solid #bfc0c6",
                    fontSize: 14,
                    fontWeight: 700,
                    color: isActive ? "#ff3f6c" : "#282c3f",
                    backgroundColor: isActive ? "#fff0f5" : "#fff",
                    "&:hover": {
                      borderColor: "#282c3f",
                      backgroundColor: "#f5f5f6",
                    },
                  }}
                />
              );
            })}
          </Box>
          {sizeError && (
            <Typography sx={{ fontSize: 12, color: "#ff3f6c", mt: 0.5 }}>
              {sizeError}
            </Typography>
          )}

          {/* Buttons */}
          <Box
            sx={{
              width: "100%",
              mt: 3,
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleAddToBag}
              sx={{
                backgroundColor: "#ff3f6c",
                "&:hover": { backgroundColor: "#ff3e6c" },
                px: 6,
                py: 1.4,
                width: "313.5px",
                height: "54px",
                fontSize: 16,
                fontWeight: 700,
                borderRadius: "5px",
                textTransform: "uppercase",
                boxShadow: "none",
                color: "#fff",
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ShoppingBagIcon fontSize="medium" />
              Add to Bag
            </Button>

            {/* <Button
              variant="outlined"
              sx={{
                borderColor: "#d4d5d9",
                color: "#282c3f",
                width: "209px",
                px: 6,
                py: 1.4,
                fontSize: 16,
                fontWeight: 700,
                borderRadius: "5px",
                textTransform: "uppercase",
                backgroundColor: "#fff",
                "&:hover": {
                  borderColor: "#282c3f",
                  backgroundColor: "#f5f5f6",
                },
                gap: 0.5,
              }}
            >
              <FavoriteBorderIcon fontSize="medium" /> Wishlist
            </Button> */}
            <WishlistIcon productId={product._id} />
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* DELIVERY OPTIONS (HARDCODED) */}
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 0,
                  textTransform: "uppercase",
                  color: "#282c3f",
                }}
              >
                Delivery Options
              </Typography>
              <LocalShippingOutlinedIcon sx={{ ml: 1, fontSize: 23 }} />
            </Box>

            {/* Pincode input */}
            <Box
              sx={{
                maxWidth: 250,
              }}
            >
              <TextField
                size="small"
                placeholder="Enter pincode"
                fullWidth
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                  if (pinError) setPinError("");
                }}
                error={Boolean(pinError)}
                helperText={pinError || " "}
                FormHelperTextProps={{
                  sx: {
                    mt: 0,
                    fontSize: 11,
                    lineHeight: 1.2,
                    "& .MuiInputBase-input::placeholder": {
                      color: "#000",
                      fontSize: 16,
                      fontWeight: 400,
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    borderRadius: "5px",
                    cursor: "text",
                    "& .MuiOutlinedInput-input": {
                      paddingRight: 0,
                    },
                  },
                  endAdornment: (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={handleCheckPincode}
                      sx={{
                        ml: 1,
                        borderRadius: 0,
                        color: "#ff3f6c",
                        height: "auto",
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: 13,
                        backgroundColor: "#FFF",
                        boxShadow: "none",
                        "&:hover": { backgroundColor: "#FFF" },
                      }}
                    >
                      {isPincodeConfirmed ? "Change" : "Check"}
                    </Button>
                  ),
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 400,
                color: "#282c3f",
                mb: 2,
                opacity: 0.5,
              }}
            >
              Please enter PIN code to check delivery time &amp; Pay on Delivery
              Availability
            </Typography>

            {/* DELIVERY INFO – shown only after valid pincode */}
            {showDeliveryInfo && (
              <Box sx={{ mb: 3 }}>
                {/* 1st row: Get it by ... */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  {/* You can swap to a custom svg/icon if you want */}
                  <LocalShippingOutlinedIcon
                    sx={{ fontSize: 20, color: "#282c3f" }}
                  />
                  <Typography sx={{ fontSize: 13, color: "#282c3f" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      Get it by Fri, Nov 21
                    </Box>
                  </Typography>
                </Box>

                {/* 2nd row: Pay on delivery */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  {/* simple placeholder icon; change to whatever you like */}
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "2px",
                      border: "1px solid #c3c2c9",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: "#282c3f" }}
                  >
                    Pay on delivery available
                  </Typography>
                </Box>

                {/* 3rd row: Returns + More info link */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 1.2,
                  }}
                >
                  {/* another placeholder icon for arrows */}
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "2px",
                      border: "1px solid #c3c2c9",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#282c3f",
                      flexGrow: 1,
                    }}
                  >
                    Easy 14 days return &amp; exchange available
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#ff3f6c",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    More info &gt;
                  </Typography>
                </Box>

                {/* optional: extra line like in your first image */}
                <Typography sx={{ fontSize: 13, color: "#282c3f" }}>
                  100% Original Products
                </Typography>
              </Box>
            )}

            {!showDeliveryInfo && (
              <List sx={{ p: 0, mb: 3, lineHeight: 1.2, mt: 3 }}>
                <ListItem sx={{ py: 0.3, px: 0 }}>
                  <Typography
                    sx={{ fontSize: 15, color: "#282c3f", fontWeight: 400 }}
                  >
                    100% Original Products
                  </Typography>
                </ListItem>
                <ListItem sx={{ py: 0.3, px: 0 }}>
                  <Typography
                    sx={{ fontSize: 15, color: "#282c3f", fontWeight: 400 }}
                  >
                    Pay on delivery might be available
                  </Typography>
                </ListItem>
                <ListItem sx={{ py: 0.3, px: 0 }}>
                  <Typography
                    sx={{ fontSize: 15, color: "#282c3f", fontWeight: 400 }}
                  >
                    Easy 14 days returns and exchanges
                  </Typography>
                </ListItem>
              </List>
            )}
          </Box>

          {/* BEST OFFERS (HARDCODED) */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                lineHeight: "16px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  color: "#282c3f",
                }}
              >
                Best Offers
              </Typography>
              <LocalOfferOutlinedIcon sx={{ ml: 1, fontSize: 20 }} />
            </Box>

            <Typography
              sx={{ fontSize: 15, fontWeight: 700, color: "#282c3f", mb: 0.5 }}
            >
              Best Price:{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "#ff905a" }}>
                Rs. 349
              </Box>
            </Typography>

            <List sx={{ p: 0, mb: 1.5, ml: 2.5 }}>
              <ListItem
                sx={{
                  py: 0.2,
                  px: 0,
                  display: "list-item",
                  listStyleType: "disc",
                }}
              >
                <Typography sx={{ fontSize: 15, color: "#282c3f" }}>
                  Applicable on: Orders above Rs. 349 (only on first purchase)
                </Typography>
              </ListItem>
              <ListItem
                sx={{
                  py: 0.2,
                  px: 0,
                  display: "list-item",
                  listStyleType: "disc",
                }}
              >
                <Typography sx={{ fontSize: 15, color: "#282c3f" }}>
                  Coupon code:{" "}
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    MYNTRAEXCLUSIVE
                  </Box>
                </Typography>
              </ListItem>
              <ListItem
                sx={{
                  py: 0.2,
                  px: 0,
                  display: "list-item",
                  listStyleType: "disc",
                }}
              >
                <Typography sx={{ fontSize: 15, color: "#282c3f" }}>
                  Coupon Discount: 30% off (Your total saving: Rs. 1450)
                </Typography>
              </ListItem>
            </List>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: "#ff3f6c",
                mb: 2,
                cursor: "pointer",
              }}
            >
              View Eligible Products
            </Typography>

            <Typography
              sx={{ fontSize: 16, fontWeight: 700, color: "#282c3f", mb: 0.5 }}
            >
              10% Instant Discount on IDFC FIRST Bank Debit Card
            </Typography>
            <List sx={{ p: 0, mb: 1.5 }}>
              <ListItem
                sx={{
                  py: 0.2,
                  px: 0,
                  display: "list-item",
                  listStyleType: "disc",
                  ml: 2.5,
                  width: "350px",
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#282c3f" }}>
                  Min Spend ₹3,000, Max Discount ₹1,000
                </Typography>
              </ListItem>
            </List>

            <Typography
              sx={{ fontSize: 16, fontWeight: 700, color: "#282c3f", mb: 0.5 }}
            >
              10% Instant Discount on PNB Credit Card
            </Typography>
            <List sx={{ p: 0, mb: 1.5 }}>
              <ListItem
                sx={{
                  py: 0.2,
                  px: 0,
                  display: "list-item",
                  listStyleType: "disc",
                  ml: 2.5,
                  width: "350px",
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#282c3f" }}>
                  Min Spend ₹3,000, Max Discount ₹1,000
                </Typography>
              </ListItem>
            </List>

            <Typography
              sx={{ fontSize: 16, fontWeight: 700, color: "#282c3f", mb: 0.5 }}
            >
              7.5% Assured Cashback on Flipkart Axis Bank Credit Card.
            </Typography>
            <List sx={{ p: 0, mb: 1.5 }}>
              <ListItem
                sx={{
                  py: 0.2,
                  px: 0,
                  display: "list-item",
                  listStyleType: "disc",
                  ml: 2.5,
                  width: "350px",
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#282c3f" }}>
                  Maximum cashback: INR 4,000 per quarter; Cashback is not
                  applicable on transactions less than INR 100
                </Typography>
              </ListItem>
            </List>

            <Typography
              sx={{ fontSize: 16, fontWeight: 700, color: "#282c3f", mb: 0.5 }}
            >
              7.5% Assured Cashback on Flipkart SBI Credit Card.
            </Typography>
            <List sx={{ p: 0, mb: 1.5 }}>
              <ListItem
                sx={{
                  py: 0.2,
                  px: 0,
                  display: "list-item",
                  listStyleType: "disc",
                  ml: 2.5,
                  width: "350px",
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#282c3f" }}>
                  Maximum cashback: INR 4,000 per quarter; Cashback is not
                  applicable on transactions less than INR 100
                </Typography>
              </ListItem>
            </List>

            <Typography
              sx={{ fontSize: 16, fontWeight: 700, color: "#282c3f", mb: 0.5 }}
            >
              EMI option available
            </Typography>
            <List sx={{ p: 0, mb: 0.5 }}>
              <ListItem
                sx={{
                  py: 0.2,
                  px: 0,
                  display: "list-item",
                  listStyleType: "disc",
                  ml: 2.5,
                  width: "350px",
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#282c3f" }}>
                  EMI starting from Rs.24/month
                </Typography>
              </ListItem>
            </List>

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: "#ff3f6c",
                cursor: "pointer",
              }}
            >
              View Plan
            </Typography>
          </Box>

          <Divider sx={{ mt: 3, mb: 4 }} />

          {/* ---------------- PRODUCT DETAILS HEADER ---------------- */}
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#282c3f",
              mb: 1.5,
            }}
          >
            Product Details
          </Typography>

          {/* ---------------- BUILD PRODUCT DESCRIPTION ---------------- */}
          {(() => {
            const productDescription = [];

            if (specifications?.sleeveLength)
              productDescription.push(specifications.sleeveLength);

            if (specifications?.collar)
              productDescription.push(specifications.collar);

            if (specifications?.length)
              productDescription.push(specifications.length + " length");

            if (specifications?.hemline)
              productDescription.push(specifications.hemline + " hemline");

            if (specifications?.placket)
              productDescription.push(specifications.placket);

            if (specifications?.weavePattern)
              productDescription.push(specifications.weavePattern + " fabric");

            return (
              <Box sx={{ mb: 2 }}>
                {productDescription.map((line, i) => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#282c3f",
                      mb: 0.3,
                    }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            );
          })()}

          {/* ---------------- SIZE & FIT ---------------- */}
          <Typography
            sx={{ fontSize: 15, fontWeight: 700, color: "#282c3f", mb: 0.5 }}
          >
            Size & Fit
          </Typography>

          {specifications?.fit && (
            <Typography
              sx={{ fontSize: 15, fontWeight: 400, color: "#282c3f", mb: 0.3 }}
            >
              {specifications.fit}
            </Typography>
          )}

          {/* ---------------- MATERIAL & CARE ---------------- */}
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "#282c3f",
              mt: 2,
              mb: 1,
            }}
          >
            Material & Care
          </Typography>

          {specifications?.weavePattern && (
            <Typography
              sx={{ fontSize: 15, fontWeight: 400, color: "#282c3f", mb: 0.3 }}
            >
              {specifications.weavePattern}
            </Typography>
          )}

          <Typography
            sx={{ fontSize: 15, fontWeight: 400, color: "#282c3f", mb: 0.3 }}
          >
            Machine Wash
          </Typography>

          {/* ---------------- SPECIFICATIONS TITLE ---------------- */}
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#282c3f",
              mt: 3,
              mb: 1,
            }}
          >
            Specifications
          </Typography>

          {/* ---------------- SPECIFICATIONS GRID ---------------- */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 4,
            }}
          >
            {Object.entries(specifications || {}).map(([key, value]) => (
              <Box
                key={key}
                sx={{
                  borderBottom: "1px solid #d4d5d9",
                  py: 1.5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#535766",
                    mb: 0.5,
                    textTransform: "capitalize",
                    opacity: 0.4,
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1")}{" "}
                </Typography>

                <Typography sx={{ fontSize: 16, color: "#282c3f" }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Material & Care */}
          <Typography
            sx={{
              mt: 3,
              fontSize: 16,
              fontWeight: 700,
              color: "#282c3f",
              mb: 0.5,
            }}
          >
            Material &amp; Care
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#535766" }}>
            {materialCare}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <RatingsSection />

          <Divider sx={{ my: 4 }} />

          {/* ---------------- CUSTOMER REVIEWS SECTION ---------------- */}
          {product?.images?.length > 0 && (
            <Box mt={4}>
              <Typography sx={{ fontSize: "16px" }} fontWeight="bold" mb={2}>
                Customer Photos ({product.images.slice(0, 3).length})
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                {product.images.slice(0, 3).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Customer"
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </Box>

              <Typography
                mb={2}
                sx={{ fontSize: 16, fontWeight: 600, color: "#282c3f" }}
              >
                Customer Reviews (364)
              </Typography>

              {/* ----------- Review 1 ----------- */}
              <Box
                mb={4}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {/* Rating Box */}
                <Box
                  sx={{
                    background: "#e6f4ea",
                    color: "#1c7b33",
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: "bold",
                    fontSize: "14px",
                    minWidth: 45,
                    textAlign: "center",
                  }}
                >
                  5★
                </Box>

                {/* Right Side (Text + Photos + Meta) */}
                <Box sx={{ flex: 1, minWidth: 300 }}>
                  {/* Review Text */}
                  <Typography
                    mt={0.5}
                    color="text.secondary"
                    sx={{ width: "100%", maxWidth: 600, lineHeight: 1.6 }}
                  >
                    I’m really impressed with this t-shirt! The fabric is soft,
                    breathable, and feels high-quality. Lightweight and
                    comfortable all day. The stitching is solid and it held up
                    perfectly after multiple washes with no shrinkage or fading.
                    Highly recommend this if you're looking for a dependable
                    everyday tee!
                  </Typography>

                  {/* Photos */}
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    {product.images.slice(0, 2).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Review"
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 4,
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </Box>

                  {/* Customer + Date */}
                  <Typography mt={1.5} variant="body2" color="grey.600">
                    Myntra Customer | 8 Aug 2025
                  </Typography>

                  {/* Reactions */}
                  <Box
                    mt={1}
                    sx={{ display: "flex", gap: 2, color: "grey.600" }}
                  >
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      👍 3
                    </Typography>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      👎 1
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* ----------- Review 2 ----------- */}
              <Box
                mb={4}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {/* Rating Box */}
                <Box
                  sx={{
                    background: "#e6f4ea",
                    color: "#1c7b33",
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: "bold",
                    fontSize: "14px",
                    minWidth: 45,
                    textAlign: "center",
                  }}
                >
                  5★
                </Box>

                {/* Right Side (Text + Photos + Meta) */}
                <Box sx={{ flex: 1, minWidth: 300 }}>
                  {/* Review Text */}
                  <Typography
                    mt={0.5}
                    color="text.secondary"
                    sx={{ width: "100%", maxWidth: 600, lineHeight: 1.6 }}
                  >
                    I’m really impressed with this t-shirt! The fabric is soft,
                    breathable, and feels high-quality. Lightweight and
                    comfortable all day. The stitching is solid and it held up
                    perfectly after multiple washes with no shrinkage or fading.
                    Highly recommend this if you're looking for a dependable
                    everyday tee!
                  </Typography>

                  {/* Photos */}
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    {product.images.slice(0, 2).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Review"
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 4,
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </Box>

                  {/* Customer + Date */}
                  <Typography mt={1.5} color="grey.600">
                    Myntra Customer | 8 Aug 2025
                  </Typography>

                  {/* Reactions */}
                  <Box
                    mt={1}
                    sx={{ display: "flex", gap: 2, color: "grey.600" }}
                  >
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      👍 3
                    </Typography>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      👎 1
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* ----------- View All Button ----------- */}
              <Button
                width="200px"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  color: "#ff3f6c",
                  fontWeight: 400,
                }}
              >
                View All Reviews
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {/* ========== Fullscreen Viewer Modal ========== */}
      {viewerOpen && images?.length > 0 && (
        <Box
          onClick={() => setViewerOpen(false)}
          sx={{
            position: "fixed",
            width: "60%",
            inset: 0,
            zIndex: 3000,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 1, md: 4 },
            ml: 50,
          }}
        >
          {/* Prevent modal content clicks from closing */}
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              width: { xs: "100%", md: "85%" },
              height: { xs: "92%", md: "88%" },
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close */}
            <Box
              onClick={() => setViewerOpen(false)}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 40,
                height: 40,
                borderRadius: "6px",
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                zIndex: 5,
              }}
            >
              ✕
            </Box>

            {/* Left thumbnails (vertical) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                gap: 1,
                zIndex: 4000,
                alignItems: "center",
                overflowY: "auto",
                maxHeight: "80vh",
                pr: 1,
                position: "absolute",
                left: "180px",
                top: "0",
              }}
            >
              {images.map((thumb, i) => (
                <Box
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  sx={{
                    width: 64,
                    height: 84,
                    borderRadius: 1,
                    overflow: "hidden",
                    cursor: "pointer",
                    border:
                      activeIndex === i
                        ? "2px solid #fff"
                        : "1px solid rgba(255,255,255,0.2)",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    src={thumb}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Prev arrow on left for mobile too */}
            {activeIndex > 0 && (
              <Box
                onClick={() => prevIndex()}
                sx={{
                  position: "absolute",
                  left: { xs: 8, md: "8%" },
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 46,
                  height: 46,
                  background: "#fff",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 5,
                }}
              >
                ←
              </Box>
            )}

            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "100%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={images[activeIndex]}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxHeight: "100vh",
                    maxWidth: "100%",
                  }}
                />
              </Box>
            </Box>

            {/* Next arrow */}
            {activeIndex < images.length - 1 && (
              <Box
                onClick={() => nextIndex()}
                sx={{
                  position: "absolute",
                  right: { xs: 8, md: "8%" },
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 46,
                  height: 46,
                  background: "#fff",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 5,
                }}
              >
                →
              </Box>
            )}
          </Box>
        </Box>
      )}
      {/* similar items container*/}
      <Box sx={{ mt: 8, mx: 2 }}>
        <Typography
          fontWeight={700}
          sx={{
            mb: 3,
            fontSize: "16px",
            color: "#282c3f",
            textTransform: "uppercase",
          }}
        >
          Similar Products
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // mobile (2)
              sm: "repeat(3, 1fr)", // tablet (3)
              md: "repeat(6, 1fr)", // small desktop (4)
              lg: "repeat(7, 1fr)",
            },
            gap: { xs: 2, sm: 3, md: 2 }, // responsive spacing
          }}
        >
          {similarProducts.map((item) => {
            const originalPrice = Math.round(
              (item.price * 100) / (100 - item.discountPercent)
            );

            return (
              <Link
                key={item._id}
                to={`/product/${item.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    border: "1px solid #eee",
                    overflow: "hidden",
                    cursor: "pointer",
                    bgcolor: "#fff",
                    transition: "0.2s",
                    width: "195px",
                  }}
                >
                  {/* IMAGE */}
                  <Box
                    sx={{
                      width: "195px",
                      height: {
                        xs: "200px",
                        sm: "230px",
                        md: "250px",
                        lg: "270px",
                      },
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#fafafa",
                    }}
                  >
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* TEXT */}
                  <Box sx={{ p: 1.2 }}>
                    <Typography fontWeight={700} fontSize={15}>
                      {item.brand}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: 13, flexWrap: "wrap" }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      fontWeight={700}
                      sx={{ mt: 0.5, display: "flex", alignItems: "center" }}
                    >
                      ₹{item.price}
                      <Box
                        component="span"
                        sx={{
                          fontSize: 12,
                          color: "#888",
                          textDecoration: "line-through",
                          ml: 1,
                        }}
                      >
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          color: "green",
                          ml: 1,
                          fontSize: 12,
                        }}
                      >
                        ({item.discountPercent}% OFF)
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
