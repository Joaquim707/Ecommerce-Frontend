import React, { useState, useEffect } from "react";

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [cartSummary, setCartSummary] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [processingOrder, setProcessingOrder] = useState(false);

  useEffect(() => {
    loadOrderData();
  }, []);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const addressId = localStorage.getItem("selectedAddressId");

      if (!addressId) {
        alert("No address selected. Redirecting to address page...");
        window.location.href = "/address";
        return;
      }

      // Fetch cart summary
      const cartResponse = await fetch("http://localhost:5000/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cartData = await cartResponse.json();
      const cartItems = cartData.items || cartData.cart?.items || []; // depends on what backend sends

      if (!cartResponse.ok || !cartData.items || cartData.items.length === 0) {
        alert("Your cart is empty. Redirecting to bag...");
        window.location.href = "/bag";
        return;
      }

      // Calculate cart summary
      let totalMRP = 0;
      let totalAmount = 0;
      let itemsCount = 0;

      const selectedItems = new Set(
        JSON.parse(localStorage.getItem("selectedItems") || "[]")
      );

      cartItems.forEach((item) => {
        const product = item.productId;
        if (!product) return;

        const itemId = `${product._id}-${item.size}-${item.color}`;
        if (selectedItems.size > 0 && !selectedItems.has(itemId)) return;

        const itemMRP = (product.mrp || product.price) * item.quantity;
        const itemPrice = product.price * item.quantity;

        totalMRP += itemMRP;
        totalAmount += itemPrice;
        itemsCount += item.quantity;
      });

      setCartSummary({
        totalMRP,
        discount: totalMRP - totalAmount,
        platformFee: 0,
        totalAmount,
        itemsCount,
      });

      // Fetch address
      const addressResponse = await fetch(
        `http://localhost:5000/api/user/address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addressData = await addressResponse.json();

      if (!addressResponse.ok) {
        throw new Error("Failed to load address");
      }

      setShippingAddress(addressData.address);
      setLoading(false);
      // console.log("📌 CART DATA:", cartData);
    } catch (error) {
      console.error("Error loading order data:", error);
      alert("Failed to load order details");
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      setProcessingOrder(true);
      const token = localStorage.getItem("token");

      const orderData = {
        shippingAddress: {
          fullName: shippingAddress.name,
          mobileNumber: shippingAddress.mobileNumber,
          pinCode: shippingAddress.pinCode,
          addressLine1: shippingAddress.houseNumber,
          addressLine2: shippingAddress.address,
          landmark: shippingAddress.locality,
          city: shippingAddress.city,
          state: shippingAddress.state,
          addressType: shippingAddress.addressType,
        },
        paymentMethod: paymentMethod,
        selectedItems: JSON.parse(
          localStorage.getItem("selectedItems") || "[]"
        ),
      };

      const response = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      console.log("📌 ORDER RESPONSE STATUS:", response.status);

      const raw = await response.text();
      console.log("📌 RAW ORDER RESPONSE:", raw);

      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.error(
          "❌ ERROR: Response is not JSON. See raw response above."
        );
        alert("Server returned invalid JSON. Check console.");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      // Clear cart-related data from localStorage
      localStorage.removeItem("selectedAddressId");
      localStorage.removeItem("orderCartSummary");

      // Show success message
      alert(`Order placed successfully! Order Number: ${data.orderNumber}`);

      // Redirect to orders page or order confirmation
      window.location.href = `/order-confirmation/${data.order._id}`;
    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message || "Failed to place order. Please try again.");
      setProcessingOrder(false);
    }
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
            Loading payment details...
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
              ✓
            </div>
            <span
              style={{ fontWeight: 600, fontSize: "14px", color: "#ff3f6c" }}
            >
              ADDRESS
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
              3
            </div>
            <span
              style={{ fontWeight: 600, fontSize: "14px", color: "#ff3f6c" }}
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
          {/* Left Section - Payment Options */}
          <div>
            {/* Delivery Address */}
            <div
              style={{
                backgroundColor: "white",
                padding: "24px",
                border: "1px solid #e0e0e0",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ fontWeight: 700, fontSize: "14px", margin: 0 }}>
                  DELIVERY ADDRESS
                </h3>
                <button
                  onClick={() => (window.location.href = "/address")}
                  style={{
                    border: "1px solid #ff3f6c",
                    backgroundColor: "white",
                    color: "#ff3f6c",
                    padding: "6px 16px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "12px",
                    borderRadius: "4px",
                  }}
                >
                  CHANGE
                </button>
              </div>
              <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                <p style={{ margin: "0 0 4px 0", fontWeight: 600 }}>
                  {shippingAddress?.name}
                </p>
                <p style={{ margin: "0 0 4px 0", color: "#757575" }}>
                  {shippingAddress?.houseNumber}, {shippingAddress?.address}
                </p>
                <p style={{ margin: "0 0 4px 0", color: "#757575" }}>
                  {shippingAddress?.locality}, {shippingAddress?.city},{" "}
                  {shippingAddress?.state} - {shippingAddress?.pinCode}
                </p>
                <p style={{ margin: "0", color: "#757575" }}>
                  Mobile: <strong>{shippingAddress?.mobileNumber}</strong>
                </p>
              </div>
            </div>

            {/* Payment Options */}
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
                  marginTop: 0,
                  marginBottom: "16px",
                }}
              >
                PAYMENT OPTIONS
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Cash on Delivery */}
                <label
                  style={{
                    padding: "16px",
                    border:
                      paymentMethod === "COD"
                        ? "2px solid #ff3f6c"
                        : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backgroundColor:
                      paymentMethod === "COD" ? "#fff5f7" : "white",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{
                      accentColor: "#ff3f6c",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>
                      Cash on Delivery
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#757575",
                        marginTop: "4px",
                      }}
                    >
                      Pay when you receive the product
                    </div>
                  </div>
                </label>

                {/* UPI */}
                <label
                  style={{
                    padding: "16px",
                    border:
                      paymentMethod === "UPI"
                        ? "2px solid #ff3f6c"
                        : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backgroundColor:
                      paymentMethod === "UPI" ? "#fff5f7" : "white",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{
                      accentColor: "#ff3f6c",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>UPI</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#757575",
                        marginTop: "4px",
                      }}
                    >
                      Google Pay, PhonePe, Paytm & more
                    </div>
                  </div>
                </label>

                {/* Card */}
                <label
                  style={{
                    padding: "16px",
                    border:
                      paymentMethod === "Card"
                        ? "2px solid #ff3f6c"
                        : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backgroundColor:
                      paymentMethod === "Card" ? "#fff5f7" : "white",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{
                      accentColor: "#ff3f6c",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>
                      Credit / Debit Card
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#757575",
                        marginTop: "4px",
                      }}
                    >
                      Visa, Mastercard, RuPay & more
                    </div>
                  </div>
                </label>

                {/* Net Banking */}
                <label
                  style={{
                    padding: "16px",
                    border:
                      paymentMethod === "NetBanking"
                        ? "2px solid #ff3f6c"
                        : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backgroundColor:
                      paymentMethod === "NetBanking" ? "#fff5f7" : "white",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="NetBanking"
                    checked={paymentMethod === "NetBanking"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{
                      accentColor: "#ff3f6c",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>
                      Net Banking
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#757575",
                        marginTop: "4px",
                      }}
                    >
                      All major banks supported
                    </div>
                  </div>
                </label>
              </div>
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
              <span style={{ fontSize: "14px" }}>Platform Fee</span>
              <span style={{ fontSize: "14px", color: "#4caf50" }}>FREE</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "14px" }}>Shipping Fee</span>
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

            <button
              onClick={handlePlaceOrder}
              disabled={processingOrder}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                backgroundColor: processingOrder ? "#bdbdbd" : "#ff3f6c",
                color: "white",
                fontWeight: 600,
                fontSize: "16px",
                cursor: processingOrder ? "not-allowed" : "pointer",
                borderRadius: "4px",
              }}
            >
              {processingOrder ? "PROCESSING..." : "PLACE ORDER"}
            </button>
          </div>
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

export default PaymentPage;
