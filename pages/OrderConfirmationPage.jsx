// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Divider,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   CircularProgress,
// } from "@mui/material";

// const OrderConfirmationPage = () => {
//   const { orderId } = useParams(); // grab orderId from URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/orders/${orderId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you store token
//             },
//           }
//         );
//         setOrder(res.data.order);
//         console.log("📌 FETCHED ORDER DATA:", res.data.order);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrder();
//   }, [orderId]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!order) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Typography variant="h6">Order not found</Typography>
//       </Box>
//     );
//   }

//   const {
//     orderNumber,

//     shippingAddress,
//     items,
//     pricing,
//     payment,
//     transactionId,
//   } = order;

//   return (
//     <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Thank You for Your Order!
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           Your order has been successfully placed.
//         </Typography>
//         <Divider sx={{ my: 2 }} />

//         {/* Order & Transaction Info */}
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <Typography variant="subtitle2">Order Number:</Typography>
//             <Typography variant="body1">{orderNumber}</Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="subtitle2">Transaction ID:</Typography>
//             <Typography variant="body1">{transactionId}</Typography>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 2 }} />

//         {/* Shipping Address */}
//         <Typography variant="h6" gutterBottom>
//           Shipping Address
//         </Typography>
//         <Typography>
//           {shippingAddress.fullName}, {shippingAddress.addressLine1}
//           {shippingAddress.addressLine2
//             ? `, ${shippingAddress.addressLine2}`
//             : ""}
//         </Typography>
//         <Typography>
//           {shippingAddress.city} - {shippingAddress.pinCode},{" "}
//           {shippingAddress.state}
//         </Typography>
//         <Typography>Phone: {shippingAddress.mobileNumber}</Typography>

//         <Divider sx={{ my: 2 }} />

//         {/* Order Items */}
//         <Typography variant="h6" gutterBottom>
//           Items
//         </Typography>
//         <List>
//           {items.map((item) => (
//             <ListItem key={item.productId._id} sx={{ py: 1, px: 0 }}>
//               <Grid container alignItems="center">
//                 <Grid item xs={2}>
//                   <img
//                     src={item.productId.images}
//                     alt={item.productId.images}
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <ListItemText
//                     primary={item.name}
//                     secondary={`Brand: ${item.brand} | Size: ${item.size} | Color: ${item.color}`}
//                   />
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Typography>Qty: {item.quantity}</Typography>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Typography>₹{item.price * item.quantity}</Typography>
//                 </Grid>
//               </Grid>
//             </ListItem>
//           ))}
//         </List>

//         <Divider sx={{ my: 2 }} />

//         {/* Pricing */}
//         <Typography variant="h6" gutterBottom>
//           Pricing Summary
//         </Typography>
//         <Table>
//           <TableBody>
//             <TableRow>
//               <TableCell>Total MRP</TableCell>
//               <TableCell>₹{pricing.totalMRP}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>Total Discount</TableCell>
//               <TableCell>- ₹{pricing.totalDiscount}</TableCell>
//             </TableRow>
//             {pricing.couponDiscount > 0 && (
//               <TableRow>
//                 <TableCell>Coupon Discount</TableCell>
//                 <TableCell>- ₹{pricing.couponDiscount}</TableCell>
//               </TableRow>
//             )}
//             {pricing.donation > 0 && (
//               <TableRow>
//                 <TableCell>Donation</TableCell>
//                 <TableCell>₹{pricing.donation}</TableCell>
//               </TableRow>
//             )}
//             <TableRow>
//               <TableCell>
//                 <strong>Total Amount</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>₹{pricing.totalAmount}</strong>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>

//         <Divider sx={{ my: 2 }} />

//         {/* Payment Info */}
//         <Typography variant="h6" gutterBottom>
//           Payment Information
//         </Typography>
//         <Typography>Method: {payment.method}</Typography>
//         <Typography>Status: {payment.status}</Typography>
//         <Typography>
//           Paid At: {new Date(payment.paidAt).toLocaleString()}
//         </Typography>

//         <Box sx={{ mt: 3, textAlign: "center" }}>
//           <Button variant="contained" color="primary" href="/">
//             Continue Shopping
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default OrderConfirmationPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrder(res.data.order);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6">Order not found</Typography>
      </Box>
    );
  }

  const { orderNumber, shippingAddress, items, pricing, payment } = order;
  const { transactionId } = payment;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Thank You for Your Order!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Your order has been successfully placed.
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* Order & Transaction Info */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Order Number:</Typography>
            <Typography variant="body1">{orderNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Transaction ID:</Typography>
            <Typography variant="body1">{payment.transactionId}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Shipping Address */}
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Typography>
          {shippingAddress.fullName}, {shippingAddress.addressLine1}
          {shippingAddress.addressLine2
            ? `, ${shippingAddress.addressLine2}`
            : ""}
        </Typography>
        <Typography>
          {shippingAddress.city} - {shippingAddress.pinCode},{" "}
          {shippingAddress.state}
        </Typography>
        <Typography>Phone: {shippingAddress.mobileNumber}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* Order Items */}
        <Typography variant="h6" gutterBottom>
          Items
        </Typography>
        <List>
          {items.map((item) => (
            <ListItem key={item.productId._id} sx={{ py: 1, px: 0 }}>
              <Grid container alignItems="center" spacing={7}>
                <Grid item>
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      border: "1px solid #e0e0e0",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={item.image || "/images/default.jpeg"}
                      alt={item.name || "Product Image"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fit",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs>
                  <ListItemText
                    primary={item.name}
                    secondary={`Brand: ${item.brand} | Size: ${item.size} | Color: ${item.color}`}
                  />
                </Grid>
                <Grid item>
                  <Typography>Qty: {item.quantity}</Typography>
                </Grid>
                <Grid item>
                  <Typography>₹{item.price * item.quantity}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Pricing */}
        <Typography variant="h6" gutterBottom>
          Pricing Summary
        </Typography>
        <Table sx={{ mb: 3 }}>
          <TableBody>
            <TableRow>
              <TableCell>Total MRP</TableCell>
              <TableCell sx={{ textAlign: "right", pr: 6 }}>
                ₹{pricing.totalMRP}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Discount</TableCell>
              <TableCell sx={{ textAlign: "right", pr: 6 }}>
                - ₹{pricing.totalDiscount}
              </TableCell>
            </TableRow>
            {pricing.couponDiscount > 0 && (
              <TableRow>
                <TableCell>Coupon Discount</TableCell>
                <TableCell sx={{ textAlign: "right", pr: 6 }}>
                  - ₹{pricing.couponDiscount}
                </TableCell>
              </TableRow>
            )}
            {pricing.donation > 0 && (
              <TableRow>
                <TableCell>Donation</TableCell>
                <TableCell sx={{ textAlign: "right", pr: 6 }}>
                  ₹{pricing.donation}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>
                <strong>Total Amount</strong>
              </TableCell>
              <TableCell sx={{ textAlign: "right", pr: 6 }}>
                <strong>₹{pricing.totalAmount}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Payment Info */}
        <Typography variant="h6" gutterBottom>
          Payment Information
        </Typography>
        <Typography>Method: {payment.method}</Typography>
        <Typography>Status: {payment.status}</Typography>
        <Typography>
          Paid At: {new Date(payment.paidAt).toLocaleString()}
        </Typography>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button variant="contained" color="primary" href="/">
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderConfirmationPage;
