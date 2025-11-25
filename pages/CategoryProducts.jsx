// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Drawer,
//   Button,
//   Divider,
//   MenuItem,
//   Select,
//   FormControl,
//   Checkbox,
//   FormControlLabel,
//   Breadcrumbs,
//   Link,
// } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import CloseIcon from "@mui/icons-material/Close";
// import StarIcon from "@mui/icons-material/Star";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import Filters from "../src/components/Filters";
// import ContainerFullWidth from "../src/layouts/ContainerFullWidth";
// import Footer from "../src/components/Footer";

// const sizeOptions = [
//   "3XS",
//   "L/XL",
//   "7XL",
//   "5-6Y",
//   "10-12Y",
//   "40",
//   "XXS",
//   "XL",
//   "8XL",
//   "6-7Y",
//   "12-13Y",
//   "42",
//   "XS",
//   "XL/XXL",
//   "9XL",
//   "7-8Y",
//   "13-14Y",
//   "44",
//   "S",
//   "XXL",
//   "10XL",
//   "6-8Y",
//   "12-14Y",
//   "46",
//   "XS/S",
//   "3XL",
//   "11XL",
//   "8-9Y",
//   "14-15Y",
//   "48",
//   "M",
//   "3XL/4XL",
//   "1-2Y",
//   "9-10Y",
//   "15-16Y",
//   "Onesize",
//   "S/M",
//   "4XL",
//   "2-3Y",
//   "8-10Y",
//   "14-16Y",
//   "Customise",
//   "L",
//   "5XL",
//   "3-4Y",
//   "10-11Y",
//   "36",
//   "M/L",
//   "6XL",
//   "4-5Y",
//   "11-12Y",
//   "38",
// ];

// const HEADER_HEIGHT = 64; // px - adjust if your header/nav has different height

// const CategoryProducts = () => {
//   const { slug, mainslug } = useParams(); // mainslug optional if your route includes it
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [filters, setFilters] = useState({
//     brands: [],
//     colors: [],
//     minPrice: 0,
//     maxPrice: 10000,
//     discount: "",
//     bundleType: "",
//     sizes: [],
//   });

//   const [sort, setSort] = useState("latest");
//   const [openFilters, setOpenFilters] = useState(false);

//   const [bundleOpen, setBundleOpen] = useState(false);
//   const [sizeOpen, setSizeOpen] = useState(false);

//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

//   const [totalProducts, setTotalProducts] = useState(0);

//   const formatSlugLabel = (s) =>
//     (s || "")
//       .split("-")
//       .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
//       .join(" ");

//   // Build & call API
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       params.append("page", page);
//       params.append("limit", 20);
//       params.append("sort", sort);
//       if (slug) params.append("search", slug);

//       if (filters.brands.length)
//         params.append("brand", filters.brands.join(","));
//       if (filters.colors.length)
//         params.append("color", filters.colors.join(","));
//       if (filters.minPrice) params.append("minPrice", filters.minPrice);
//       if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
//       if (filters.discount) params.append("minDiscount", filters.discount);
//       if (filters.bundleType) params.append("bundleType", filters.bundleType);

//       // send size as repeated query params: size=S&size=M ...
//       if (filters.sizes.length) {
//         filters.sizes.forEach((sz) => params.append("size", sz));
//       }

//       const res = await axios.get(
//         `http://localhost:5000/api/products/filter?${params.toString()}`
//       );

//       const fetchedProducts = res.data.products || [];
//       setProducts(fetchedProducts);
//       setTotalPages(res.data.totalPages || 1);

//       // robust total count extraction
//       setTotalProducts(
//         res.data.totalProducts ??
//           res.data.totalCount ??
//           res.data.total ??
//           res.data.count ??
//           fetchedProducts.length
//       );
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // reset page when key params change
//   useEffect(() => setPage(1), [slug, filters, sort]);

//   // fetch on dependency changes
//   useEffect(() => {
//     fetchProducts();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, slug, filters, sort]);

//   // image hover slider
//   useEffect(() => {
//     let interval;
//     if (hoveredProduct) {
//       interval = setInterval(() => {
//         setHoveredImageIndex((prev) => {
//           const images =
//             products.find((p) => p._id === hoveredProduct)?.images || [];
//           return images.length ? (prev + 1) % images.length : 0;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [hoveredProduct, products]);

//   // handlers
//   const toggleFilterDrawer = () => setOpenFilters((p) => !p);
//   const handleBundleChange = (type) =>
//     setFilters((prev) => ({
//       ...prev,
//       bundleType: prev.bundleType === type ? "" : type,
//     }));
//   const handleToggleSize = (size) =>
//     setFilters((prev) => {
//       const exists = prev.sizes.includes(size);
//       return {
//         ...prev,
//         sizes: exists
//           ? prev.sizes.filter((s) => s !== size)
//           : [...prev.sizes, size],
//       };
//     });

//   const getSortLabel = (value) => {
//     switch (value) {
//       case "oldest":
//         return "Oldest";
//       case "price_low_to_high":
//         return "Price: Low to High";
//       case "price_high_to_low":
//         return "Price: High to Low";
//       case "rating_high_to_low":
//         return "Rating: High to Low";
//       case "discount_high_to_low":
//         return "Discount: High to Low";
//       default:
//         return "Latest";
//     }
//   };

//   // PRODUCT GRID (keeps fixed image aspect ratio so grid looks tidy)
//   const ProductGrid = () => (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: {
//           xs: "repeat(2, 1fr)",
//           sm: "repeat(3, 1fr)",
//           md: "repeat(4, 1fr)",
//           lg: "repeat(5, 1fr)",
//         },
//         gap: { xs: 1.5, md: 5 },
//         mt: 2,
//         ml: 2,
//         width: "100%",
//       }}
//     >
//       {products.map((product) => {
//         const originalPrice = Math.round(
//           product.price / (1 - (product.discountPercent || 0) / 100)
//         );
//         return (
//           <Box
//             key={product._id}
//             onClick={() => navigate(`/product/${product.slug}`)}
//             sx={{
//               cursor: "pointer",
//               display: "flex",
//               flexDirection: "column",
//               borderRadius: 2,
//               overflow: "hidden",
//               backgroundColor: "#fff",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//             }}
//           >
//             <Box
//               sx={{
//                 position: "relative",
//                 width: "100%",
//                 paddingTop: "120%", // consistent tile aspect ratio
//                 backgroundColor: "#f6f6f7",
//                 overflow: "hidden",
//               }}
//               onMouseEnter={() => {
//                 setHoveredProduct(product._id);
//                 setHoveredImageIndex(1);
//               }}
//               onMouseLeave={() => {
//                 setHoveredProduct(null);
//                 setHoveredImageIndex(0);
//               }}
//             >
//               <Box
//                 component="img"
//                 src={
//                   hoveredProduct === product._id &&
//                   product.images?.[hoveredImageIndex]
//                     ? product.images[hoveredImageIndex]
//                     : product.images?.[0]
//                 }
//                 alt={product.title}
//                 sx={{
//                   position: "absolute",
//                   inset: 0,
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   transition: "transform .28s ease",
//                   "&:hover": { transform: "scale(1.03)" },
//                 }}
//               />

//               {product.ratings?.average && (
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: 8,
//                     left: 8,
//                     background: "rgba(255,255,255,0.95)",
//                     px: 0.8,
//                     py: 0.2,
//                     borderRadius: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 0.4,
//                     boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
//                   }}
//                 >
//                   <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
//                     {product.ratings.average.toFixed(1)}
//                   </Typography>
//                   <StarIcon sx={{ fontSize: 14, color: "#FF9529" }} />
//                   <Typography sx={{ fontSize: 11, color: "#444" }}>
//                     ({product.ratings.totalCount})
//                   </Typography>
//                 </Box>
//               )}
//             </Box>

//             <Box sx={{ p: 1 }}>
//               <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
//                 {product.brand}
//               </Typography>
//               <Typography
//                 sx={{
//                   fontSize: 13,
//                   color: "#555",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   display: "-webkit-box",
//                   WebkitLineClamp: 2,
//                   WebkitBoxOrient: "vertical",
//                 }}
//               >
//                 {product.title}
//               </Typography>

//               <Box
//                 sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.6 }}
//               >
//                 <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
//                   ₹{product.price.toLocaleString("en-IN")}
//                 </Typography>
//                 {product.discountPercent > 0 && (
//                   <>
//                     <Typography
//                       sx={{
//                         fontSize: 13,
//                         color: "#888",
//                         textDecoration: "line-through",
//                       }}
//                     >
//                       ₹{originalPrice.toLocaleString("en-IN")}
//                     </Typography>
//                     <Typography
//                       sx={{ fontSize: 13, color: "#fa9261", fontWeight: 600 }}
//                     >
//                       ({product.discountPercent}% OFF)
//                     </Typography>
//                   </>
//                 )}
//               </Box>
//             </Box>
//           </Box>
//         );
//       })}
//     </Box>
//   );

//   // ===== Layout: left column sticky, top controls sticky, page scrolls =====
//   return (
//     <ContainerFullWidth>
//       <Box
//         sx={{
//           px: { xs: 1.5, sm: 2, md: 4 },
//           py: { xs: 2, md: 3 },
//           maxWidth: { lg: "1300px", xl: "1540px" },
//           mx: "auto",
//         }}
//       >
//         {/* Breadcrumbs + title */}
//         <Box sx={{ mb: 2 }}>
//           <Breadcrumbs
//             aria-label="breadcrumb"
//             sx={{
//               fontSize: { xs: 12, sm: 13 },
//               "& .MuiBreadcrumbs-separator": { mx: 0.5 },
//             }}
//           >
//             <Link
//               underline="hover"
//               color="inherit"
//               sx={{ cursor: "pointer" }}
//               onClick={() => navigate("/")}
//             >
//               Home
//             </Link>
//             {mainslug && (
//               <Link
//                 underline="hover"
//                 color="inherit"
//                 sx={{ cursor: "pointer" }}
//                 onClick={() => navigate(`/category/${mainslug}`)}
//               >
//                 {formatSlugLabel(mainslug)}
//               </Link>
//             )}
//             <Typography color="text.primary">
//               {formatSlugLabel(slug)}
//             </Typography>
//           </Breadcrumbs>

//           <Typography
//             sx={{
//               fontWeight: 600,
//               fontSize: 16,
//               mt: 1,
//               textTransform: "capitalize",
//             }}
//           >
//             {formatSlugLabel(slug)}{" "}
//             <Box
//               component="span"
//               sx={{ fontWeight: 400, color: "#878b94", fontSize: 15 }}
//             >
//               ({totalProducts} items)
//             </Box>
//           </Typography>
//         </Box>

//         {/* mobile filter button */}
//         <Box
//           sx={{
//             display: { xs: "flex", sm: "none" },
//             justifyContent: "flex-end",
//             mb: 2,
//           }}
//         >
//           <IconButton onClick={toggleFilterDrawer}>
//             <FilterListIcon />
//           </IconButton>
//         </Box>

//         {/* mobile drawer */}
//         <Drawer
//           anchor="top"
//           open={openFilters}
//           onClose={toggleFilterDrawer}
//           PaperProps={{ sx: { height: "85vh", p: 2, overflowY: "auto" } }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <IconButton onClick={toggleFilterDrawer}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Divider sx={{ mb: 2 }} />
//           <Filters filters={filters} setFilters={setFilters} />
//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ mt: 3, borderRadius: 2 }}
//             onClick={toggleFilterDrawer}
//           >
//             Apply & Close
//           </Button>
//         </Drawer>

//         {/* Main area: two columns */}
//         <Box sx={{ display: "flex", alignItems: "flex-start" }}>
//           {/* LEFT sticky filters column */}
//           <Box
//             sx={{
//               width: { xs: "100%", sm: 260 },
//               flexShrink: 0,
//               display: { xs: "none", sm: "block" },
//               position: "sticky",
//               top: HEADER_HEIGHT + 12, // sticky below your app header
//               alignSelf: "flex-start",
//             }}
//           >
//             <Filters filters={filters} setFilters={setFilters} />
//           </Box>

//           {/* RIGHT content column — page scrolls normally */}
//           <Box sx={{ flex: 1 }}>
//             {/* Top controls - sticky like Myntra */}
//             <Box
//               sx={{
//                 top: HEADER_HEIGHT,
//                 zIndex: 80,
//                 background: "#fff",
//                 pt: 0.6,
//                 pb: 1,
//                 mb: 1,
//                 borderBottom: "1px solid #ececec",
//                 borderLeft: "none",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   gap: 2,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     gap: 1,
//                     alignItems: "center",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setBundleOpen((p) => !p)}
//                     sx={{
//                       textTransform: "none",
//                       border: "none",
//                       fontSize: 14,
//                       fontWeight: 400,
//                       color: "#282c3f",
//                       px: 2,
//                       py: 0.5,
//                     }}
//                   >
//                     Bundles{" "}
//                     {bundleOpen ? (
//                       <KeyboardArrowUpIcon fontSize="small" />
//                     ) : (
//                       <KeyboardArrowDownIcon fontSize="small" />
//                     )}
//                   </Button>

//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setSizeOpen((p) => !p)}
//                     sx={{
//                       textTransform: "none",
//                       border: "none",
//                       fontSize: 14,
//                       fontWeight: 400,
//                       color: "#282c3f",
//                       px: 2,
//                       py: 0.5,
//                     }}
//                   >
//                     Size{" "}
//                     {sizeOpen ? (
//                       <KeyboardArrowUpIcon fontSize="small" />
//                     ) : (
//                       <KeyboardArrowDownIcon fontSize="small" />
//                     )}
//                   </Button>
//                 </Box>

//                 <FormControl
//                   size="small"
//                   sx={{
//                     minWidth: { sm: 180, md: 240 },
//                     background: "#fff",
//                     borderRadius: 1,
//                   }}
//                 >
//                   <Select
//                     value={sort}
//                     onChange={(e) => setSort(e.target.value)}
//                     IconComponent={KeyboardArrowDownIcon}
//                     displayEmpty
//                     renderValue={(v) => {
//                       const label = getSortLabel(v);
//                       return (
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 0.5,
//                           }}
//                         >
//                           <Typography sx={{ fontSize: 13, color: "#7e818c" }}>
//                             Sort by:
//                           </Typography>
//                           <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
//                             {label}
//                           </Typography>
//                         </Box>
//                       );
//                     }}
//                   >
//                     <MenuItem value="latest">Latest</MenuItem>
//                     <MenuItem value="oldest">Oldest</MenuItem>
//                     <MenuItem value="price_low_to_high">
//                       Price: Low to High
//                     </MenuItem>
//                     <MenuItem value="price_high_to_low">
//                       Price: High to Low
//                     </MenuItem>
//                     <MenuItem value="rating_high_to_low">
//                       Rating: High to Low
//                     </MenuItem>
//                     <MenuItem value="discount_high_to_low">
//                       Discount: High to Low
//                     </MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>

//               {/* bundle dropdown area (pushes content down) */}
//               {bundleOpen && (
//                 <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         size="small"
//                         checked={filters.bundleType === "single"}
//                         onChange={() => handleBundleChange("single")}
//                       />
//                     }
//                     label={
//                       <Typography sx={{ fontSize: 14 }}>Single</Typography>
//                     }
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         size="small"
//                         checked={filters.bundleType === "bundle"}
//                         onChange={() => handleBundleChange("bundle")}
//                       />
//                     }
//                     label={
//                       <Typography sx={{ fontSize: 14 }}>Bundle</Typography>
//                     }
//                   />
//                 </Box>
//               )}

//               {/* size dropdown area (pushes content down) */}
//               {sizeOpen && (
//                 <Box sx={{ mt: 1 }}>
//                   <Box
//                     sx={{
//                       display: "grid",
//                       gridTemplateColumns: {
//                         xs: "repeat(4, 1fr)",
//                         sm: "repeat(6, 1fr)",
//                         md: "repeat(9, 1fr)",
//                       },
//                       gap: "6px",
//                     }}
//                   >
//                     {sizeOptions.map((sz) => (
//                       <FormControlLabel
//                         key={sz}
//                         control={
//                           <Checkbox
//                             size="small"
//                             checked={filters.sizes.includes(sz)}
//                             onChange={() => handleToggleSize(sz)}
//                           />
//                         }
//                         label={
//                           <Typography sx={{ fontSize: 12 }}>{sz}</Typography>
//                         }
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               )}
//             </Box>

//             {/* Products grid */}
//             <Box>
//               {loading ? (
//                 <Typography>Loading products…</Typography>
//               ) : products.length === 0 ? (
//                 <Typography>No products found</Typography>
//               ) : (
//                 <ProductGrid />
//               )}
//             </Box>

//             {/* Pagination - visible without needing to scroll inside any inner container */}
//             <Box
//               sx={{
//                 mt: 4,
//                 mb: 6,
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: 2,
//               }}
//             >
//               <Button
//                 disabled={page <= 1}
//                 variant="outlined"
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//               >
//                 Previous
//               </Button>
//               <Typography sx={{ display: "flex", alignItems: "center" }}>
//                 Page {page} of {totalPages}
//               </Typography>
//               <Button
//                 disabled={page >= totalPages}
//                 variant="outlined"
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <Footer />
//     </ContainerFullWidth>
//   );
// };

// export default CategoryProducts;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Button,
  Divider,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  Breadcrumbs,
  Link,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Filters from "../src/components/Filters";
import ContainerFullWidth from "../src/layouts/ContainerFullWidth";
import Footer from "../src/components/Footer";

const sizeOptions = [
  "3XS",
  "L/XL",
  "7XL",
  "5-6Y",
  "10-12Y",
  "40",
  "XXS",
  "XL",
  "8XL",
  "6-7Y",
  "12-13Y",
  "42",
  "XS",
  "XL/XXL",
  "9XL",
  "7-8Y",
  "13-14Y",
  "44",
  "S",
  "XXL",
  "10XL",
  "6-8Y",
  "12-14Y",
  "46",
  "XS/S",
  "3XL",
  "11XL",
  "8-9Y",
  "14-15Y",
  "48",
  "M",
  "3XL/4XL",
  "1-2Y",
  "9-10Y",
  "15-16Y",
  "Onesize",
  "S/M",
  "4XL",
  "2-3Y",
  "8-10Y",
  "14-16Y",
  "Customise",
  "L",
  "5XL",
  "3-4Y",
  "10-11Y",
  "36",
  "M/L",
  "6XL",
  "4-5Y",
  "11-12Y",
  "38",
];

const HEADER_HEIGHT = 64; // px - adjust if your header/nav has different height

const CategoryProducts = () => {
  const { slug, mainslug } = useParams(); // mainslug optional if your route includes it
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    brands: [],
    colors: [],
    minPrice: 0,
    maxPrice: 10000,
    discount: "",
    bundleType: "",
    sizes: [],
  });

  const [sort, setSort] = useState("latest");
  const [openFilters, setOpenFilters] = useState(false);

  const [bundleOpen, setBundleOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

  const [totalProducts, setTotalProducts] = useState(0);

  const formatSlugLabel = (s) =>
    (s || "")
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");

  // Build & call API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", 20);
      params.append("sort", sort);
      if (slug) params.append("search", slug);

      if (filters.brands.length)
        params.append("brand", filters.brands.join(","));
      if (filters.colors.length)
        params.append("color", filters.colors.join(","));
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.discount) params.append("minDiscount", filters.discount);
      if (filters.bundleType) params.append("bundleType", filters.bundleType);

      // send size as repeated query params: size=S&size=M ...
      if (filters.sizes.length) {
        filters.sizes.forEach((sz) => params.append("size", sz));
      }

      const res = await axios.get(
        `http://localhost:5000/api/products/filter?${params.toString()}`
      );

      const fetchedProducts = res.data.products || [];
      setProducts(fetchedProducts);
      setTotalPages(res.data.totalPages || 1);

      // robust total count extraction
      setTotalProducts(
        res.data.totalProducts ??
          res.data.totalCount ??
          res.data.total ??
          res.data.count ??
          fetchedProducts.length
      );
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // reset page when key params change
  useEffect(() => setPage(1), [slug, filters, sort]);

  // fetch on dependency changes
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, slug, filters, sort]);

  // image hover slider
  useEffect(() => {
    let interval;
    if (hoveredProduct) {
      interval = setInterval(() => {
        setHoveredImageIndex((prev) => {
          const images =
            products.find((p) => p._id === hoveredProduct)?.images || [];
          return images.length ? (prev + 1) % images.length : 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hoveredProduct, products]);

  // handlers
  const toggleFilterDrawer = () => setOpenFilters((p) => !p);
  const handleBundleChange = (type) =>
    setFilters((prev) => ({
      ...prev,
      bundleType: prev.bundleType === type ? "" : type,
    }));
  const handleToggleSize = (size) =>
    setFilters((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      };
    });

  const getSortLabel = (value) => {
    switch (value) {
      case "oldest":
        return "Oldest";
      case "price_low_to_high":
        return "Price: Low to High";
      case "price_high_to_low":
        return "Price: High to Low";
      case "rating_high_to_low":
        return "Rating: High to Low";
      case "discount_high_to_low":
        return "Discount: High to Low";
      default:
        return "Latest";
    }
  };

  // PRODUCT GRID (keeps fixed image aspect ratio so grid looks tidy)
  const ProductGrid = () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        },
        gap: { xs: 1.5, md: 5 },
        mt: 2,
        ml: 2,
        width: "100%",
      }}
    >
      {products.map((product) => {
        const originalPrice = Math.round(
          product.price / (1 - (product.discountPercent || 0) / 100)
        );
        return (
          <Box
            key={product._id}
            onClick={() => navigate(`/product/${product.slug}`)}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "94%",
                paddingTop: "120%", // consistent tile aspect ratio
                backgroundColor: "#f6f6f7",
                overflow: "hidden",
              }}
              onMouseEnter={() => {
                setHoveredProduct(product._id);
                setHoveredImageIndex(1);
              }}
              onMouseLeave={() => {
                setHoveredProduct(null);
                setHoveredImageIndex(0);
              }}
            >
              <Box
                component="img"
                src={
                  hoveredProduct === product._id &&
                  product.images?.[hoveredImageIndex]
                    ? product.images[hoveredImageIndex]
                    : product.images?.[0] || "/images/default.jpeg"
                }
                alt={product.title}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .28s ease",
                  "&:hover": { transform: "scale(1.03)" },
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#535665",
                }}
              />

              {product.ratings?.average && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    background: "rgba(255,255,255,0.95)",
                    px: 0.8,
                    py: 0.2,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.4,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 600, color: "#000" }}
                  >
                    {product.ratings.average.toFixed(1)}
                  </Typography>
                  <StarIcon sx={{ fontSize: 14, color: "#14958f" }} />
                  <Typography sx={{ fontSize: 12, color: "#000" }}>
                    | {product.ratings.totalCount}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ p: 1 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: 14, color: "#282c3f" }}
              >
                {product.brand}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#555",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.6,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 14, color: "#000" }}
                >
                  Rs. {product.price.toLocaleString("en-IN")}
                </Typography>
                {product.discountPercent > 0 && (
                  <>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#888",
                        textDecoration: "line-through",
                      }}
                    >
                      Rs. {originalPrice.toLocaleString("en-IN")}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, color: "#fa9261", fontWeight: 400 }}
                    >
                      ({product.discountPercent}% OFF)
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );

  // ===== Layout: left column sticky, top controls sticky, page scrolls =====
  return (
    <ContainerFullWidth>
      <Box
        sx={{
          px: { xs: 1.5, sm: 2, md: 4 },
          py: { xs: 2, md: 3 },
          maxWidth: { lg: "1300px", xl: "1540px" },
          mx: "auto",
        }}
      >
        {/* Breadcrumbs + title */}
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              fontSize: { xs: 12, sm: 13 },
              "& .MuiBreadcrumbs-separator": { mx: 0.5 },
            }}
          >
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>
            {mainslug && (
              <Link
                underline="hover"
                color="inherit"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/category/${mainslug}`)}
              >
                {formatSlugLabel(mainslug)}
              </Link>
            )}
            <Typography color="text.primary">
              {formatSlugLabel(slug)}
            </Typography>
          </Breadcrumbs>

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              mt: 1,
              textTransform: "capitalize",
            }}
          >
            {formatSlugLabel(slug)}{" "}
            <Box
              component="span"
              sx={{ fontWeight: 400, color: "#878b94", fontSize: 15 }}
            >
              ({totalProducts} items)
            </Box>
          </Typography>
        </Box>

        {/* mobile filter button */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <IconButton onClick={toggleFilterDrawer}>
            <FilterListIcon />
          </IconButton>
        </Box>

        {/* mobile drawer */}
        <Drawer
          anchor="top"
          open={openFilters}
          onClose={toggleFilterDrawer}
          PaperProps={{ sx: { height: "85vh", p: 2, overflowY: "auto" } }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <IconButton onClick={toggleFilterDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Filters filters={filters} setFilters={setFilters} />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, borderRadius: 2 }}
            onClick={toggleFilterDrawer}
          >
            Apply & Close
          </Button>
        </Drawer>

        {/* Main area: two columns */}
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          {/* LEFT sticky filters column */}
          <Box
            sx={{
              width: { xs: "100%", sm: 260 },
              flexShrink: 0,
              display: { xs: "none", sm: "block" },
              position: "sticky",
              top: HEADER_HEIGHT + 12, // sticky below your app header
              alignSelf: "flex-start",
            }}
          >
            <Filters filters={filters} setFilters={setFilters} />
          </Box>

          {/* RIGHT content column — page scrolls normally */}
          <Box sx={{ flex: 1 }}>
            {/* Top controls - sticky like Myntra */}
            <Box
              sx={{
                top: HEADER_HEIGHT,
                zIndex: 80,
                background: "#fff",
                pt: 1,
                pb: 1,
                mb: 1,
                borderBottom: "1px solid #ececec",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setBundleOpen((p) => !p)}
                    sx={{
                      textTransform: "none",
                      border: "none",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#282c3f",
                      px: 2,
                      py: 0.5,
                    }}
                  >
                    Bundles{" "}
                    {bundleOpen ? (
                      <KeyboardArrowUpIcon fontSize="small" />
                    ) : (
                      <KeyboardArrowDownIcon fontSize="small" />
                    )}
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setSizeOpen((p) => !p)}
                    sx={{
                      textTransform: "none",
                      border: "none",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#282c3f",
                      px: 2,
                      py: 0.5,
                    }}
                  >
                    Size{" "}
                    {sizeOpen ? (
                      <KeyboardArrowUpIcon fontSize="small" />
                    ) : (
                      <KeyboardArrowDownIcon fontSize="small" />
                    )}
                  </Button>
                </Box>

                <FormControl
                  size="small"
                  sx={{
                    minWidth: { sm: 180, md: 240 },
                    background: "#fff",
                    borderRadius: 1,
                  }}
                >
                  <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    displayEmpty
                    renderValue={(v) => {
                      const label = getSortLabel(v);
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Typography sx={{ fontSize: 13, color: "#7e818c" }}>
                            Sort by:
                          </Typography>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            {label}
                          </Typography>
                        </Box>
                      );
                    }}
                  >
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="price_low_to_high">
                      Price: Low to High
                    </MenuItem>
                    <MenuItem value="price_high_to_low">
                      Price: High to Low
                    </MenuItem>
                    <MenuItem value="rating_high_to_low">
                      Rating: High to Low
                    </MenuItem>
                    <MenuItem value="discount_high_to_low">
                      Discount: High to Low
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* bundle dropdown area (pushes content down) */}
              {bundleOpen && (
                <Box
                  sx={{
                    ml: 2,
                    mt: 1,
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={filters.bundleType === "single"}
                        onChange={() => handleBundleChange("single")}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 14 }}>Single</Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={filters.bundleType === "bundle"}
                        onChange={() => handleBundleChange("bundle")}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 14 }}>Bundle</Typography>
                    }
                  />
                </Box>
              )}

              {/* size dropdown area (pushes content down) */}
              {sizeOpen && (
                <Box sx={{ mt: 1, ml: 2 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(4, 1fr)",
                        sm: "repeat(6, 1fr)",
                        md: "repeat(9, 1fr)",
                      },
                      gap: "6px",
                    }}
                  >
                    {sizeOptions.map((sz) => (
                      <FormControlLabel
                        key={sz}
                        control={
                          <Checkbox
                            size="small"
                            checked={filters.sizes.includes(sz)}
                            onChange={() => handleToggleSize(sz)}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: 12 }}>{sz}</Typography>
                        }
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {/* Products grid */}
            <Box>
              {loading ? (
                <Typography>Loading products…</Typography>
              ) : products.length === 0 ? (
                <Typography>No products found</Typography>
              ) : (
                <ProductGrid />
              )}
            </Box>

            {/* Pagination - visible without needing to scroll inside any inner container */}
            <Box
              sx={{
                mt: 4,
                mb: 6,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                disabled={page <= 1}
                variant="outlined"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                Page {page} of {totalPages}
              </Typography>
              <Button
                disabled={page >= totalPages}
                variant="outlined"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ContainerFullWidth>
  );
};

export default CategoryProducts;
