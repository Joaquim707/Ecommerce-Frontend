// // import React, { createContext, useState, useEffect } from "react";

// // export const UserContext = createContext();

// // const UserProvider = ({ children }) => {
// //   const [user, setUser] = useState(() => {
// //     // Load from localStorage if available
// //     const storedUser = localStorage.getItem("user");
// //     return storedUser ? JSON.parse(storedUser) : null;
// //   });

// //   // Function to update user data
// //   const updateUser = (userData) => {
// //     setUser(userData);
// //     localStorage.setItem("user", JSON.stringify(userData)); // persist
// //   };

// //   // Function to clear user data (eg., on logout)
// //   const clearUser = () => {
// //     setUser(null);
// //     localStorage.removeItem("user"); // remove from storage
// //   };

// //   // Keep state in sync with localStorage (optional safeguard)
// //   useEffect(() => {
// //     if (user) {
// //       localStorage.setItem("user", JSON.stringify(user));
// //       sessionStorage.setItem("user", JSON.stringify(user));
// //     }
// //   }, [user]);

// //   return (
// //     <UserContext.Provider value={{ user, updateUser, clearUser }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export default UserProvider;

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const UserContext = createContext();

// const API_URL = "http://localhost:5000/api"; // Adjust to your backend URL

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     // Load from localStorage if available
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [loading, setLoading] = useState(false);

//   // ------------------------------
//   //  AXIOS INSTANCE WITH AUTH
//   // ------------------------------
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   // ------------------------------
//   //  UPDATE USER
//   // ------------------------------
//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   // ------------------------------
//   //  CLEAR USER (LOGOUT)
//   // ------------------------------
//   const clearUser = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//   };

//   // ------------------------------
//   //  FETCH WISHLIST FROM BACKEND
//   // ------------------------------
//   const fetchWishlist = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_URL}/wishlist`, {
//         headers: getAuthHeaders(),
//       });

//       if (response.data.ok) {
//         // response.data.wishlist now contains full product objects
//         const updatedUser = { ...user, wishlist: response.data.wishlist };
//         updateUser(updatedUser);
//         return response.data.wishlist;
//       }
//     } catch (error) {
//       console.error(
//         "Fetch wishlist error:",
//         error.response?.data || error.message
//       );
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------
//   //  ADD TO WISHLIST (API + LOCAL)
//   // ------------------------------
//   const addToWishlist = async (productId) => {
//     try {
//       setLoading(true);

//       // Call backend API
//       const response = await axios.post(
//         `${API_URL}/wishlist/add`,
//         { productId },
//         { headers: getAuthHeaders() }
//       );

//       if (response.data.ok) {
//         // Fetch fresh wishlist to stay in sync with backend
//         await fetchWishlist();
//         return { success: true, message: response.data.message };
//       }
//     } catch (error) {
//       console.error(
//         "Add to wishlist error:",
//         error.response?.data || error.message
//       );
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to add to wishlist",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------
//   //  REMOVE FROM WISHLIST (API + LOCAL)
//   // ------------------------------
//   const removeFromWishlist = async (productId) => {
//     try {
//       setLoading(true);

//       // Call backend API
//       const response = await axios.post(
//         `${API_URL}/wishlist/remove`,
//         { productId },
//         { headers: getAuthHeaders() }
//       );

//       if (response.data.ok) {
//         // Fetch fresh wishlist to stay in sync with backend
//         await fetchWishlist();
//         return { success: true, message: response.data.message };
//       }
//     } catch (error) {
//       console.error(
//         "Remove from wishlist error:",
//         error.response?.data || error.message
//       );
//       return {
//         success: false,
//         message:
//           error.response?.data?.message || "Failed to remove from wishlist",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------
//   //  CHECK IF IN WISHLIST
//   // ------------------------------
//   const isInWishlist = (productId) => {
//     if (!user?.wishlist) return false;
//     return user.wishlist.some((item) => {
//       // Handle both object and ID formats
//       const itemId = typeof item === "object" ? item._id || item.id : item;
//       return itemId.toString() === productId.toString();
//     });
//   };

//   // ------------------------------
//   //  CLEAR ENTIRE WISHLIST
//   // ------------------------------
//   const clearWishlist = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.delete(`${API_URL}/wishlist/clear`, {
//         headers: getAuthHeaders(),
//       });

//       if (response.data.ok) {
//         setUser((prevUser) => {
//           if (!prevUser) return prevUser;
//           const updatedUser = { ...prevUser, wishlist: [] };
//           localStorage.setItem("user", JSON.stringify(updatedUser));
//           return updatedUser;
//         });
//         return { success: true, message: response.data.message };
//       }
//     } catch (error) {
//       console.error(
//         "Clear wishlist error:",
//         error.response?.data || error.message
//       );
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to clear wishlist",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------
//   //  FETCH WISHLIST ON MOUNT
//   // ------------------------------
//   useEffect(() => {
//     if (user && localStorage.getItem("token")) {
//       fetchWishlist();
//     }
//   }, []); // Only run once on mount

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         loading,
//         updateUser,
//         clearUser,
//         addToWishlist,
//         removeFromWishlist,
//         isInWishlist,
//         clearWishlist,
//         fetchWishlist,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const API_URL = "http://localhost:5000/api"; // Adjust to your backend URL

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------------------------------
  //  AXIOS INSTANCE WITH AUTH
  // ------------------------------
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ------------------------------
  //  UPDATE USER
  // ------------------------------
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ------------------------------
  //  CLEAR USER (LOGOUT)
  // ------------------------------
  const clearUser = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  // ------------------------------
  //  FETCH WISHLIST FROM BACKEND
  // ------------------------------
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/wishlist`, {
        headers: getAuthHeaders(),
      });

      if (response.data.ok) {
        // response.data.wishlist now contains full product objects
        const updatedUser = { ...user, wishlist: response.data.wishlist };
        updateUser(updatedUser);
        return response.data.wishlist;
      }
    } catch (error) {
      console.error(
        "Fetch wishlist error:",
        error.response?.data || error.message
      );
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  //  ADD TO WISHLIST (API + LOCAL)
  // ------------------------------
  const addToWishlist = async (productId) => {
    try {
      setLoading(true);

      // Call backend API
      const response = await axios.post(
        `${API_URL}/wishlist/add`,
        { productId },
        { headers: getAuthHeaders() }
      );

      if (response.data.ok) {
        // Fetch fresh wishlist to stay in sync with backend
        await fetchWishlist();
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error(
        "Add to wishlist error:",
        error.response?.data || error.message
      );
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add to wishlist",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  //  REMOVE FROM WISHLIST (API + LOCAL)
  // ------------------------------
  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true);

      // Call backend API
      const response = await axios.post(
        `${API_URL}/wishlist/remove`,
        { productId },
        { headers: getAuthHeaders() }
      );

      if (response.data.ok) {
        // Fetch fresh wishlist to stay in sync with backend
        await fetchWishlist();
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error(
        "Remove from wishlist error:",
        error.response?.data || error.message
      );
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to remove from wishlist",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  //  CHECK IF IN WISHLIST
  // ------------------------------
  const isInWishlist = (productId) => {
    if (!user?.wishlist) return false;
    return user.wishlist.some((item) => {
      // Handle both object and ID formats
      const itemId = typeof item === "object" ? item._id || item.id : item;
      return itemId.toString() === productId.toString();
    });
  };

  // ------------------------------
  //  CLEAR ENTIRE WISHLIST
  // ------------------------------
  const clearWishlist = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(`${API_URL}/wishlist/clear`, {
        headers: getAuthHeaders(),
      });

      if (response.data.ok) {
        setUser((prevUser) => {
          if (!prevUser) return prevUser;
          const updatedUser = { ...prevUser, wishlist: [] };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error(
        "Clear wishlist error:",
        error.response?.data || error.message
      );
      return {
        success: false,
        message: error.response?.data?.message || "Failed to clear wishlist",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  //  FETCH CART FROM BACKEND
  // ------------------------------
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart`, {
        headers: getAuthHeaders(),
      });
      setCart(response.data.items || []);
      return response.data.items || [];
    } catch (error) {
      console.error("Fetch cart error:", error.response?.data || error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  //  ADD TO CART (API + LOCAL)
  // ------------------------------
  // const addToCart = async (productId, size, color) => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.post(
  //       `${API_URL}/cart/add`,
  //       { productId, size, color },
  //       { headers: getAuthHeaders() }
  //     );

  //     if (response.data.cart?.items) {
  //       setCart(response.data.cart.items);
  //       return { success: true, message: "Added to cart successfully" };
  //     }

  //     return { success: true };
  //   } catch (error) {
  //     console.error(
  //       "Add to cart error:",
  //       error.response?.data || error.message
  //     );
  //     return {
  //       success: false,
  //       message: error.response?.data?.message || "Failed to add to cart",
  //     };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const addToCart = async (productId, size, color, userId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        productId,
        size,
        color,
        userId,
      });

      console.log("Cart updated:", response.data);
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  // ------------------------------
  //  REMOVE FROM CART (API + LOCAL)
  // ------------------------------
  const removeFromCart = async (productId, size) => {
    try {
      setLoading(true);

      const response = await axios.delete(`${API_URL}/cart/remove`, {
        data: { productId, size },
        headers: getAuthHeaders(),
      });

      if (response.data.items) {
        setCart(response.data.items);
        return { success: true, message: "Removed from cart" };
      }
    } catch (error) {
      console.error(
        "Remove from cart error:",
        error.response?.data || error.message
      );
      return {
        success: false,
        message: error.response?.data?.message || "Failed to remove from cart",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  //  UPDATE CART QUANTITY (API + LOCAL)
  // ------------------------------
  const updateQuantity = async (productId, size, qty) => {
    try {
      setLoading(true);

      const response = await axios.put(
        `${API_URL}/cart/update`,
        { productId, size, qty },
        { headers: getAuthHeaders() }
      );

      if (response.data.items) {
        setCart(response.data.items);
        return { success: true, message: "Quantity updated" };
      }
    } catch (error) {
      console.error(
        "Update quantity error:",
        error.response?.data || error.message
      );
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update quantity",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  //  CLEAR ENTIRE CART
  // ------------------------------
  const clearCart = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(`${API_URL}/cart/clear`, {
        headers: getAuthHeaders(),
      });

      if (response.data.ok) {
        setCart([]);
        return { success: true, message: "Cart cleared successfully" };
      }
    } catch (error) {
      console.error("Clear cart error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to clear cart",
      };
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  //  GET CART TOTAL
  // ------------------------------
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  // ------------------------------
  //  GET CART ITEM COUNT
  // ------------------------------
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  // ------------------------------
  //  FETCH DATA ON MOUNT
  // ------------------------------
  useEffect(() => {
    if (user && localStorage.getItem("token")) {
      fetchWishlist();
      fetchCart();
    }
  }, []); // Only run once on mount

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
        // Wishlist functions
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        fetchWishlist,
        // Cart functions
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
