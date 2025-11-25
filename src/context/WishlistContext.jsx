import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("token");

  // Load from backend on mount
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/wishlist/get", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWishlist(res.data.wishlist))
      .catch(() => {});
  }, [token]);

  const addToWishlist = async (productId) => {
    if (!token) return alert("Login required");

    const res = await axios.post(
      "http://localhost:5000/api/wishlist/add",
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setWishlist(res.data.wishlist);
  };

  const removeFromWishlist = async (productId) => {
    if (!token) return;

    const res = await axios.post(
      "http://localhost:5000/api/wishlist/remove",
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setWishlist(res.data.wishlist);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
