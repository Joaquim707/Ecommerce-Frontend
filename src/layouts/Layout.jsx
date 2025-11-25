import { Outlet, useLocation } from "react-router-dom";
import CouponDrawer from "./CouponDrawer";

const Layout = () => {
  const location = useLocation();

  const hideCoupon =
    location.pathname.includes("/product/") ||
    location.pathname === "/cart" ||
    location.pathname === "/wishlist";

  return (
    <>
      {/* Show coupon on ALL pages except product/cart/wishlist */}
      {!hideCoupon && <CouponDrawer />}

      <Outlet />
    </>
  );
};

export default Layout;
