// import { useContext } from "react";
// import { UserContext } from "../context/userContext";
// import { Button } from "@mui/material";
// export default function WishlistIcon({ productId }) {
//   const { addToWishlist, removeFromWishlist, isInWishlist } =
//     useContext(UserContext);
//   const saved = isInWishlist(productId);
//   return (
//     <Button
//       variant="outlined"
//       sx={{
//         borderColor: "#d4d5d9",
//         color: "#282c3f",
//         width: "209px",
//         px: 6,
//         py: 1.4,
//         fontSize: 16,
//         fontWeight: 700,
//         borderRadius: "5px",
//         textTransform: "uppercase",
//         backgroundColor: "#fff",
//         "&:hover": {
//           borderColor: "#282c3f",
//           backgroundColor: "#f5f5f6",
//         },
//         gap: 0.5,
//       }}
//       onClick={() =>
//         saved ? removeFromWishlist(productId) : addToWishlist(productId)
//       }
//     >
//       {" "}
//       {saved ? "❤️" : "🤍"} Wishlist
//     </Button>
//   );
// }

import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function WishlistIcon({ productId }) {
  const { addToWishlist, removeFromWishlist, isInWishlist, user } =
    useContext(UserContext);

  const navigate = useNavigate();

  const saved = isInWishlist(productId);

  const handleWishlist = () => {
    if (!user) {
      navigate("/login"); // Redirect if NOT logged in
      return;
    }

    saved ? removeFromWishlist(productId) : addToWishlist(productId);
  };

  return (
    <Button
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
      onClick={handleWishlist}
    >
      {saved ? "❤️" : "🤍"} Wishlist
    </Button>
  );
}
