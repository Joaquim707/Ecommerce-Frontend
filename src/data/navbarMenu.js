import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export const NAVBAR_CATEGORIES = [
  { id: "01", label: "MEN", path: "/category/men" },
  { id: "02", label: "WOMEN", path: "/category/women" },
  { id: "03", label: "KIDS", path: "/category/kids" },
  { id: "04", label: "HOME", path: "/category/home" },
  { id: "05", label: "BEAUTY", path: "/category/beauty" },
];

export const NAVBAR_ICONS = [
  {
    id: "p1",
    label: "Profile",
    icon: PersonOutlineIcon,
    path: "/profile",
  },
  {
    id: "p2",
    label: "Wishlist",
    icon: FavoriteBorderIcon,
    path: "/wishlist",
  },
  {
    id: "p3",
    label: "Bag",
    icon: ShoppingBagOutlinedIcon,
    path: "/cart",
  },
];
