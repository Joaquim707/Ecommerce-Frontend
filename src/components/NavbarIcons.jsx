// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   IconButton,
//   Typography,
//   Badge,
//   Popover,
//   Button,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import axios from "axios";

// const NavbarIcons = ({ NAVBAR_ICONS }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await axios.get("http://localhost:5000/api/user/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//         console.log("USER RESPONSE:", res.data);
//       } catch (err) {
//         console.error("Failed to fetch user", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/"); // redirect to home
//   };

//   const handleOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const open = Boolean(anchorEl);

//   return (
//     <Box
//       sx={{
//         display: { xs: "none", sm: "flex" },
//         alignItems: "center",
//         gap: 3,
//         fontSize: "16px",
//         fontWeight: 700,
//       }}
//     >
//       {NAVBAR_ICONS.map((item, index) => {
//         const isProfile = index === 0;

//         return (
//           <Box key={item.id} sx={{ textAlign: "center" }}>
//             <IconButton
//               component={isProfile ? "div" : Link}
//               to={isProfile ? undefined : item.path}
//               onMouseEnter={isProfile ? handleOpen : undefined}
//               sx={{ color: "#282c3f", fontWeight: 400 }}
//             >
//               {item.label === "Bag" ? (
//                 <Badge badgeContent={0} color="error">
//                   <item.icon />
//                 </Badge>
//               ) : isProfile ? (
//                 <AccountCircleIcon fontSize="large" />
//               ) : (
//                 <item.icon />
//               )}
//             </IconButton>

//             <Typography
//               sx={{
//                 fontSize: 12,
//                 lineHeight: "1px",
//                 fontWeight: 700,
//                 color: "#282c3f",
//               }}
//             >
//               {item.label}
//             </Typography>

//             {/* ---------------------- PROFILE POPOVER ---------------------- */}
//             {isProfile && (
//               <Popover
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 transformOrigin={{ vertical: "top", horizontal: "right" }}
//                 PaperProps={{
//                   sx: { p: 2, minWidth: 230 },
//                   onMouseEnter: () => setAnchorEl(anchorEl),
//                   onMouseLeave: handleClose,
//                 }}
//                 disableRestoreFocus
//               >
//                 {/* ---------------------- IF USER LOGGED IN ---------------------- */}
//                 {user ? (
//                   <>
//                     <Typography variant="subtitle1">
//                       Hello, {user.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {user.phone}
//                     </Typography>

//                     <Box mt={1}>
//                       <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                         Orders
//                       </Typography>
//                       <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                         Wishlist
//                       </Typography>
//                       <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                         Gift Cards
//                       </Typography>
//                       <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                         Contact Us
//                       </Typography>

//                       <Typography
//                         sx={{ cursor: "pointer", p: 0.5, color: "error.main" }}
//                       >
//                         Myntra Insider New
//                       </Typography>

//                       <Box mt={1}>
//                         <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                           Edit Profile
//                         </Typography>

//                         {/* LOGOUT BUTTON */}
//                         <Typography
//                           sx={{ cursor: "pointer", p: 0.5, color: "red" }}
//                           onClick={handleLogout}
//                         >
//                           Logout
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </>
//                 ) : (
//                   /* ---------------------- IF NOT LOGGED IN ---------------------- */
//                   <>
//                     <Typography fontWeight={700}>Welcome</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       To access account and manage orders
//                     </Typography>

//                     <Button
//                       variant="outlined"
//                       fullWidth
//                       sx={{ mt: 1, borderColor: "#ff3f6c", color: "#ff3f6c" }}
//                       component={Link}
//                       to="/login"
//                     >
//                       LOGIN / SIGNUP
//                     </Button>

//                     <Box mt={2}>
//                       <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                         Orders
//                       </Typography>
//                       <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                         Wishlist
//                       </Typography>
//                       <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                         Gift Cards
//                       </Typography>
//                       <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                         Contact Us
//                       </Typography>
//                       <Typography
//                         sx={{ cursor: "pointer", p: 0.5, color: "error.main" }}
//                       >
//                         Myntra Insider
//                       </Typography>

//                       <Box mt={1}>
//                         <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                           Myntra Credit
//                         </Typography>
//                         <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                           Coupons
//                         </Typography>
//                         <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                           Saved Cards
//                         </Typography>
//                         <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                           Saved VPA
//                         </Typography>
//                         <Typography sx={{ cursor: "pointer", p: 0.5 }}>
//                           Saved Addresses
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </>
//                 )}
//               </Popover>
//             )}
//           </Box>
//         );
//       })}
//     </Box>
//   );
// };

// export default NavbarIcons;

import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import {
  Box,
  IconButton,
  Typography,
  Badge,
  Popover,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavbarIcons = ({ NAVBAR_ICONS }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // ⬇️ Get user and clearUser from context
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser(); // removes user + token from localStorage & context
    navigate("/");
  };

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        alignItems: "center",
        gap: 3,
        fontSize: "16px",
        fontWeight: 700,
      }}
    >
      {NAVBAR_ICONS.map((item, index) => {
        const isProfile = index === 0;

        return (
          <Box key={item.id} sx={{ textAlign: "center" }}>
            <IconButton
              component={isProfile ? "div" : Link}
              to={isProfile ? undefined : item.path}
              onMouseEnter={isProfile ? handleOpen : undefined}
              sx={{ color: "#282c3f", fontWeight: 400 }}
            >
              {item.label === "Bag" ? (
                <Badge badgeContent={0} color="error">
                  <item.icon />
                </Badge>
              ) : isProfile ? (
                <AccountCircleIcon fontSize="large" />
              ) : (
                <item.icon />
              )}
            </IconButton>

            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "1px",
                fontWeight: 700,
                color: "#282c3f",
              }}
            >
              {item.label}
            </Typography>

            {/* PROFILE POPOVER */}
            {isProfile && (
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: { p: 2, minWidth: 230 },
                  onMouseEnter: () => setAnchorEl(anchorEl),
                  onMouseLeave: handleClose,
                }}
                disableRestoreFocus
              >
                {/* USER LOGGED IN */}
                {user ? (
                  <>
                    <Typography variant="subtitle1">
                      Hello, {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.phone}
                    </Typography>

                    <Box mt={1}>
                      <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                        Orders
                      </Typography>
                      <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                        Wishlist
                      </Typography>
                      <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                        Gift Cards
                      </Typography>
                      <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                        Contact Us
                      </Typography>

                      <Typography
                        sx={{ cursor: "pointer", p: 0.5, color: "error.main" }}
                      >
                        Myntra Insider New
                      </Typography>

                      <Box mt={1}>
                        <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                          Edit Profile
                        </Typography>

                        {/* LOGOUT */}
                        <Typography
                          sx={{ cursor: "pointer", p: 0.5, color: "red" }}
                          onClick={handleLogout}
                        >
                          Logout
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  /* USER NOT LOGGED IN */
                  <>
                    <Typography fontWeight={700}>Welcome</Typography>
                    <Typography variant="body2" color="text.secondary">
                      To access account and manage orders
                    </Typography>

                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 1, borderColor: "#ff3f6c", color: "#ff3f6c" }}
                      component={Link}
                      to="/login"
                    >
                      LOGIN / SIGNUP
                    </Button>

                    <Box mt={2}>
                      <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                        Orders
                      </Typography>
                      <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                        Wishlist
                      </Typography>
                      <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                        Gift Cards
                      </Typography>
                      <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                        Contact Us
                      </Typography>
                      <Typography
                        sx={{ cursor: "pointer", p: 0.5, color: "error.main" }}
                      >
                        Myntra Insider
                      </Typography>

                      <Box mt={1}>
                        <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                          Myntra Credit
                        </Typography>
                        <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                          Coupons
                        </Typography>
                        <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                          Saved Cards
                        </Typography>
                        <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                          Saved VPA
                        </Typography>
                        <Typography sx={{ cursor: "pointer", p: 0.5 }}>
                          Saved Addresses
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </Popover>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default NavbarIcons;
