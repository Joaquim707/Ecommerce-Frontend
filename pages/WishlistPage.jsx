// // import React, { useEffect, useState } from "react";
// // import axiosInstance from "../src/utils/axiosInstance"; // <-- your axios
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   Button,
// // } from "@mui/material";
// // import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// // import DeleteIcon from "@mui/icons-material/Delete";

// // const WishlistPage = () => {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchWishlist = async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await axiosInstance.get("/wishlist", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       if (res.data.ok) {
// //         setItems(res.data.wishlist || []);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       if (err.response?.status === 401) {
// //         alert("Please login to see your wishlist");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchWishlist();
// //   }, []);

// //   const removeItem = async (productId) => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await axiosInstance.post(
// //         "/wishlist/remove",
// //         { productId },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       if (res.data.ok) {
// //         setItems((prev) => prev.filter((it) => it.product._id !== productId));
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   if (loading) return <Typography>Loading...</Typography>;

// //   return (
// //     <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
// //       <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 2 }}>
// //         My Wishlist
// //       </Typography>

// //       {items.length === 0 ? (
// //         <Typography>No items in wishlist</Typography>
// //       ) : (
// //         <Grid container spacing={2}>
// //           {items.map((entry) => {
// //             const p = entry.product || {};
// //             return (
// //               <Grid item xs={12} sm={6} md={4} key={entry._id}>
// //                 <Card sx={{ display: "flex", gap: 2, p: 1 }}>
// //                   <CardMedia
// //                     component="img"
// //                     src={p.images?.[0] || ""}
// //                     alt={p.title}
// //                     sx={{
// //                       width: 120,
// //                       height: 140,
// //                       objectFit: "cover",
// //                       borderRadius: 1,
// //                     }}
// //                   />
// //                   <CardContent sx={{ flex: 1 }}>
// //                     <Typography sx={{ fontWeight: 700 }}>{p.brand}</Typography>
// //                     <Typography sx={{ color: "#535766", mb: 1 }}>
// //                       {p.title}
// //                     </Typography>
// //                     <Typography sx={{ fontWeight: 700 }}>₹{p.price}</Typography>

// //                     <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
// //                       <Button
// //                         variant="contained"
// //                         size="small"
// //                         startIcon={<ShoppingBagIcon />}
// //                         onClick={() =>
// //                           alert("Add to bag: Implement your cart function")
// //                         }
// //                       >
// //                         Add to Bag
// //                       </Button>

// //                       <Button
// //                         variant="outlined"
// //                         size="small"
// //                         startIcon={<DeleteIcon />}
// //                         onClick={() => removeItem(p._id)}
// //                       >
// //                         Remove
// //                       </Button>
// //                     </Box>
// //                   </CardContent>
// //                 </Card>
// //               </Grid>
// //             );
// //           })}
// //         </Grid>
// //       )}
// //     </Box>
// //   );
// // };

// // export default WishlistPage;

// // import React from "react";
// // import { Box, Typography, Button } from "@mui/material";
// // import { useNavigate } from "react-router-dom";

// // export default function WishlistPage() {
// //   const navigate = useNavigate();

// //   return (
// //     <Box
// //       sx={{
// //         // width: { sm: "797px", md: "100%", lg: "1880px" },
// //         width: { sm: "797px", md: "1255px", lg: "1443px", xl: "1905px" },
// //         Height: "auto",
// //         minHeight: "70vh",
// //         margin: "80px auto",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         flexDirection: "column",
// //         textAlign: "center",
// //       }}
// //     >
// //       {/* Title */}
// //       <Typography
// //         variant="h5"
// //         sx={{ fontWeight: 700, color: "#3e4152", mb: 1 }}
// //       >
// //         YOUR WISHLIST IS EMPTY
// //       </Typography>

// //       {/* Subtitle */}
// //       <Typography
// //         sx={{
// //           maxWidth: "380px",
// //           color: "#7e818c",
// //           fontSize: "14px",
// //           mb: 4,
// //         }}
// //       >
// //         Add items that you like to your wishlist. Review them anytime and easily
// //         move them to the bag.
// //       </Typography>

// //       {/* Illustration */}
// //       <Box sx={{ mb: 4 }}>
// //         <img
// //           src="/images/wishlist.png"
// //           alt="empty wishlist"
// //           style={{ width: "150px", opacity: 0.9 }}
// //         />
// //       </Box>

// //       {/* Continue Shopping Button */}
// //       <Button
// //         variant="outlined"
// //         sx={{
// //           textTransform: "none",
// //           fontWeight: 600,
// //           borderRadius: "4px",
// //           padding: "10px 30px",
// //           fontSize: "14px",
// //           borderColor: "#3d62ff",
// //           color: "#3d62ff",
// //           "&:hover": {
// //             borderColor: "#2948cc",
// //             color: "#2948cc",
// //           },
// //         }}
// //         onClick={() => navigate("/")}
// //       >
// //         CONTINUE SHOPPING
// //       </Button>
// //     </Box>
// //   );
// // }

// import React, { useContext, useEffect } from "react";
// import { UserContext } from "../src/context/userContext";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   IconButton,
//   Button,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";

// const WishlistPage = () => {
//   const { user, fetchWishlist, removeFromWishlist, loading } =
//     useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) fetchWishlist();
//   }, []);

//   const handleRemove = async (productId) => {
//     const res = await removeFromWishlist(productId);
//     if (!res.success) return;

//     // Refetch the wishlist to update the UI after deletion
//     fetchWishlist();
//   };

//   if (loading) return <Typography>Loading...</Typography>;

//   if (!user)
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           minHeight: "70vh",
//           mt: { xs: 10, sm: 12 },
//           mb: { xs: 0, lg: 20 },
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: { xs: "100%", sm: "600px", md: "750px", lg: "900px" },
//             textAlign: "center",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* Title */}
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               color: "#3e4152",
//               mb: 1,
//               fontSize: { xs: "18px", sm: "22px" },
//             }}
//           >
//             PLEASE LOG IN
//           </Typography>

//           {/* Subtitle */}
//           <Typography
//             sx={{
//               maxWidth: "380px",
//               color: "#7e818c",
//               fontSize: { xs: "13px", sm: "14px" },
//               mb: 4,
//             }}
//           >
//             Login to view items in your wishlist.
//           </Typography>

//           {/* Illustration */}
//           <Box sx={{ mb: 4 }}>
//             <img
//               src="/images/wishlist.png"
//               alt="empty wishlist"
//               style={{
//                 width: "100%",
//                 maxWidth: "150px",
//                 opacity: 0.9,
//               }}
//             />
//           </Box>

//           {/* Continue Shopping Button */}
//           <Button
//             variant="outlined"
//             sx={{
//               textTransform: "none",
//               fontWeight: 600,
//               borderRadius: "4px",
//               px: { xs: 3, sm: 4 },
//               py: { xs: 1.2, sm: 1.5 },
//               fontSize: { xs: "13px", sm: "14px" },
//               borderColor: "#3d62ff",
//               color: "#3d62ff",
//               "&:hover": {
//                 borderColor: "#2948cc",
//                 color: "#2948cc",
//               },
//             }}
//             onClick={() => navigate("/login")}
//           >
//             LOGIN
//           </Button>
//         </Box>
//       </Box>
//     );
//   if (!user?.wishlist || user.wishlist.length === 0)
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           minHeight: "70vh",
//           mt: { xs: 10, sm: 12 },
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           mb: { xs: 0, lg: 20 },
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: { xs: "100%", sm: "600px", md: "750px", lg: "900px" },
//             textAlign: "center",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* Title */}
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               color: "#3e4152",
//               mb: 1,
//               fontSize: { xs: "18px", sm: "22px" },
//             }}
//           >
//             YOUR WISHLIST IS EMPTY
//           </Typography>

//           {/* Subtitle */}
//           <Typography
//             sx={{
//               maxWidth: "380px",
//               color: "#7e818c",
//               fontSize: { xs: "13px", sm: "14px" },
//               mb: 4,
//             }}
//           >
//             Add items that you like to your wishlist. Review them anytime and
//             easily move them to the bag.
//           </Typography>

//           {/* Illustration */}
//           <Box sx={{ mb: 4 }}>
//             <img
//               src="/images/wishlist.png"
//               alt="empty wishlist"
//               style={{
//                 width: "100%",
//                 maxWidth: "150px",
//                 opacity: 0.9,
//               }}
//             />
//           </Box>

//           {/* Continue Shopping Button */}
//           <Button
//             variant="outlined"
//             sx={{
//               textTransform: "none",
//               fontWeight: 600,
//               borderRadius: "4px",
//               px: { xs: 3, sm: 4 },
//               py: { xs: 1.2, sm: 1.5 },
//               fontSize: { xs: "13px", sm: "14px" },
//               borderColor: "#3d62ff",
//               color: "#3d62ff",
//               "&:hover": {
//                 borderColor: "#2948cc",
//                 color: "#2948cc",
//               },
//             }}
//             onClick={() => navigate("/")}
//           >
//             CONTINUE SHOPPING
//           </Button>
//         </Box>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         px: { xs: 2, sm: 10, md: 20 },
//         py: { xs: 2, sm: 3 },
//       }}
//     >
//       <Typography sx={{ fontSize: "18px", fontWeight: 700 }} mb={3}>
//         My Wishlist
//         <Box
//           component="span"
//           sx={{ fontWeight: 400, marginLeft: 1, fontSize: 18 }}
//         >
//           {user.wishlist.length} {user.wishlist.length === 1 ? "item" : "items"}
//         </Box>
//       </Typography>

//       <Grid container spacing={4}>
//         {user.wishlist.map((product, index) => (
//           <Grid
//             item
//             xs={6} // 2 cards per row on mobile
//             sm={4} // 3 cards per row on small screens
//             md={3} // 4 cards per row on medium screens
//             lg={2} // 4 cards per row on large screens
//             xl={2} // 6 cards per row on extra large screens
//             key={product._id || index}
//           >
//             <Card
//               sx={{
//                 position: "relative",
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "100%", // ensures all cards have same height
//                 border: "1px solid #ebebebff",
//                 borderRadius: "0",
//               }}
//             >
//               {/* Product Image */}
//               <CardMedia
//                 component="img"
//                 image={product.images?.[0] || "/images/default.jpeg"}
//                 onClick={() =>
//                   navigate(`/product/${product.slug || product._id}`)
//                 }
//                 sx={{
//                   cursor: "pointer",
//                   height: { xs: 180, sm: 300, md: 294 }, // responsive height
//                   objectFit: "fit",
//                   backgroundColor: "#f5f5f5",
//                 }}
//                 alt={product.title || "Product"}
//               />

//               {/* Product Info */}
//               <CardContent sx={{ flexGrow: 1 }}>
//                 {/* Product Title */}
//                 <Typography
//                   fontSize={"16px"}
//                   fontWeight={400}
//                   color="#282c3f"
//                   title={product.title}
//                   width="195px"
//                   noWrap
//                   onClick={() => navigate(`/product/${product.slug}`)}
//                   sx={{ mb: 0.5, cursor: "pointer" }}
//                 >
//                   {product.title || "Untitled Product"}
//                 </Typography>

//                 {/* Brand */}
//                 {/* <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   noWrap
//                   title={product.brand}
//                 >
//                   {product.brand || "Brand not available"}
//                 </Typography> */}

//                 {/* Prices */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   {/* Current Price */}
//                   <Typography variant="subtitle2" color="dark" fontWeight={700}>
//                     ₹{product.price || "N/A"}
//                   </Typography>

//                   {/* MRP */}
//                   {product.mrp && product.mrp > product.price && (
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ textDecoration: "line-through" }}
//                     >
//                       ₹{product.mrp}
//                     </Typography>
//                   )}

//                   {/* Discount Percentage */}
//                   {product.discountPercent && product.discountPercent > 0 && (
//                     <Typography variant="body2" color="orange" fontWeight={500}>
//                       ({product.discountPercent}% OFF)
//                     </Typography>
//                   )}
//                 </Box>
//               </CardContent>

//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 sx={{
//                   textTransform: "none",
//                   fontWeight: 600,
//                   fontSize: { xs: "13px", sm: "14px" },
//                   py: { xs: 0.8, sm: 1 },
//                   border: "1px solid #ebebebff",
//                   // boxShadow: "0 2px 4px rgba(0,0,0,0.15)", // evenly around all sides
//                   backgroundColor: "transparent",
//                   color: "#ff3f6c",
//                   borderRadius: 0,
//                 }}
//               >
//                 Move to Bag
//               </Button>

//               {/* Delete Button */}
//               <IconButton
//                 onClick={() => handleRemove(product._id)}
//                 sx={{
//                   position: "absolute",
//                   top: 5,
//                   right: 5,
//                   border: "1px solid #ebebebff",
//                   backgroundColor: "#e9e9e9ff",
//                 }}
//               >
//                 <DeleteIcon color="error" />
//               </IconButton>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default WishlistPage;

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../src/context/userContext";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { user, fetchWishlist, removeFromWishlist, loading } =
    useContext(UserContext);
  const navigate = useNavigate();

  // State for size/color selection dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [colorError, setColorError] = useState("");
  const [addingToBag, setAddingToBag] = useState(false);

  useEffect(() => {
    if (user) fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    const res = await removeFromWishlist(productId);
    if (!res.success) return;
    fetchWishlist();
  };

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setSelectedSize("");
    setSelectedColor("");
    setSizeError("");
    setColorError("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleAddToBag = async () => {
    let hasError = false;

    // Validate size
    if (!selectedSize) {
      setSizeError("Please select a size");
      hasError = true;
    } else {
      setSizeError("");
    }

    // Validate color if product has color options
    if (selectedProduct?.colorOptions?.length && !selectedColor) {
      setColorError("Please select a color");
      hasError = true;
    } else {
      setColorError("");
    }

    if (hasError) return;

    setAddingToBag(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          size: selectedSize,
          color: selectedColor || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add to bag");
      }

      if (data.ok) {
        // Successfully added to bag
        alert("Added to Bag!");

        // Optionally remove from wishlist after adding to bag
        await handleRemove(selectedProduct._id);

        handleCloseDialog();
      }
    } catch (error) {
      console.error("Add to bag error:", error);
      alert(error.message || "Failed to add to bag");
    } finally {
      setAddingToBag(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  if (!user)
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "70vh",
          mt: { xs: 10, sm: 12 },
          mb: { xs: 0, lg: 20 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "600px", md: "750px", lg: "900px" },
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#3e4152",
              mb: 1,
              fontSize: { xs: "18px", sm: "22px" },
            }}
          >
            PLEASE LOG IN
          </Typography>

          <Typography
            sx={{
              maxWidth: "380px",
              color: "#7e818c",
              fontSize: { xs: "13px", sm: "14px" },
              mb: 4,
            }}
          >
            Login to view items in your wishlist.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <img
              src="/images/wishlist.png"
              alt="empty wishlist"
              style={{
                width: "100%",
                maxWidth: "150px",
                opacity: 0.9,
              }}
            />
          </Box>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "4px",
              px: { xs: 3, sm: 4 },
              py: { xs: 1.2, sm: 1.5 },
              fontSize: { xs: "13px", sm: "14px" },
              borderColor: "#3d62ff",
              color: "#3d62ff",
              "&:hover": {
                borderColor: "#2948cc",
                color: "#2948cc",
              },
            }}
            onClick={() => navigate("/login")}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    );

  if (!user?.wishlist || user.wishlist.length === 0)
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "70vh",
          mt: { xs: 10, sm: 12 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: { xs: 0, lg: 20 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "600px", md: "750px", lg: "900px" },
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#3e4152",
              mb: 1,
              fontSize: { xs: "18px", sm: "22px" },
            }}
          >
            YOUR WISHLIST IS EMPTY
          </Typography>

          <Typography
            sx={{
              maxWidth: "380px",
              color: "#7e818c",
              fontSize: { xs: "13px", sm: "14px" },
              mb: 4,
            }}
          >
            Add items that you like to your wishlist. Review them anytime and
            easily move them to the bag.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <img
              src="/images/wishlist.png"
              alt="empty wishlist"
              style={{
                width: "100%",
                maxWidth: "150px",
                opacity: 0.9,
              }}
            />
          </Box>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "4px",
              px: { xs: 3, sm: 4 },
              py: { xs: 1.2, sm: 1.5 },
              fontSize: { xs: "13px", sm: "14px" },
              borderColor: "#3d62ff",
              color: "#3d62ff",
              "&:hover": {
                borderColor: "#2948cc",
                color: "#2948cc",
              },
            }}
            onClick={() => navigate("/")}
          >
            CONTINUE SHOPPING
          </Button>
        </Box>
      </Box>
    );

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 10, md: 20 },
        py: { xs: 2, sm: 3 },
      }}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: 700 }} mb={3}>
        My Wishlist
        <Box
          component="span"
          sx={{ fontWeight: 400, marginLeft: 1, fontSize: 18 }}
        >
          {user.wishlist.length} {user.wishlist.length === 1 ? "item" : "items"}
        </Box>
      </Typography>

      <Grid container spacing={4}>
        {user.wishlist.map((product, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            xl={2}
            key={product._id || index}
          >
            <Card
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: "1px solid #ebebebff",
                borderRadius: "0",
              }}
            >
              <CardMedia
                component="img"
                image={product.images?.[0] || "/images/default.jpeg"}
                onClick={() =>
                  navigate(`/product/${product.slug || product._id}`)
                }
                sx={{
                  cursor: "pointer",
                  height: { xs: 180, sm: 300, md: 294 },
                  objectFit: "fit",
                  backgroundColor: "#f5f5f5",
                }}
                alt={product.title || "Product"}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  fontSize={"16px"}
                  fontWeight={400}
                  color="#282c3f"
                  title={product.title}
                  width="195px"
                  noWrap
                  onClick={() => navigate(`/product/${product.slug}`)}
                  sx={{ mb: 0.5, cursor: "pointer" }}
                >
                  {product.title || "Untitled Product"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="subtitle2" color="dark" fontWeight={700}>
                    ₹{product.price || "N/A"}
                  </Typography>

                  {product.mrp && product.mrp > product.price && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ₹{product.mrp}
                    </Typography>
                  )}

                  {product.discountPercent && product.discountPercent > 0 && (
                    <Typography variant="body2" color="orange" fontWeight={500}>
                      ({product.discountPercent}% OFF)
                    </Typography>
                  )}
                </Box>
              </CardContent>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleOpenDialog(product)}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "13px", sm: "14px" },
                  py: { xs: 0.8, sm: 1 },
                  border: "1px solid #ebebebff",
                  backgroundColor: "transparent",
                  color: "#ff3f6c",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "#fff5f7",
                  },
                }}
              >
                Move to Bag
              </Button>

              <IconButton
                onClick={() => handleRemove(product._id)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  border: "1px solid #ebebebff",
                  backgroundColor: "#e9e9e9ff",
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Size/Color Selection Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Select Size & Color</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {/* Size Selection */}
            <FormControl fullWidth error={!!sizeError} sx={{ mb: 2 }}>
              <InputLabel>Size *</InputLabel>
              <Select
                value={selectedSize}
                onChange={(e) => {
                  setSelectedSize(e.target.value);
                  setSizeError("");
                }}
                label="Size *"
              >
                {selectedProduct?.sizeOptions?.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
              {sizeError && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {sizeError}
                </Typography>
              )}
            </FormControl>

            {/* Color Selection (if product has colors) */}
            {selectedProduct?.colorOptions?.length > 0 && (
              <FormControl fullWidth error={!!colorError}>
                <InputLabel>Color *</InputLabel>
                <Select
                  value={selectedColor}
                  onChange={(e) => {
                    setSelectedColor(e.target.value);
                    setColorError("");
                  }}
                  label="Color *"
                >
                  {selectedProduct.colorOptions.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
                {colorError && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {colorError}
                  </Typography>
                )}
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} disabled={addingToBag}>
            Cancel
          </Button>
          <Button
            onClick={handleAddToBag}
            variant="contained"
            disabled={addingToBag}
            sx={{
              bgcolor: "#ff3f6c",
              "&:hover": { bgcolor: "#e63960" },
              minWidth: 120,
            }}
          >
            {addingToBag ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add to Bag"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WishlistPage;
