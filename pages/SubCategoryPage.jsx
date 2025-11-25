// // import { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import axios from "../src/utils/axiosInstance";

// // const SubCategoryPage = () => {
// //   const { subSlug } = useParams();
// //   const [subSubCategories, setSubSubCategories] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get(`/categories/sub/${subSlug}`)
// //       .then((res) => setSubSubCategories(res.data.subCategories));
// //   }, [subSlug]);

// //   return (
// //     <div className="grid">
// //       {subSubCategories.map((cat) => (
// //         <Link key={cat._id} to={`/products/${cat._id}`}>
// //           <img src={cat.image} alt={cat.name} />
// //           <p>{cat.name}</p>
// //         </Link>
// //       ))}
// //     </div>
// //   );
// // };

// // export default SubCategoryPage;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "../src/utils/axiosInstance";
// import {
//   Box,
//   Grid,
//   Card,
//   CardActionArea,
//   CardMedia,
//   CardContent,
//   Typography,
// } from "@mui/material";

// const SubCategoryPage = () => {
//   const { subSlug } = useParams();
//   const [subSubCategories, setSubSubCategories] = useState([]);

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/categories/sub/${subSlug}`
//         );
//         setSubSubCategories(res.data.subCategories || []);
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     };

//     fetchSubCategories();
//   }, [subSlug]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
//         {subSlug.toUpperCase()}
//       </Typography>

//       <Box
//         sx={{
//           display: "grid",
//           gap: 2,
//           gridTemplateColumns: {
//             xs: "repeat(2, 1fr)", // Mobile
//             sm: "repeat(3, 1fr)", // Small tablets
//             md: "repeat(4, 1fr)", // Tablets
//             lg: "repeat(5, 1fr)", // Small desktop
//             xl: "repeat(7, 1fr)", // Full laptop/desktop 7 per row
//           },
//         }}
//       >
//         {subSubCategories.map((cat) => (
//           <Card key={cat._id} sx={{ borderRadius: 2, boxShadow: 2 }}>
//             <CardActionArea component={Link} to={`/category/${cat.slug}`}>
//               <CardMedia
//                 component="img"
//                 image={cat.image || "/Categories/Men-cat.jpeg"}
//                 alt={cat.name}
//                 sx={{
//                   height: { xs: 200, sm: 250, md: 250, lg: 270 },
//                   objectFit: "cover",
//                 }}
//               />
//               <CardContent sx={{ textAlign: "center" }}>
//                 <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
//                   {cat.name}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default SubCategoryPage;
