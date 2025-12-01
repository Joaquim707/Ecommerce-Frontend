import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  Button,
  IconButton,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Divider,
  Collapse,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  LocalOffer as LocalOfferIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const BagPage = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showOffers, setShowOffers] = useState(false);
  const [donationAmount, setDonationAmount] = useState(null);

  // Modal states
  const [pincodeModalOpen, setPincodeModalOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [wishlistConfirmModalOpen, setWishlistConfirmModalOpen] =
    useState(false);

  // Modal data
  const [pinCode, setPinCode] = useState("");
  const [tempPinCode, setTempPinCode] = useState("");
  const [selectedItemForChange, setSelectedItemForChange] = useState(null);
  const [tempSize, setTempSize] = useState("");
  const [tempQuantity, setTempQuantity] = useState(1);
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load cart");

      setCartItems(data.items || []);
      const allIds = (data.items || []).map(
        (item, idx) =>
          `${item.productId?._id}-${item.size}-${item.color}-${idx}`
      );
      setSelectedItems(new Set(allIds));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, size, newQty) => {
    if (newQty < 1 || newQty > 6) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size, qty: newQty }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update quantity");
      }

      fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const updateSize = async (productId, oldSize, newSize, color) => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size: oldSize }),
      });

      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          size: newSize,
          color: color || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update size");
      }

      fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const removeItem = async (productId, size) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to remove item");
      }

      fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to add to wishlist");
      }

      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const removeSelectedItems = async () => {
    try {
      const itemsToRemove = cartItems.filter((item, idx) => {
        const itemId = `${item.productId?._id}-${item.size}-${item.color}-${idx}`;
        return selectedItems.has(itemId);
      });

      for (const item of itemsToRemove) {
        await removeItem(item.productId._id, item.size);
      }

      setRemoveModalOpen(false);
      fetchCart();
    } catch (err) {
      alert("Failed to remove items");
    }
  };

  const moveSelectedToWishlist = async () => {
    try {
      const itemsToMove = cartItems.filter((item, idx) => {
        const itemId = `${item.productId?._id}-${item.size}-${item.color}-${idx}`;
        return selectedItems.has(itemId);
      });

      // Add to wishlist first
      for (const item of itemsToMove) {
        await addToWishlist(item.productId._id);
      }

      // Then remove from cart
      for (const item of itemsToMove) {
        await removeItem(item.productId._id, item.size);
      }

      setWishlistConfirmModalOpen(false);
      setRemoveModalOpen(false);
      fetchCart();
      alert("Items moved to wishlist successfully!");
    } catch (err) {
      if (
        err?.response?.data?.message?.includes("already exists") ||
        err?.response?.data?.error?.includes("already exists")
      ) {
        alert("Item already in wishlist — skipping");
      } else {
        alert("Failed to add to wishlist:", err);
      }
    }
  };

  const toggleItemSelection = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const toggleAllItems = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      const allIds = cartItems.map(
        (item, idx) =>
          `${item.productId?._id}-${item.size}-${item.color}-${idx}`
      );
      setSelectedItems(new Set(allIds));
    }
  };

  // Modal handlers
  const handleOpenPincodeModal = () => {
    setTempPinCode(pinCode);
    setPincodeModalOpen(true);
  };

  const handleClosePincodeModal = () => {
    setPincodeModalOpen(false);
  };

  const handleSavePincode = () => {
    setPinCode(tempPinCode);
    setPincodeModalOpen(false);
    alert(`Checking delivery for pincode: ${tempPinCode}`);
  };

  const handleOpenSizeModal = (item, product) => {
    setSelectedItemForChange({ item, product });
    setTempSize(item.size);
    setSizeModalOpen(true);
  };

  const handleCloseSizeModal = () => {
    setSizeModalOpen(false);
    setSelectedItemForChange(null);
  };

  const handleSaveSize = async () => {
    if (!selectedItemForChange || !tempSize) return;

    const { item, product } = selectedItemForChange;
    if (tempSize !== item.size) {
      await updateSize(product._id, item.size, tempSize, item.color);
    }
    handleCloseSizeModal();
  };

  const handleOpenQuantityModal = (item, product) => {
    setSelectedItemForChange({ item, product });
    setTempQuantity(item.quantity);
    setQuantityModalOpen(true);
  };

  const handleCloseQuantityModal = () => {
    setQuantityModalOpen(false);
    setSelectedItemForChange(null);
  };

  const handleSaveQuantity = async () => {
    if (!selectedItemForChange) return;

    const { item, product } = selectedItemForChange;
    if (tempQuantity !== item.quantity) {
      await updateQuantity(product._id, item.size, tempQuantity);
    }
    handleCloseQuantityModal();
  };

  const handleOpenRemoveModal = () => {
    if (selectedItems.size === 0) {
      alert("Please select items to remove");
      return;
    }
    setRemoveModalOpen(true);
  };

  const handleCloseRemoveModal = () => {
    setRemoveModalOpen(false);
  };

  const handleOpenWishlistConfirm = () => {
    setWishlistConfirmModalOpen(true);
  };

  const handleCloseWishlistConfirm = () => {
    setWishlistConfirmModalOpen(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item, idx) => {
      const itemId = `${item.productId?._id}-${item.size}-${item.color}-${idx}`;
      if (!selectedItems.has(itemId)) return total;
      const price = item.productId?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateMRP = () => {
    return cartItems.reduce((total, item, idx) => {
      const itemId = `${item.productId?._id}-${item.size}-${item.color}-${idx}`;
      if (!selectedItems.has(itemId)) return total;
      const MRP = item.productId?.mrp || item.productId?.price || 0;
      return total + MRP * item.quantity;
    }, 0);
  };

  const calculateDiscount = () => {
    return calculateMRP() - calculateTotal();
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setPlacingOrder(true);

      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Failed to fetch cart:", txt);
        alert("Failed to fetch cart. Try again.");
        setPlacingOrder(false);
        return;
      }

      const body = await res.json();

      const cartItems =
        Array.isArray(body.cart) && body.cart.length
          ? body.cart
          : Array.isArray(body.items) && body.items.length
          ? body.items
          : Array.isArray(body)
          ? body
          : [];

      if (!cartItems.length) {
        alert("Your cart is empty");
        setPlacingOrder(false);
        return;
      }

      let totalMRP = 0;
      let totalAmount = 0;
      let itemsCount = 0;

      cartItems.forEach((item) => {
        const product = item.product || item.productId || item.productDetails;
        if (!product) return;
        const qty = item.quantity ?? 1;
        totalMRP += (product.mrp ?? product.price ?? 0) * qty;
        totalAmount += (product.price ?? 0) * qty;
        itemsCount += qty;
      });

      const cartSummary = {
        totalMRP,
        discount: Math.max(0, totalMRP - totalAmount),
        platformFee: 0,
        totalAmount,
        itemsCount,
      };

      localStorage.setItem("orderCartSummary", JSON.stringify(cartSummary));

      const selectedAddressId = localStorage.getItem("selectedAddressId");
      if (selectedAddressId) {
        navigate("/payment");
      } else {
        navigate("/address", { state: { from: "/payment" } });
      }
    } catch (err) {
      console.error("Place order (bag) error:", err);
      alert("Failed to proceed to checkout. Check console.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "#ff3f6c" }} size={60} />
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            Loading your bag...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={fetchCart}
            sx={{ bgcolor: "#ff3f6c", "&:hover": { bgcolor: "#e63960" } }}
          >
            Retry
          </Button>
        </Box>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", maxWidth: 400, px: 2 }}>
          <Box component="img" position="relative" src={"/images/Bag.png"} />
          <Typography sx={{ fontWeight: 600, mb: 1, fontSize: "20px" }}>
            Hey, it feels so light!
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            There is nothing in your bag. Let's add some items.
          </Typography>
          <Button
            variant="contained"
            href="/wishlist"
            sx={{
              bgcolor: "#ff3f6c",
              "&:hover": { bgcolor: "#e63960" },
              px: 4,
              py: 1.5,
            }}
          >
            ADD ITEMS FROM WISHLIST
          </Button>
        </Box>
      </Box>
    );
  }

  const totalMRP = calculateMRP();
  const discount = calculateDiscount();
  const totalAmount = calculateTotal();
  const selectedCount = selectedItems.size;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={1}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          lg={8}
          sx={{
            borderRight: { lg: "1px solid #e0e0e0" },
            pr: { lg: 3 },
          }}
        >
          {/* Delivery Check */}
          <Card
            sx={{
              mb: 2,
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: "0",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  fontSize: "14px",
                }}
              >
                Check delivery time & services
              </Typography>
              <Button
                variant="outlined"
                onClick={handleOpenPincodeModal}
                sx={{
                  borderColor: "#ff3f6c",
                  color: "#ff3f6c",
                  fontWeight: 600,
                  "&:hover": { borderColor: "#e63960", bgcolor: "#fff5f7" },
                  fontSize: "12px",
                  py: 1,
                }}
              >
                ENTER PIN CODE
              </Button>
            </Box>
          </Card>

          {/* Available Offers */}
          <Card
            sx={{
              mb: 2,
              border: "1px solid #e0e0e0",
              borderRadius: "0",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                p: 2,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={() => setShowOffers(!showOffers)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocalOfferIcon sx={{ fontSize: 20 }} />
                <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                  Available Offers
                </Typography>
              </Box>
              {showOffers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={showOffers}>
              <Box sx={{ px: 2, pb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{ marginRight: 8, marginTop: 4, fontSize: "13px" }}
                  >
                    •
                  </span>
                  10% Instant Discount on BOBCARD Credit Card & Credit Card EMI
                  on a min spend of ₹3,500.
                  <Typography
                    component="span"
                    sx={{
                      color: "#ff3f6c",
                      fontWeight: 600,
                      ml: 0.5,
                      cursor: "pointer",
                    }}
                  >
                    TCA
                  </Typography>
                </Typography>
                <Button
                  size="small"
                  sx={{
                    color: "#ff3f6c",
                    fontWeight: 700,
                    textTransform: "none",
                    p: 0,
                    fontSize: "14px",
                  }}
                >
                  Show More ▼
                </Button>
              </Box>
            </Collapse>
          </Card>

          {/* Selection Header */}
          <Card sx={{ mb: 1, p: 2, boxShadow: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Checkbox
                  checked={selectedItems.size === cartItems.length}
                  onChange={toggleAllItems}
                  sx={{ "&.Mui-checked": { color: "#ff3f6c" } }}
                />
                <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
                  {selectedCount}/{cartItems.length} ITEMS SELECTED
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  size="small"
                  onClick={handleOpenRemoveModal}
                  disabled={selectedItems.size === 0}
                  sx={{
                    fontWeight: 600,
                    color:
                      selectedItems.size === 0
                        ? "text.disabled"
                        : "text.primary",
                    textTransform: "none",
                    fontSize: "12px",
                    "&:hover": {
                      color:
                        selectedItems.size === 0 ? "text.disabled" : "#ff3f6c",
                    },
                  }}
                >
                  REMOVE
                </Button>
                <Button
                  size="small"
                  onClick={handleOpenWishlistConfirm}
                  disabled={selectedItems.size === 0}
                  sx={{
                    fontWeight: 600,
                    color:
                      selectedItems.size === 0
                        ? "text.disabled"
                        : "text.primary",
                    textTransform: "none",
                    borderLeft: "1px solid #bdbdbd",
                    pl: 2,
                    fontSize: "12px",
                    "&:hover": {
                      color:
                        selectedItems.size === 0 ? "text.disabled" : "#ff3f6c",
                    },
                  }}
                >
                  MOVE TO WISHLIST
                </Button>
              </Box>
            </Box>
          </Card>

          {/* Cart Items */}
          {cartItems.map((item, index) => {
            const product = item.productId;
            if (!product) return null;
            const itemId = `${product._id}-${item.size}-${item.color}-${index}`;
            const isSelected = selectedItems.has(itemId);

            return (
              <Card
                key={itemId}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "0",
                  boxShadow: "none",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleItemSelection(itemId)}
                    sx={{
                      alignSelf: "flex-start",
                      "&.Mui-checked": { color: "#ff3f6c" },
                      position: "absolute",
                      zIndex: 5,
                    }}
                  />

                  <Link
                    to={`/product/${product.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      component="img"
                      position="relative"
                      src={product.images?.[0] || "/images/default.jpeg"}
                      alt={product.name}
                      sx={{
                        width: 111,
                        height: 148,
                        objectFit: "cover",
                        border: "1px solid #e0e0e0",
                        cursor: "pointer",
                      }}
                    />
                  </Link>

                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{ fontWeight: 600, mb: 0.5, fontSize: "13px" }}
                        >
                          {product.brand || "NOBERO"}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          sx={{ mb: 0.5, fontSize: "14px" }}
                        >
                          {product.name ||
                            "Printed Oversized Pure Cotton Drop-Shoulder Sleeves T-shirt"}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          sx={{ mb: 1.5, display: "block", fontSize: "12px" }}
                        >
                          Sold by:{" "}
                          {product.seller ||
                            "PRATHAM E COMMERCE PRIVATE LIMITED"}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mb: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              color="text.secondary"
                              sx={{ fontSize: "14px" }}
                            >
                              Size:
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => handleOpenSizeModal(item, product)}
                              sx={{
                                minWidth: "auto",
                                height: "25px",
                                px: 1.5,
                                py: 0.5,
                                border: "1px solid #e0e0e0",
                                color: "text.primary",
                                fontWeight: 600,
                                textTransform: "none",
                                "&:hover": { borderColor: "#ff3f6c" },
                                fontSize: "14px",
                              }}
                            >
                              {item.size} ▼
                            </Button>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px" }}
                              color="text.secondary"
                            >
                              Qty:
                            </Typography>
                            <Button
                              size="small"
                              onClick={() =>
                                handleOpenQuantityModal(item, product)
                              }
                              sx={{
                                minWidth: "auto",
                                height: "25px",
                                px: 1.5,
                                py: 0.5,
                                border: "1px solid #e0e0e0",
                                color: "text.primary",
                                fontWeight: 600,
                                fontSize: "14px",
                                textTransform: "none",
                                "&:hover": { borderColor: "#ff3f6c" },
                              }}
                            >
                              {item.quantity} ▼
                            </Button>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 700, fontSize: "14px" }}
                          >
                            ₹{product.price}
                          </Typography>
                          {product.mrp && product.mrp > product.price && (
                            <>
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  color: "text.disabled",
                                  fontSize: "14px",
                                }}
                              >
                                ₹{product.mrp}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#ff9800",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                }}
                              >
                                {product.discountPercent}% OFF
                              </Typography>
                            </>
                          )}
                        </Box>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: "12px" }}
                        >
                          📦 {item.returnPeriod || "14 days return available"}
                        </Typography>
                      </Box>

                      <IconButton
                        size="small"
                        onClick={() => removeItem(product._id, item.size)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Card>
            );
          })}

          {/* Add More From Wishlist */}
          <Card
            sx={{
              p: 2,
              border: "1px solid #e0e0e0",
              boxShadow: "none",
              cursor: "pointer",
              "&:hover": { borderColor: "#bdbdbd" },
            }}
            onClick={() => (window.location.href = "/wishlist")}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BookmarkBorderIcon />
                <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                  Add More From Wishlist
                </Typography>
              </Box>
              <Typography>›</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Right Section - Price Details */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              p: 2,
              boxShadow: "none",
              position: "sticky",
              top: 16,
            }}
          >
            {/* Coupons */}
            <Box sx={{ mb: 2, pb: 2 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "text.secondary",
                  display: "block",
                  mb: 1,
                }}
              >
                COUPONS
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalOfferIcon fontSize="small" />
                  <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                    Apply Coupons
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "#ff3f6c",
                    color: "#ff3f6c",
                    fontWeight: 600,
                    minWidth: "auto",
                    px: 2,
                    "&:hover": { borderColor: "#e63960", bgcolor: "#fff5f7" },
                    fontSize: "12px",
                  }}
                >
                  APPLY
                </Button>
              </Box>
            </Box>

            {/* Donation */}
            <Box sx={{ mb: 2, pb: 2 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  display: "block",
                  mb: 1,
                  fontSize: "12px",
                }}
              >
                SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Box sx={{ flex: 1, my: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      fontSize: "14px",
                      alignItems: "center",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Checkbox
                      size="small"
                      sx={{
                        p: 0,
                        mt: 0.5,
                      }}
                    />
                    Donate and make a difference
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mb: 1,
                      flexWrap: "wrap",
                      fontSize: "14px",
                    }}
                  >
                    {[10, 20, 50, 100].map((amount) => (
                      <Button
                        key={amount}
                        size="small"
                        variant="outlined"
                        onClick={() => setDonationAmount(amount)}
                        sx={{
                          minWidth: "auto",
                          borderColor:
                            donationAmount === amount ? "#ff3f6c" : "#e0e0e0",
                          color:
                            donationAmount === amount
                              ? "#ff3f6c"
                              : "text.primary",
                        }}
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </Box>
                  <Button
                    size="small"
                    sx={{
                      color: "#ff3f6c",
                      fontWeight: 600,
                      textTransform: "none",
                      p: 0,
                      fontSize: "14px",
                    }}
                  >
                    Know More
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Price Details */}
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  display: "block",
                  mb: 2,
                  fontSize: "12px",
                }}
              >
                PRICE DETAILS ({selectedCount}{" "}
                {selectedCount === 1 ? "Item" : "Items"})
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                  Total MRP
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                  ₹{totalMRP.toLocaleString()}
                </Typography>
              </Box>

              {discount > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                    Discount on MRP
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "#4caf50", fontWeight: 400 }}
                  >
                    -₹{discount.toLocaleString()}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                  Coupon Discount
                </Typography>
                <Button
                  size="small"
                  sx={{
                    color: "#ff3f6c",
                    fontSize: "14px",
                    fontWeight: 400,
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                  }}
                >
                  Apply Coupon
                </Button>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                    Platform Fee
                  </Typography>
                  <Button
                    size="small"
                    sx={{
                      color: "#ff3f6c",
                      fontWeight: 400,
                      fontSize: "14px",
                      textTransform: "none",
                      p: 0,
                      minWidth: "auto",
                    }}
                  >
                    Know More
                  </Button>
                </Box>
                <Typography
                  sx={{ fontSize: "14px", color: "#4caf50", fontWeight: 600 }}
                >
                  FREE
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  Total Amount
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  ₹{totalAmount.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#ff3f6c",
                fontWeight: 600,
                py: 1.5,
                "&:hover": { bgcolor: "#e63960" },
                borderRadius: 0,
              }}
              onClick={handlePlaceOrder}
              disabled={placingOrder}
            >
              {placingOrder ? "PROCESSING..." : "PLACE ORDER"}
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Pincode Modal */}
      <Dialog
        open={pincodeModalOpen}
        onClose={handleClosePincodeModal}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Enter Pin Code</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Pin Code"
            type="text"
            fullWidth
            value={tempPinCode}
            onChange={(e) => setTempPinCode(e.target.value)}
            placeholder="Enter 6-digit pin code"
            inputProps={{ maxLength: 6 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePincodeModal}>Cancel</Button>
          <Button
            onClick={handleSavePincode}
            variant="contained"
            disabled={tempPinCode.length !== 6}
            sx={{ bgcolor: "#ff3f6c", "&:hover": { bgcolor: "#e63960" } }}
          >
            Check
          </Button>
        </DialogActions>
      </Dialog>

      {/* Size Modal */}
      <Dialog
        open={sizeModalOpen}
        onClose={handleCloseSizeModal}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Select Size</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Size</InputLabel>
            <Select
              value={tempSize}
              onChange={(e) => setTempSize(e.target.value)}
              label="Size"
            >
              {(
                selectedItemForChange?.product?.sizeOptions || [
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                ]
              ).map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSizeModal}>Cancel</Button>
          <Button
            onClick={handleSaveSize}
            variant="contained"
            sx={{ bgcolor: "#ff3f6c", "&:hover": { bgcolor: "#e63960" } }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quantity Modal */}
      <Dialog
        open={quantityModalOpen}
        onClose={handleCloseQuantityModal}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Select Quantity</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Quantity</InputLabel>
            <Select
              value={tempQuantity}
              onChange={(e) => setTempQuantity(e.target.value)}
              label="Quantity"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuantityModal}>Cancel</Button>
          <Button
            onClick={handleSaveQuantity}
            variant="contained"
            sx={{ bgcolor: "#ff3f6c", "&:hover": { bgcolor: "#e63960" } }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Modal */}
      <Dialog
        open={removeModalOpen}
        onClose={handleCloseRemoveModal}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Remove Items</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 0.5 }}>
            Are you sure you want to remove {selectedCount}{" "}
            {selectedCount === 1 ? "item" : "items"}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", gap: 1, px: 3, pb: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={removeSelectedItems}
            sx={{
              borderColor: "#ff3f6c",
              color: "#ff3f6c",
              fontWeight: 600,
              "&:hover": { borderColor: "#e63960", bgcolor: "#fff5f7" },
            }}
          >
            Remove from Cart
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleOpenWishlistConfirm}
            sx={{
              bgcolor: "#ff3f6c",
              fontWeight: 600,
              "&:hover": { bgcolor: "#e63960" },
            }}
          >
            Move to Wishlist
          </Button>
          <Button
            fullWidth
            onClick={handleCloseRemoveModal}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Wishlist Confirmation Modal */}
      <Dialog
        open={wishlistConfirmModalOpen}
        onClose={handleCloseWishlistConfirm}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Move to Wishlist</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to move {selectedCount}{" "}
            {selectedCount === 1 ? "item" : "items"} to your wishlist?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {selectedCount === 1 ? "This item" : "These items"} will be removed
            from your cart and added to your wishlist.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWishlistConfirm}>Cancel</Button>
          <Button
            onClick={moveSelectedToWishlist}
            variant="contained"
            sx={{ bgcolor: "#ff3f6c", "&:hover": { bgcolor: "#e63960" } }}
          >
            Move to Wishlist
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default BagPage;
