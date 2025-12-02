import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    houseNumber: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    addressType: "Home",
  });

  const [errors, setErrors] = useState({});
  const [cartSummary, setCartSummary] = useState({
    totalMRP: 0,
    discount: 0,
    platformFee: 0,
    totalAmount: 0,
    itemsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Get selected items (support two formats: array of keys or array of objects)
      let selectedItems = JSON.parse(
        localStorage.getItem("selectedCartItems") || "[]"
      );

      // If saved as objects, convert to key format "<productId>-<size>-<color>"
      if (
        Array.isArray(selectedItems) &&
        selectedItems.length > 0 &&
        typeof selectedItems[0] === "object"
      ) {
        selectedItems = selectedItems.map((it) => {
          const pid =
            (it.productId && (it.productId._id || it.productId)) ||
            (it.product && (it.product._id || it.product)) ||
            it._id ||
            "";
          const size = it.size || it.selectedSize || "";
          const color = it.color || it.selectedColor || "";
          return `${pid}-${size}-${color}`;
        });
      }

      setSelectedCartItems(selectedItems);

      const response = await fetch("http://localhost:5000/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const ct = response.headers.get("content-type") || "";
      const raw = await response.text();
      if (!ct.includes("application/json")) {
        console.error("Cart API returned non-JSON:", raw);
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        throw new Error(
          "Cart service returned unexpected response. Is API running and are you authenticated?"
        );
      }
      const data = JSON.parse(raw);

      if (!response.ok) {
        throw new Error(data.message || "Failed to load cart");
      }

      const allItems =
        Array.isArray(data.items) && data.items.length
          ? data.items
          : Array.isArray(data.cart) && data.cart.length
          ? data.cart
          : Array.isArray(data)
          ? data
          : [];

      console.log("Fetched Cart Items (normalized):", allItems);
      console.log("Selected items (normalized):", selectedItems);

      let items = allItems;
      if (Array.isArray(selectedItems) && selectedItems.length > 0) {
        const selSet = new Set(selectedItems);
        items = allItems.filter((item) => {
          const pid =
            (item.productId && (item.productId._id || item.productId)) ||
            (item.product && (item.product._id || item.product)) ||
            item.productId ||
            item.product ||
            item._id ||
            "";

          const size = item.size || item.selectedSize || "";
          const color = item.color || item.selectedColor || "";

          const key = `${pid}-${size}-${color}`;
          const keyNoColor = `${pid}-${size}-`;
          const keyNoSize = `${pid}--${color}`;
          const keyJustPid = `${pid}--`;

          return (
            selSet.has(key) ||
            selSet.has(keyNoColor) ||
            selSet.has(keyNoSize) ||
            selSet.has(keyJustPid) ||
            // also allow matching by product id alone
            selSet.has(`${pid}`)
          );
        });
      }

      if (!items || items.length === 0) {
        alert("No items selected. Redirecting to cart...");
        navigate("/cart");
        return;
      }

      // Calculate totals
      let totalMRP = 0;
      let totalAmount = 0;
      let itemsCount = 0;

      items.forEach((item) => {
        const product =
          item.productId && item.productId.price
            ? item.productId
            : item.product || item.productDetails || {};
        const qty = item.quantity || 1;
        const mrp = product.mrp ?? product.price ?? 0;
        const price = product.price ?? mrp;
        totalMRP += mrp * qty;
        totalAmount += price * qty;
        itemsCount += qty;
      });

      const discount = Math.max(0, totalMRP - totalAmount);

      setCartSummary({
        totalMRP,
        discount,
        platformFee: 0,
        totalAmount,
        itemsCount,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert(error.message || "Failed to load cart data");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "Pin code is required";
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit pin code";
    }
    if (!formData.houseNumber.trim())
      newErrors.houseNumber = "House number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.locality.trim()) newErrors.locality = "Locality is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");

        // Save the address
        const addressResponse = await fetch(
          "http://localhost:5000/api/user/address/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        const addressData = await addressResponse.json();

        if (!addressResponse.ok) {
          throw new Error(addressData.message || "Failed to save address");
        }

        // Store address ID and cart summary for payment page
        localStorage.setItem("selectedAddressId", addressData.address._id);
        localStorage.setItem("orderCartSummary", JSON.stringify(cartSummary));

        // Navigate to payment
        navigate("/payment");
      } catch (error) {
        console.error("Error saving address:", error);
        alert(error.message || "Failed to save address. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("orderCartSummary");
    localStorage.removeItem("selectedCartItems");
    navigate("/cart");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #ff3f6c",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          ></div>
          <p style={{ marginTop: "16px", color: "#757575" }}>
            Loading cart details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          padding: "16px 0",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#ff3f6c",
              margin: 0,
            }}
          >
            M
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              style={{ width: "20px", height: "20px", color: "#4caf50" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span style={{ fontWeight: 600, fontSize: "12px" }}>
              100% SECURE
            </span>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto 24px", padding: "0 16px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#ff3f6c",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
              }}
            >
              ✓
            </div>
            <span
              style={{ fontWeight: 600, fontSize: "14px", color: "#ff3f6c" }}
            >
              BAG
            </span>
          </div>
          <div
            style={{ width: "80px", height: "2px", backgroundColor: "#ff3f6c" }}
          ></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#ff3f6c",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
              }}
            >
              2
            </div>
            <span
              style={{ fontWeight: 600, fontSize: "14px", color: "#ff3f6c" }}
            >
              ADDRESS
            </span>
          </div>
          <div
            style={{ width: "80px", height: "2px", backgroundColor: "#bdbdbd" }}
          ></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#bdbdbd",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
              }}
            >
              3
            </div>
            <span
              style={{ fontWeight: 600, fontSize: "14px", color: "#bdbdbd" }}
            >
              PAYMENT
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px 120px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "24px",
          }}
        >
          {/* Left Section - Form */}
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              border: "1px solid #e0e0e0",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "16px",
                marginTop: 0,
              }}
            >
              CONTACT DETAILS
            </h3>

            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "8px",
                border: errors.name ? "1px solid #f44336" : "1px solid #e0e0e0",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
            {errors.name && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "0 0 16px 0",
                }}
              >
                {errors.name}
              </p>
            )}

            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile No*"
              value={formData.mobileNumber}
              onChange={handleChange}
              maxLength="10"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "8px",
                border: errors.mobileNumber
                  ? "1px solid #f44336"
                  : "1px solid #e0e0e0",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
            {errors.mobileNumber && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "0 0 16px 0",
                }}
              >
                {errors.mobileNumber}
              </p>
            )}

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e0e0e0",
                margin: "24px 0",
              }}
            />

            <h3
              style={{
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "16px",
                marginTop: 0,
              }}
            >
              ADDRESS
            </h3>

            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code*"
              value={formData.pinCode}
              onChange={handleChange}
              maxLength="6"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "8px",
                border: errors.pinCode
                  ? "1px solid #f44336"
                  : "1px solid #e0e0e0",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
            {errors.pinCode && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "0 0 16px 0",
                }}
              >
                {errors.pinCode}
              </p>
            )}

            <input
              type="text"
              name="houseNumber"
              placeholder="House Number/Tower/Block*"
              value={formData.houseNumber}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "4px",
                border: errors.houseNumber
                  ? "1px solid #f44336"
                  : "1px solid #e0e0e0",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
            {errors.houseNumber && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "0 0 4px 0",
                }}
              >
                {errors.houseNumber}
              </p>
            )}
            <p
              style={{
                fontSize: "11px",
                color: "#ff9800",
                margin: "0 0 16px 8px",
              }}
            >
              *House Number will allow a doorstep delivery
            </p>

            <input
              type="text"
              name="address"
              placeholder="Address (locality,building,street)**"
              value={formData.address}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "4px",
                border: errors.address
                  ? "1px solid #f44336"
                  : "1px solid #e0e0e0",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
            {errors.address && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "0 0 4px 0",
                }}
              >
                {errors.address}
              </p>
            )}
            <p
              style={{
                fontSize: "11px",
                color: "#ff9800",
                margin: "0 0 16px 8px",
              }}
            >
              *Please update society/apartment details
            </p>

            <input
              type="text"
              name="locality"
              placeholder="Locality / Town*"
              value={formData.locality}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "8px",
                border: errors.locality
                  ? "1px solid #f44336"
                  : "1px solid #e0e0e0",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
            {errors.locality && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "12px",
                  margin: "0 0 16px 0",
                }}
              >
                {errors.locality}
              </p>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City / District*"
                  value={formData.city}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: errors.city
                      ? "1px solid #f44336"
                      : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.city && (
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {errors.city}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State*"
                  value={formData.state}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: errors.state
                      ? "1px solid #f44336"
                      : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.state && (
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e0e0e0",
                margin: "24px 0",
              }}
            />

            <h3
              style={{
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "16px",
                marginTop: 0,
              }}
            >
              ADDRESS TYPE
            </h3>

            <div style={{ display: "flex", gap: "24px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="addressType"
                  value="Home"
                  checked={formData.addressType === "Home"}
                  onChange={handleChange}
                  style={{
                    marginRight: "8px",
                    accentColor: "#ff3f6c",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <span style={{ fontSize: "14px" }}>Home</span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="addressType"
                  value="Work"
                  checked={formData.addressType === "Work"}
                  onChange={handleChange}
                  style={{
                    marginRight: "8px",
                    accentColor: "#ff3f6c",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <span style={{ fontSize: "14px" }}>Work</span>
              </label>
            </div>
          </div>

          {/* Right Section - Price Details */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              border: "1px solid #e0e0e0",
              height: "fit-content",
              position: "sticky",
              top: "16px",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "12px",
                color: "#757575",
                marginBottom: "16px",
                marginTop: 0,
              }}
            >
              PRICE DETAILS ({cartSummary.itemsCount} Items)
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "14px" }}>Total MRP</span>
              <span style={{ fontSize: "14px" }}>
                ₹{cartSummary.totalMRP.toLocaleString()}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "14px" }}>Discount on MRP</span>
              <span style={{ fontSize: "14px", color: "#4caf50" }}>
                -₹{cartSummary.discount.toLocaleString()}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div>
                <span style={{ fontSize: "14px" }}>Platform Fee </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#ff3f6c",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Know More
                </span>
              </div>
              <span style={{ fontSize: "14px", color: "#4caf50" }}>FREE</span>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e0e0e0",
                margin: "16px 0",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "16px" }}>
                Total Amount
              </span>
              <span style={{ fontWeight: 700, fontSize: "16px" }}>
                ₹{cartSummary.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTop: "1px solid #e0e0e0",
          padding: "16px 0",
          zIndex: 1000,
          boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <button
            onClick={handleCancel}
            style={{
              padding: "12px",
              border: "1px solid #e0e0e0",
              backgroundColor: "white",
              color: "#424242",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "12px",
              border: "none",
              backgroundColor: "#ff3f6c",
              color: "white",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Save & Continue
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AddressPage;
