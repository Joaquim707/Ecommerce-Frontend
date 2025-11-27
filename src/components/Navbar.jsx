import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  Drawer,
  Dialog,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import MegaMenu from "../components/MegaMenu";
import { CATEGORIES } from "../utils/apiPaths";
import { NAVBAR_ICONS } from "../data/navbarMenu";
import NavbarIcons from "./NavbarIcons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const [subOpenItems, setSubOpenItems] = useState({});
  const [activeMenu, setActiveMenu] = useState(null); // 👈 current active/hovered category
  const [selectedCategory, setSelectedCategory] = useState(null); // 👈 stores clicked category
  const [categoryLevels, setCategoryLevels] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); // 👈 react-router hook to detect path
  const [searchText, setSearchText] = useState("");

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = () => {
    if (!searchText) return;

    // Navigate to search results page
    navigate(`/category/${encodeURIComponent(searchText)}`);
  };

  // ✅ Fetch categories from API
  useEffect(() => {
    axios
      .get(CATEGORIES.ALL)
      .then((res) => {
        const raw = res.data.categories || {};
        const sorted = {};
        Object.keys(raw).forEach((levelKey) => {
          sorted[levelKey] = [...raw[levelKey]].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
        });
        setCategoryLevels(sorted);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ Keep active highlight when user navigates
  useEffect(() => {
    const pathCategory = location.pathname.split("/category/")[1];
    if (pathCategory) setSelectedCategory(pathCategory);
  }, [location]);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          borderBottom: "0.2px solid #e2e2e257",
          overflow: "visible",
          display: "flex",
          alignItems: "center",
          boxShadow: "0px 3px 8px rgba(241, 241, 241, 0.42)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            overflow: "visible",
          }}
        >
          {/* LOGO */}
          <Link to="/">
            <Box
              component="img"
              src="/logo.png"
              alt="logo"
              sx={{
                width: 60,
                height: 46,
                cursor: "pointer",
                ml: { lg: 0, xl: "30%" },
              }}
            />
          </Link>

          {/* CATEGORY MENU (Desktop with Hover Dropdown) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4.5,
              position: "relative",
              alignItems: "center",
            }}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {categoryLevels.level0?.map((item) => {
              const subcats =
                categoryLevels.level1?.filter(
                  (sub) => sub.parentId === item._id
                ) || [];

              // ✅ Check active/hover state
              const isActive =
                location.pathname !== "/login" &&
                (activeMenu === item.slug || selectedCategory === item.slug);

              return (
                <Box
                  key={item._id}
                  onMouseEnter={() => setActiveMenu(item.slug)}
                  sx={{ position: "relative" }}
                >
                  {/* Main Category Link */}
                  <Link
                    to={`/category/${item.slug}`}
                    // onClick={() => setSelectedCategory(item.slug)}
                    className="nav-link"
                    style={{
                      color: isActive ? "#ff3f6c" : "#282c3f",
                      fontWeight: 700,
                      lineHeight: "80px",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      paddingBottom: "30px",
                      textDecoration: "none",
                      borderBottom: isActive
                        ? "2px solid #ff3f6c"
                        : "2px solid transparent",
                      transition: "all 0.2s ease",
                    }}
                    // onMouseEnter={() => setActiveMenu(item.slug)}
                  >
                    {item.name}
                    {item.name === "STUDIO" && (
                      <Typography
                        component="span"
                        sx={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#ff3f6c",
                          ml: 0.5,
                          position: "relative",
                          top: -6,
                        }}
                      >
                        NEW
                      </Typography>
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {activeMenu === item.slug && (
                    <MegaMenu
                      open={true}
                      subcategories={subcats}
                      level2={categoryLevels.level2}
                      onClose={() => setActiveMenu(null)}
                    />
                  )}
                </Box>
              );
            })}
          </Box>

          {/* SEARCH BAR (Desktop) */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mx: 2,
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                background: "#f5f5f6",
                borderRadius: 1,
                ml: { xs: 0, sm: 0, md: 15, lg: 10, xl: 20 },
                height: 40,
                gap: 1,
                minWidth: { sm: 300, lg: 300, xl: 641 },
                maxWidth: "600px",
              }}
            >
              <SearchIcon
                sx={{
                  color: "#6e6e6e",
                  fontSize: 20,
                  ml: 2,
                  cursor: "pointer",
                }}
                onClick={handleSearch}
              />

              <InputBase
                placeholder="Search for products, brands and more"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                sx={{
                  ml: 1,
                  flex: 1,
                  fontSize: 14,
                  color: "#696e79",
                  fontWeight: 400,
                  "&::placeholder": {
                    fontWeight: 400,
                    color: "#696e79",
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={handleToggle}
            >
              <MenuIcon sx={{ color: "#282c3f" }} />
            </IconButton>

            {/* ICONS */}
            {/* <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 3,
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              {NAVBAR_ICONS.map((item) => (
                <Box key={item.id} sx={{ textAlign: "center" }}>
                  <IconButton
                    component={Link}
                    to={item.path}
                    sx={{
                      color: "#282c3f",
                      fontWeight: 400,
                      mb: 0,
                    }}
                  >
                    {item.label === "Bag" ? (
                      <Badge badgeContent={0} color="error">
                        <item.icon />
                      </Badge>
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
                      mt: 0,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box> */}

            <NavbarIcons NAVBAR_ICONS={NAVBAR_ICONS} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile Drawer + Bottom Nav remain unchanged */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleToggle}
        PaperProps={{ sx: { width: 280, p: 2, bgcolor: "#fff" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <Box
              component="img"
              src="/logo.png"
              alt="logo"
              sx={{ width: 80, height: 80, ml: 1, cursor: "pointer" }}
            />
          </Link>
          <IconButton onClick={handleToggle}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {categoryLevels.level0?.map((level0) => {
            const isOpen = openItems[level0._id] || false;
            const subcategories =
              categoryLevels.level1?.filter(
                (sub) => sub.parentId === level0._id
              ) || [];

            return (
              <Box key={level0._id}>
                <ListItemButton
                  onClick={() =>
                    setOpenItems((prev) => ({
                      ...prev,
                      [level0._id]: !prev[level0._id],
                    }))
                  }
                  sx={{ fontWeight: 600, fontSize: 15, color: "#282c3f" }}
                >
                  <ListItemText primary={level0.name} />
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                {/* Level 1 Subcategories */}
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subcategories.map((subcat) => {
                      const isSubOpen = subOpenItems[subcat._id] || false;
                      const level2Items =
                        categoryLevels.level2?.filter(
                          (child) => child.parentId === subcat._id
                        ) || [];

                      return (
                        <Box key={subcat._id}>
                          <ListItemButton
                            onClick={() =>
                              level2Items.length
                                ? setSubOpenItems((prev) => ({
                                    ...prev,
                                    [subcat._id]: !prev[subcat._id],
                                  }))
                                : handleToggle()
                            }
                            component={level2Items.length ? "div" : Link}
                            to={
                              !level2Items.length
                                ? `/category/${subcat.slug}`
                                : undefined
                            }
                            sx={{
                              pl: 4,
                              fontSize: 14,
                              color: "#444",
                              "&:hover": { color: "#ff3f6c" },
                            }}
                          >
                            <ListItemText primary={subcat.name} />
                            {level2Items.length > 0 &&
                              (isSubOpen ? <ExpandLess /> : <ExpandMore />)}
                          </ListItemButton>

                          {/* Level 2 Subcategories */}
                          <Collapse in={isSubOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {level2Items.map((child) => (
                                <ListItemButton
                                  key={child._id}
                                  component={Link}
                                  to={`/category/${child.slug}`}
                                  onClick={handleToggle}
                                  sx={{
                                    pl: 6,
                                    fontSize: 13,
                                    color: "#666",
                                    "&:hover": { color: "#ff3f6c" },
                                  }}
                                >
                                  <ListItemText primary={child.name} />
                                </ListItemButton>
                              ))}
                            </List>
                          </Collapse>
                        </Box>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            );
          })}
        </List>
      </Drawer>

      {/* ✅ Bottom Navigation (Phones Only) */}
      <BottomNavigation
        showLabels
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "#fff",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.15)",
          zIndex: 1200,
        }}
      >
        {NAVBAR_ICONS.map((item) => (
          <BottomNavigationAction
            key={item.id}
            label={item.label}
            icon={
              item.label === "Bag" ? (
                <Badge badgeContent={1} color="error">
                  <item.icon />
                </Badge>
              ) : (
                <item.icon />
              )
            }
            component={Link}
            to={item.path}
            sx={{ color: "#282c3f" }}
          />
        ))}

        {/* ✅ Search Button in Bottom Nav */}
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          sx={{ color: "#282c3f" }}
          onClick={() => setOpenSearch(true)}
        />
      </BottomNavigation>

      {/* ✅ Fullscreen Search Dialog */}
      <Dialog
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: "#fff",
            display: "flex",
            alignItems: "center",
            px: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <SearchIcon sx={{ color: "#6e6e6e", fontSize: 24, mr: 1 }} />
          <InputBase
            autoFocus
            placeholder="Search for products, brands, and more"
            sx={{ flex: 1, fontSize: 16 }}
          />
          <IconButton onClick={() => setOpenSearch(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Dialog>
    </>
  );
};

export default Navbar;
