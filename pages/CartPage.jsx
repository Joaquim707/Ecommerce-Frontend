import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Cart response:", res.data);
        setCart(res.data); // adjust if your data structure is different
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchCart();
  }, [userId]);

  if (loading) return <Typography>Loading cart...</Typography>;
  if (!cart.items || cart.items.length === 0)
    return <Typography>Your cart is empty</Typography>;

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Your Cart
      </Typography>
      <Stack spacing={2}>
        {cart.items.map((item) => (
          <Card key={item.productId} sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={item.image || item.images?.[0] || "/placeholder.png"}
              alt={item.title}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>Size: {item.size}</Typography>
              <Typography>Color: {item.color}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: ₹{item.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Typography variant="h5" mt={3}>
        Total: ₹{totalPrice}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Checkout
      </Button>
    </Box>
  );
};

export default CartPage;
