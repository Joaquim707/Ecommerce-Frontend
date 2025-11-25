const BASE_URL = "http://localhost:5000/api";

export const AUTH = {
  REQUEST_OTP: `${BASE_URL}/auth/request-otp`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
};

export const USER = {
  PROFILE: `${BASE_URL}/user/profile`,
  UPDATE: `${BASE_URL}/user/update`,
};

export const ADMIN = {
  MAKE_ADMIN: `${BASE_URL}/admin/make-admin`,
};

export const PRODUCTS = {
  LIST: `${BASE_URL}/products`,
  FILTER: `${BASE_URL}/products/filter`,
  SINGLE: (id) => `${BASE_URL}/products/${id}`,
};

export const CART = {
  GET: `${BASE_URL}/cart`,
  ADD: `${BASE_URL}/cart/add`,
  UPDATE: `${BASE_URL}/cart/update`,
  REMOVE: `${BASE_URL}/cart/remove`,
};

// ✅ Categories API Added Here
export const CATEGORIES = {
  ALL: `${BASE_URL}/categories`,
  PRODUCTS_BY_CATEGORY: (categoryId) =>
    `${BASE_URL}/categories/${categoryId}/products`,
  BY_SLUG: `${BASE_URL}/categories/slug`
};

export default {
  AUTH,
  USER,
  ADMIN,
  PRODUCTS,
  CART,
  CATEGORIES,
};
