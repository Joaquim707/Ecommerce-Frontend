// import React, { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     // Load from localStorage if available
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Function to update user data
//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData)); // persist
//   };

//   // Function to clear user data (eg., on logout)
//   const clearUser = () => {
//     setUser(null);
//     localStorage.removeItem("user"); // remove from storage
//   };

//   // Keep state in sync with localStorage (optional safeguard)
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//       sessionStorage.setItem("user", JSON.stringify(user));
//     }
//   }, [user]);

//   return (
//     <UserContext.Provider value={{ user, updateUser, clearUser }}>
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  // ------------------------------
  //  FETCH WISHLIST FROM BACKEND
  // ------------------------------
  // const fetchWishlist = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`${API_URL}/wishlist`, {
  //       headers: getAuthHeaders(),
  //     });

  //     if (response.data.ok) {
  //       // Update user with populated wishlist
  //       const updatedUser = { ...user, wishlist: response.data.wishlist };
  //       updateUser(updatedUser);
  //       return response.data.wishlist;
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Fetch wishlist error:",
  //       error.response?.data || error.message
  //     );
  //     return [];
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
        // Update local state with backend response
        setUser((prevUser) => {
          if (!prevUser) return prevUser;
          const updatedUser = {
            ...prevUser,
            wishlist: [...(prevUser.wishlist || []), productId],
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
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
        // Update local state
        setUser((prevUser) => {
          if (!prevUser) return prevUser;
          const updatedWishlist = (prevUser.wishlist || []).filter(
            (id) => id.toString() !== productId.toString()
          );
          const updatedUser = { ...prevUser, wishlist: updatedWishlist };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
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
    return (
      user?.wishlist?.some((id) => id.toString() === productId.toString()) ||
      false
    );
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
  //  FETCH WISHLIST ON MOUNT
  // ------------------------------
  useEffect(() => {
    if (user && localStorage.getItem("token")) {
      fetchWishlist();
    }
  }, []); // Only run once on mount

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
